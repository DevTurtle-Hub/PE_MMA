import { Genre, Status } from '../types';

export const GENRES: Genre[] = ['Fiction', 'Non-Fiction', 'Academic', 'Other'];
export const STATUSES: Status[] = ['To Read', 'Reading', 'Finished'];

export const STATUS_PRIORITY: Record<Status, number> = {
  'To Read': 1,
  'Reading': 2,
  'Finished': 3,
};

export const COLORS = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  primaryLight: '#dbeafe',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  borderInput: '#cbd5e1',
  success: '#15803d',
  successBg: '#f0fdf4',
  successBorder: '#bbf7d0',
  danger: '#b91c1c',
  dangerBg: '#fef2f2',
  dangerBorder: '#fecaca',
  warning: '#ca8a04',
  warningBg: '#fefce8',
  warningBorder: '#fef08a',
  favoriteActive: '#eab308',
  favoriteInactive: '#94a3b8',
};

// Exact messages required by the specification
export const MESSAGES = {
  // Auth
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  REGISTRATION_SUCCESS: 'Registration successful',

  // Books
  TITLE_REQUIRED: 'Title is required',
  TITLE_MAX_LENGTH: 'Title must be at most 100 characters',
  AUTHOR_REQUIRED: 'Author is required',
  AUTHOR_MAX_LENGTH: 'Author must be at most 60 characters',
  GENRE_REQUIRED: 'Please choose a genre',
  STATUS_REQUIRED: 'Please choose a status',
  RATING_INVALID: 'Rating must be a whole number from 0 to 5',
  NOTES_MAX_LENGTH: 'Notes must be at most 300 characters',
  BOOK_ADDED: 'Book added',
  NO_BOOKS_FOUND: 'No books found',
  DUPLICATE_BOOK: 'A book with this title and author already exists.',
};
