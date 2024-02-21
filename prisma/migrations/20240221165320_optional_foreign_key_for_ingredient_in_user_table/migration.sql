-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "UserIngredient" DROP CONSTRAINT "UserIngredient_ingredientId_fkey";

-- AlterTable
ALTER TABLE "UserIngredient" ALTER COLUMN "ingredientId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendAId" TEXT NOT NULL,
    "friendBId" TEXT NOT NULL,
    "status" "FriendStatus" NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friend_friendAId_friendBId_key" ON "Friend"("friendAId", "friendBId");

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendAId_fkey" FOREIGN KEY ("friendAId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendBId_fkey" FOREIGN KEY ("friendBId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
