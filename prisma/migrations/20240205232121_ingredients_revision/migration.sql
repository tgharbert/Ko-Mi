/*
  Warnings:

  - Added the required column `userId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrentIngredient" ALTER COLUMN "checked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "aggregateRating" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
