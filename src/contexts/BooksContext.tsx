import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Book, NewBookInput, UpdateBookInput } from '../types';
import { useAuth } from './AuthContext';
import {
  subscribeToUserBooks,
  createBookDocument,
  updateBookDocument,
  toggleFavoriteDocument,
  deleteBookDocument,
} from '../services/books.service';
import { MESSAGES } from '../constants';
import { sortBooksAlphabetically } from '../utils/sorters';

interface BooksContextType {
  books: Book[];
  loading: boolean;
  addBook: (input: NewBookInput) => Promise<string>;
  updateBook: (bookId: string, updatedFields: UpdateBookInput) => Promise<void>;
  toggleFavorite: (bookId: string, currentFavoriteStatus: boolean) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  isDuplicate: (title: string, author: string, excludeId?: string | null) => boolean;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!currentUser) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToUserBooks(
      currentUser.uid,
      (fetchedBooks) => {
        setBooks(fetchedBooks);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore subscribe error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  // Check duplicate title + author for the current user (case-insensitive)
  const isDuplicate = useCallback(
    (title: string, author: string, excludeId: string | null = null): boolean => {
      const cleanTitle = title.trim().toLowerCase();
      const cleanAuthor = author.trim().toLowerCase();

      return books.some((book) => {
        if (excludeId && book.id === excludeId) return false;
        return (
          (book.title || '').trim().toLowerCase() === cleanTitle &&
          (book.author || '').trim().toLowerCase() === cleanAuthor
        );
      });
    },
    [books]
  );

  const addBook = useCallback(
    async (input: NewBookInput): Promise<string> => {
      if (!currentUser) throw new Error('User not logged in');

      if (isDuplicate(input.title, input.author)) {
        throw new Error(MESSAGES.DUPLICATE_BOOK);
      }

      const docId = await createBookDocument(currentUser.uid, input);

      // Instant optimistic local update: book appears in list at once without reload!
      const newBookObj: Book = {
        id: docId,
        userId: currentUser.uid,
        title: input.title.trim(),
        author: input.author.trim(),
        genre: input.genre as any,
        status: input.status as any,
        rating:
          input.rating !== '' && input.rating !== null && input.rating !== undefined
            ? Number(input.rating)
            : null,
        favorite: false,
        notes: input.notes ? input.notes.trim() : '',
      };

      setBooks((prev) => {
        if (prev.some((b) => b.id === docId)) return prev;
        return sortBooksAlphabetically([...prev, newBookObj]);
      });

      return docId;
    },
    [currentUser, isDuplicate]
  );

  const updateBook = useCallback(
    async (bookId: string, updatedFields: UpdateBookInput): Promise<void> => {
      if (!currentUser) throw new Error('User not logged in');

      if (updatedFields.title && updatedFields.author) {
        if (isDuplicate(updatedFields.title, updatedFields.author, bookId)) {
          throw new Error(MESSAGES.DUPLICATE_BOOK);
        }
      }

      // Optimistic update
      setBooks((prev) =>
        sortBooksAlphabetically(
          prev.map((b) => (b.id === bookId ? { ...b, ...updatedFields } as Book : b))
        )
      );

      await updateBookDocument(bookId, updatedFields);
    },
    [currentUser, isDuplicate]
  );

  const toggleFavorite = useCallback(
    async (bookId: string, currentFavoriteStatus: boolean): Promise<void> => {
      // Optimistic favorite toggle
      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId ? { ...b, favorite: !currentFavoriteStatus } : b
        )
      );

      await toggleFavoriteDocument(bookId, currentFavoriteStatus);
    },
    []
  );

  const deleteBook = useCallback(
    async (bookId: string): Promise<void> => {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      await deleteBookDocument(bookId);
    },
    []
  );

  const value: BooksContextType = {
    books,
    loading,
    addBook,
    updateBook,
    toggleFavorite,
    deleteBook,
    isDuplicate,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};
