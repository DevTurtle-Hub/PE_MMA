import { Book, Status } from '../types';
import { STATUS_PRIORITY } from '../constants';

/**
 * Sorts books alphabetically by title (not case-sensitive; equal titles ordered by author).
 */
export const sortBooksAlphabetically = (booksList: Book[]): Book[] => {
  return [...booksList].sort((a, b) => {
    const titleA = (a.title || '').toLowerCase();
    const titleB = (b.title || '').toLowerCase();
    const titleCmp = titleA.localeCompare(titleB);
    if (titleCmp !== 0) return titleCmp;

    const authorA = (a.author || '').toLowerCase();
    const authorB = (b.author || '').toLowerCase();
    return authorA.localeCompare(authorB);
  });
};

export interface StatusBreakdown {
  status: string;
  count: number;
}

/**
 * Groups and sorts statuses: most books first (equal counts: To Read, then Reading, then Finished).
 */
export const calculateStatusBreakdown = (booksList: Book[]): StatusBreakdown[] => {
  const counts: Record<string, number> = {};

  for (let i = 0; i < booksList.length; i++) {
    const st = booksList[i].status;
    if (st) {
      counts[st] = (counts[st] || 0) + 1;
    }
  }

  const breakdown: StatusBreakdown[] = Object.keys(counts).map((st) => ({
    status: st,
    count: counts[st],
  }));

  breakdown.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    const priorityA = STATUS_PRIORITY[a.status as Status] || 99;
    const priorityB = STATUS_PRIORITY[b.status as Status] || 99;
    return priorityA - priorityB;
  });

  return breakdown;
};
