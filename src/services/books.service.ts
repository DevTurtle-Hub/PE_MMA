import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Book, NewBookInput, UpdateBookInput } from '../types';
import { sortBooksAlphabetically } from '../utils/sorters';

const COLLECTION_NAME = 'books';

export const subscribeToUserBooks = (
  userId: string,
  onSuccess: (books: Book[]) => void,
  onError: (error: Error) => void
) => {
  const booksRef = collection(db, COLLECTION_NAME);
  const q = query(booksRef, where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const fetchedBooks: Book[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Book, 'id'>),
      }));

      // Sort alphabetically by title, tie break by author
      const sorted = sortBooksAlphabetically(fetchedBooks);
      onSuccess(sorted);
    },
    (err) => {
      onError(err);
    }
  );
};

export const createBookDocument = async (
  userId: string,
  input: NewBookInput
): Promise<string> => {
  const newBook = {
    userId,
    title: input.title.trim(),
    author: input.author.trim(),
    genre: input.genre,
    status: input.status,
    rating:
      input.rating !== '' && input.rating !== null && input.rating !== undefined
        ? Number(input.rating)
        : null,
    favorite: false,
    notes: input.notes ? input.notes.trim() : '',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), newBook);
  return docRef.id;
};

export const updateBookDocument = async (
  bookId: string,
  fields: UpdateBookInput
): Promise<void> => {
  const payload: Record<string, any> = {};

  if (fields.title !== undefined) payload.title = fields.title.trim();
  if (fields.author !== undefined) payload.author = fields.author.trim();
  if (fields.genre !== undefined) payload.genre = fields.genre;
  if (fields.status !== undefined) payload.status = fields.status;
  if (fields.rating !== undefined) {
    payload.rating =
      fields.rating !== '' && fields.rating !== null ? Number(fields.rating) : null;
  }
  if (fields.notes !== undefined) payload.notes = (fields.notes || '').trim();
  if (fields.favorite !== undefined) payload.favorite = Boolean(fields.favorite);

  const docRef = doc(db, COLLECTION_NAME, bookId);
  await updateDoc(docRef, payload);
};

export const toggleFavoriteDocument = async (
  bookId: string,
  currentFavorite: boolean
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, bookId);
  await updateDoc(docRef, {
    favorite: !currentFavorite,
  });
};

export const deleteBookDocument = async (
  bookId: string
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, bookId);
  await deleteDoc(docRef);
};
