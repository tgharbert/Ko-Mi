"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ingredientApi } from "@/lib/api-client";

const INGREDIENTS_KEY = ["ingredients"];

export function useIngredients(initialData?: IngredientWithLocation[]) {
  const queryClient = useQueryClient();

  const query = useQuery<IngredientWithLocation[]>({
    queryKey: INGREDIENTS_KEY,
    queryFn: ingredientApi.getAll,
    ...(initialData !== undefined && { initialData }),
  });

  const addItem = useMutation({
    mutationFn: (item: string) => ingredientApi.addItem(item),
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: INGREDIENTS_KEY });
      const previous = queryClient.getQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY);
      queryClient.setQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY, (old = []) => [
        ...old,
        {
          id: -Date.now(),
          name: item,
          checked: false,
          ingredientId: null,
          location: "other",
        },
      ]);
      return { previous };
    },
    onError: (_err, _item, context) => {
      if (context?.previous) {
        queryClient.setQueryData(INGREDIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY });
    },
  });

  const checkItem = useMutation({
    mutationFn: ({ id, checked }: { id: number; checked: boolean }) =>
      ingredientApi.check(id.toString(), checked),
    onMutate: async ({ id, checked }) => {
      await queryClient.cancelQueries({ queryKey: INGREDIENTS_KEY });
      const previous = queryClient.getQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY);
      queryClient.setQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY, (old = []) =>
        old.map((ing) => (ing.id === id ? { ...ing, checked } : ing))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(INGREDIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY });
    },
  });

  const deleteChecked = useMutation({
    mutationFn: () => ingredientApi.deleteChecked(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: INGREDIENTS_KEY });
      const previous = queryClient.getQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY);
      queryClient.setQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY, (old = []) =>
        old.filter((ing) => !ing.checked)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(INGREDIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY });
    },
  });

  const deleteAll = useMutation({
    mutationFn: () => ingredientApi.deleteAll(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: INGREDIENTS_KEY });
      const previous = queryClient.getQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY);
      queryClient.setQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY, []);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(INGREDIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INGREDIENTS_KEY });
    },
  });

  const consolidate = useMutation({
    mutationFn: () => ingredientApi.consolidate(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: INGREDIENTS_KEY });
      const previous = queryClient.getQueryData<IngredientWithLocation[]>(INGREDIENTS_KEY);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(INGREDIENTS_KEY, context.previous);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(INGREDIENTS_KEY, data.ingredients);
    },
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    addItem,
    checkItem,
    deleteChecked,
    deleteAll,
    consolidate,
  };
}
