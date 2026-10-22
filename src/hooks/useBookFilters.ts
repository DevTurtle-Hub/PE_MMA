import { useState, useMemo, useCallback } from 'react';
import { Book } from '../types';
import { calculateStatusBreakdown, StatusBreakdown } from '../utils/sorters';

interface UseBookFiltersReturn {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterGenre: string;
  setFilterGenre: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  favoritesOnly: boolean;
  setFavoritesOnly: (val: boolean) => void;
  filteredBooks: Book[];
  summary: {
    totalCount: number;
    favoriteCount: number;
    breakdown: StatusBreakdown[];
  };
  clearFilters: () => void;
}

export const useBookFilters = (books: Book[]): UseBookFiltersReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredBooks = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      // 1. Search Query (title or author, case-insensitive)
      if (trimmedQuery !== '') {
        const matchTitle = (book.title || '').toLowerCase().includes(trimmedQuery);
        const matchAuthor = (book.author || '').toLowerCase().includes(trimmedQuery);
        if (!matchTitle && !matchAuthor) return false;
      }

      // 2. Genre Filter
      if (filterGenre !== 'All' && book.genre !== filterGenre) {
        return false;
      }

      // 3. Status Filter
      if (filterStatus !== 'All' && book.status !== filterStatus) {
        return false;
      }

      // 4. Favorites Only Switch
      if (favoritesOnly && !book.favorite) {
        return false;
      }

      return true;
    });
  }, [books, searchQuery, filterGenre, filterStatus, favoritesOnly]);

  const summary = useMemo(() => {
    const totalCount = filteredBooks.length;
    const favoriteCount = filteredBooks.filter((b) => b.favorite).length;
    const breakdown = calculateStatusBreakdown(filteredBooks);

    return { totalCount, favoriteCount, breakdown };
  }, [filteredBooks]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterGenre('All');
    setFilterStatus('All');
    setFavoritesOnly(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filterGenre,
    setFilterGenre,
    filterStatus,
    setFilterStatus,
    favoritesOnly,
    setFavoritesOnly,
    filteredBooks,
    summary,
    clearFilters,
  };
};
