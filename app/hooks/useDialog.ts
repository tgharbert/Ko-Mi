"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const dialogProps = {
    ref: dialogRef,
    onClose: close,
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) close();
    },
    className: "rounded-xl backdrop:bg-black/50 p-0 animate-fade-in",
  };

  return { isOpen, open, close, dialogRef, dialogProps };
}
