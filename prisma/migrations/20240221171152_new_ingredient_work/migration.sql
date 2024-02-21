/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `UserIngredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserIngredient" DROP CONSTRAINT "UserIngredient_ingredientId_fkey";

-- AlterTable
ALTER TABLE "UserIngredient" DROP COLUMN "ingredientId",
ADD COLUMN     "ingredient_id" INTEGER;

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
