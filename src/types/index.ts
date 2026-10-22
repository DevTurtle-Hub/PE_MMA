export type Genre = 'Fiction' | 'Non-Fiction' | 'Academic' | 'Other';
export type Status = 'To Read' | 'Reading' | 'Finished';

export interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  genre: Genre;
  status: Status;
  rating: number | null;
  favorite: boolean;
  notes: string;
  createdAt?: any;
}

export interface NewBookInput {
  title: string;
  author: string;
  genre: string;
  status: string;
  rating?: string | number | null;
  notes?: string;
}

export interface UpdateBookInput {
  title?: string;
  author?: string;
  genre?: string;
  status?: string;
  rating?: string | number | null;
  notes?: string;
  favorite?: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  List: undefined;
  Detail: { bookId: string };
};
