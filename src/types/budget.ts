import { User } from "@/types/user";
import { Category } from "@/types/category";
import { TransactionDetail } from "@/types/transactionDetails";

export enum Timeframe {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export interface Budget {
  id: string,
  userId: string,
  user?: User,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  color: string,
  categories: Category[],
  amount: number,
  timeframe: Timeframe,
  timeframeAmount: number,
  starts: Date,
  ends: Date,
  transactionDetails?: TransactionDetail[]
}