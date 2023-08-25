import { User } from "@/types/user";
import { Account } from "@/types/account";
import { Budget } from "@/types/budget";
import { Category } from "@/types/category";

export interface TransactionDetail {
  id: string,
  userId: string,
  user?: User,
  budgetId: string,
  budget?: Budget
  accountId: string,
  account?: Account,
  createdAt: Date,
  updatedAt: Date,
  amount: number,
  categories: Category[]
}