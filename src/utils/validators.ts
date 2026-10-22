import { MESSAGES } from '../constants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const isWholeNumber0to5 = (val: string | number | null | undefined): boolean => {
  if (val === '' || val === null || val === undefined) return true;
  const strVal = String(val).trim();
  const num = Number(strVal);
  return Number.isInteger(num) && num >= 0 && num <= 5 && !strVal.includes('.');
};

export interface AuthValidationErrors {
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export const validateLoginForm = (email: string, password: string): AuthValidationErrors => {
  const errors: AuthValidationErrors = {};

  if (!email || email.trim() === '') {
    errors.email = MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(email)) {
    errors.email = MESSAGES.EMAIL_INVALID;
  }

  if (!password || password === '') {
    errors.password = MESSAGES.PASSWORD_REQUIRED;
  }

  return errors;
};

export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string
): AuthValidationErrors => {
  const errors: AuthValidationErrors = {};

  if (!email || email.trim() === '') {
    errors.email = MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(email)) {
    errors.email = MESSAGES.EMAIL_INVALID;
  }

  if (!password || password === '') {
    errors.password = MESSAGES.PASSWORD_REQUIRED;
  } else if (password.length < 6) {
    errors.password = MESSAGES.PASSWORD_MIN_LENGTH;
  }

  if (!confirmPassword || confirmPassword === '') {
    errors.confirmPassword = MESSAGES.CONFIRM_PASSWORD_REQUIRED;
  } else if (confirmPassword !== password) {
    errors.confirmPassword = MESSAGES.PASSWORDS_NOT_MATCH;
  }

  return errors;
};

export interface BookValidationErrors {
  title?: string | null;
  author?: string | null;
  genre?: string | null;
  status?: string | null;
  rating?: string | null;
  notes?: string | null;
}

export const validateBookData = (
  title: string,
  author: string,
  genre: string,
  status: string,
  rating?: string | number | null,
  notes?: string
): BookValidationErrors => {
  const errors: BookValidationErrors = {};

  // Title
  if (!title || title.trim() === '') {
    errors.title = MESSAGES.TITLE_REQUIRED;
  } else if (title.length > 100) {
    errors.title = MESSAGES.TITLE_MAX_LENGTH;
  }

  // Author
  if (!author || author.trim() === '') {
    errors.author = MESSAGES.AUTHOR_REQUIRED;
  } else if (author.length > 60) {
    errors.author = MESSAGES.AUTHOR_MAX_LENGTH;
  }

  // Genre
  if (!genre || genre === '' || genre === 'Choose genre') {
    errors.genre = MESSAGES.GENRE_REQUIRED;
  }

  // Status
  if (!status || status === '' || status === 'Choose status') {
    errors.status = MESSAGES.STATUS_REQUIRED;
  }

  // Rating
  if (rating !== '' && rating !== null && rating !== undefined) {
    if (!isWholeNumber0to5(rating)) {
      errors.rating = MESSAGES.RATING_INVALID;
    }
  }

  // Notes
  if (notes && notes.length > 300) {
    errors.notes = MESSAGES.NOTES_MAX_LENGTH;
  }

  return errors;
};
