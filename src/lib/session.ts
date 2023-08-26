import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export interface Session {
  userId: string | undefined;
}

export const defaultSession: Session = {
  userId: undefined,
};

export const defaultCookie: Partial<ResponseCookie> = {
  secure: process.env.NODE_ENV === 'production',
};
