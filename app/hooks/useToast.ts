"use client";

import { useState, useCallback } from "react";

export function useToast(duration = 2000) {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), duration);
  }, [duration]);

  const hide = useCallback(() => setIsVisible(false), []);

  return { isVisible, show, hide };
}
