import {
  User,
  UserCredential,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const subscribeToAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const registerUser = async (email: string, pass: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email.trim(), pass);
};

export const loginUser = async (email: string, pass: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email.trim(), pass);
};

export const logoutUser = async (): Promise<void> => {
  return await signOut(auth);
};
