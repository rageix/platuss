import { User } from "@/types/user";
import { Account } from "@/types/account";
import { Budget } from "@/types/budget";
import { Tag } from "@/types/tag";

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
  tag: Tag[]
}