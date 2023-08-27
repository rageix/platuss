import { User } from '@/types/user';
import { Budget } from '@/types/budget';
import { TransactionDetail } from '@/types/transactionDetails';

export interface Tag {
  id: string;
  userId: string;
  user?: User;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  budgets?: Budget[];
  transactionDetails?: TransactionDetail[];
}
