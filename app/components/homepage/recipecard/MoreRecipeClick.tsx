"use client";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { addUserRecipe } from "@/app/data/addUserRecipe";
import { useRouter } from "next/navigation";
import deleteUserRecipe from "@/app/data/deleteRecipe";
import PrimaryButton from "@/app/components/PrimaryButton";

const MoreRecipeClick = ({
  user,
  added,
  author,
  recipeId,
  recipeName,
  uploadedBy,
}: {
  user: User;
  added: string;
  author: string;
  recipeId: number;
  recipeName: string;
  uploadedBy: string;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteClick, setDeleteClick] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (isDeleteClick) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDeleteClick]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const onDeleteRecipe = () => {
    deleteUserRecipe(recipeId);
  };

  const router = useRouter();

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={handleClick}
        aria-label="open-menu"
        className="p-2"
      >
        <MoreVertical className="text-black" size={24} />
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setDeleteClick(false)}
        onClick={(e) => { if (e.target === dialogRef.current) setDeleteClick(false); }}
        className="rounded-xl backdrop:bg-black/50 p-0 animate-fade-in"
      >
        <p className="px-10 pt-4 pb-4 justify-center flex font-bold text-black">
          Are you sure you want to delete:
        </p>
        <div className="px-10 pb-4 justify-center flex font-bold text-black">
          <b>{recipeName}</b>
        </div>
        <div className="flex justify-center content-center mb-4">
          <PrimaryButton onClick={onDeleteRecipe}>
            Yes
          </PrimaryButton>
        </div>
      </dialog>
      {menuOpen && (
        <div className="absolute right-0 top-full bg-white rounded-lg shadow-lg z-50 min-w-[160px] py-1 animate-fade-in">
          {user.name === author && (
            <div>
              <Link href={`/change/${recipeId}`}>
                <button
                  onClick={() => { handleClose(); router.push(`/change/${recipeId}`); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black transition-colors"
                >
                  Modify
                </button>
              </Link>
            </div>
          )}
          <div>
            <button
              onClick={() => { setDeleteClick(!isDeleteClick); handleClose(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black transition-colors"
            >
              Delete Recipe
            </button>
          </div>
          {user.id !== added && (
            <button
              onClick={() => { addUserRecipe(recipeId); handleClose(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black transition-colors"
            >
              Add to my Ko-Mi
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MoreRecipeClick;
