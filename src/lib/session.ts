import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export interface Session {
  userId: string;
}

export const defaultSession: Session = {
  userId: null,
};

export const defaultCookie: Partial<ResponseCookie> = {
  secure: process.env.NODE_ENV === 'production',
};