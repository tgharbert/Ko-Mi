"use client";
import RecipeCard from "./recipecard/RecipeCardHome";
import { useState, useEffect, useCallback, useRef } from "react";
import LoadingPage from "@/app/loading";
import EndOfRecipes from "./EndOfRecipes";

import { useSearchParams } from "next/navigation";

function RecipeList({
  query,
  category,
  random,
  all,
  currentPage,
  getUserRecipes,
}: {
  query: String;
  category: String;
  random: String;
  all: String;
  currentPage: number;
  getUserRecipes: Function;
}) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const loaderRef = useRef(null);

  const searchParams = useSearchParams();

  const pageReset = () => {
    setPage(1);
    return;
  };

  useEffect(() => {
    setIsEnd(false);
    setRecipes([]);
    pageReset();
  }, [searchParams, currentPage, setPage]);

  const getRecipes = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    let userRecipes = await getUserRecipes(page, query, category, all, random);
    if (userRecipes.length === 0) {
      setIsLoading(false);
      setIsEnd(true);
    }
    setRecipes((prevRecipes) => [...prevRecipes, ...userRecipes]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  }, [page, isLoading, query, random, all, category, getUserRecipes]);

  useEffect(() => {
    let curr = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getRecipes();
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (curr) {
        observer.unobserve(curr);
      }
    };
  }, [getRecipes]);

  return (
    <div className="w-120%" id="scrollableDiv">
      <div className="sm:flex justify-center items-center pb-8">
        <div className="grid xl:grid-cols-3 gap-2 sm:w-4/5 lg:grid-cols-2">
          {recipes.map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
      {!isEnd ? (
        <div className="mb-4">
          <div ref={loaderRef}>{isLoading && <LoadingPage />}</div>
        </div>
      ) : (
        <div className="mb-4">
          <EndOfRecipes />
        </div>
      )}
    </div>
  );
}

export default RecipeList;
