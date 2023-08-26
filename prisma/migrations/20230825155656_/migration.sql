/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BudgetsToCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoriesToTransactionDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetsToCategories" DROP CONSTRAINT "_BudgetsToCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetsToCategories" DROP CONSTRAINT "_BudgetsToCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToTransactionDetails" DROP CONSTRAINT "_CategoriesToTransactionDetails_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToTransactionDetails" DROP CONSTRAINT "_CategoriesToTransactionDetails_B_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "_BudgetsToCategories";

-- DropTable
DROP TABLE "_CategoriesToTransactionDetails";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BudgetsToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TagsToTransactionDetails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetsToTags_AB_unique" ON "_BudgetsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetsToTags_B_index" ON "_BudgetsToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTransactionDetails_AB_unique" ON "_TagsToTransactionDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTransactionDetails_B_index" ON "_TagsToTransactionDetails"("B");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetsToTags" ADD CONSTRAINT "_BudgetsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetsToTags" ADD CONSTRAINT "_BudgetsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTransactionDetails" ADD CONSTRAINT "_TagsToTransactionDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTransactionDetails" ADD CONSTRAINT "_TagsToTransactionDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "TransactionDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
