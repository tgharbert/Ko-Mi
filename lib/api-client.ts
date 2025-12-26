/**
 * Centralized API client for making requests to backend API routes
 */

// Recipe API
export const recipeApi = {
  async getAll(params?: {
    query?: string;
    category?: string;
    page?: number;
    random?: boolean;
    all?: boolean;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.set("query", params.query);
    if (params?.category) searchParams.set("category", params.category);
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.random) searchParams.set("random", "true");
    if (params?.all) searchParams.set("all", "true");

    const response = await fetch(`/api/recipes?${searchParams}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch recipes");
    }
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`/api/recipes/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch recipe");
    }
    return response.json();
  },

  async create(data: {
    url: string;
    multiplier?: number;
    category?: string;
    keywords?: string[];
  }) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create recipe");
    }
    return response.json();
  },

  async update(id: string, data: { multiplier?: number; category?: string }) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update recipe");
    }
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete recipe");
    }
    return response.json();
  },

  async addToUser(recipeId: string) {
    const response = await fetch("/api/recipes/add-to-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add recipe to user");
    }
    return response.json();
  },
};

// Ingredient API
export const ingredientApi = {
  async getAll() {
    const response = await fetch("/api/ingredients");
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch ingredients");
    }
    return response.json();
  },

  async add(ingredients: Array<{ name: string; amount: string }>) {
    const response = await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add ingredients");
    }
    return response.json();
  },

  async addItem(item: string) {
    const response = await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add item");
    }
    return response.json();
  },

  async check(id: string, checked: boolean) {
    const response = await fetch(`/api/ingredients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update ingredient");
    }
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/ingredients/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete ingredient");
    }
    return response.json();
  },

  async deleteAll() {
    const response = await fetch("/api/ingredients?deleteAll=true", {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete all ingredients");
    }
    return response.json();
  },

  async deleteChecked() {
    const response = await fetch("/api/ingredients?deleteChecked=true", {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete checked ingredients");
    }
    return response.json();
  },

  async share(friendId: string, ingredients: string[]) {
    const response = await fetch("/api/ingredients/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendId, ingredients }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to share ingredients");
    }
    return response.json();
  },
};

// Friend API
export const friendApi = {
  async getAll() {
    const response = await fetch("/api/friends");
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch friends");
    }
    return response.json();
  },

  async sendRequest(friendId: string) {
    const response = await fetch("/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send friend request");
    }
    return response.json();
  },

  async accept(friendshipId: string) {
    const response = await fetch(`/api/friends/${friendshipId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "accept" }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to accept friend request");
    }
    return response.json();
  },

  async remove(friendshipId: string) {
    const response = await fetch(`/api/friends/${friendshipId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to remove friend");
    }
    return response.json();
  },
};

// User API
export const userApi = {
  async search(query: string) {
    const response = await fetch(`/api/users?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to search users");
    }
    return response.json();
  },
};
