"use client";

import { useState, useEffect } from "react";
import getFriends from "@/app/friends/data/getFriends";

export function useFriends() {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await getFriends();
      if (cancelled) return;
      if (result) {
        setFriends(result);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { friends, isLoading, isError };
}
