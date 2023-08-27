import { User } from '@/types/user';

export interface Account {
  id: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  balance: number;
  transactions?: any;
}
