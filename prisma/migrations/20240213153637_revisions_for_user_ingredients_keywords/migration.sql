/*
  Warnings:

  - You are about to drop the column `userId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `CurrentIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentIngredient" DROP CONSTRAINT "CurrentIngredient_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_userId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "keywords",
ADD COLUMN     "keywordId" INTEGER;

-- DropTable
DROP TABLE "CurrentIngredient";

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIngredient" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,

    CONSTRAINT "UserIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserIngredient_id_key" ON "UserIngredient"("id");

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
