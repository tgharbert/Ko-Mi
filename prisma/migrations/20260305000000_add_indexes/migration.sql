-- CreateIndex
CREATE INDEX "Recipe_userId_idx" ON "Recipe"("userId");

-- CreateIndex
CREATE INDEX "Keyword_recipeId_idx" ON "Keyword"("recipeId");

-- CreateIndex
CREATE INDEX "Ingredient_recipeId_idx" ON "Ingredient"("recipeId");

-- CreateIndex
CREATE INDEX "UserIngredient_userId_idx" ON "UserIngredient"("userId");

-- CreateIndex
CREATE INDEX "UserIngredient_ingredient_id_idx" ON "UserIngredient"("ingredient_id");

-- CreateIndex
CREATE INDEX "Friend_friendAId_idx" ON "Friend"("friendAId");

-- CreateIndex
CREATE INDEX "Friend_friendBId_idx" ON "Friend"("friendBId");
