import { User } from "@/types/user";
import { Account } from "@/types/account";

export enum TransactionType {
  Credit = 'credit',
  Debit = 'debit'
}

export interface Transaction {
  id: string,
  userId: string,
  user?: User,
  accountId: string,
  account?: Account,
  name: string,
  description: string,
  type: TransactionType,
  date: Date,
  createdAt: Date,
  updatedAt: Date,
  transactionDetails?: any[]
}