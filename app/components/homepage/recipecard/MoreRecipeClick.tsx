"use client";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { addUserRecipe } from "@/app/data/addUserRecipe";
import { useRouter } from "next/navigation";
import deleteUserRecipe from "@/app/data/deleteRecipe";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useDialog } from "@/app/hooks/useDialog";
import { useClickOutside } from "@/app/hooks/useClickOutside";

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
  const { isOpen: menuOpen, toggle, close: closeMenu, ref: menuRef } = useClickOutside();
  const { open: openDeleteDialog, dialogProps } = useDialog();

  const onDeleteRecipe = () => {
    deleteUserRecipe(recipeId);
  };

  const router = useRouter();

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={toggle}
        aria-label="open-menu"
        className="p-2"
      >
        <MoreVertical className="text-black" size={24} />
      </button>
      <dialog {...dialogProps}>
        <p className="px-10 pt-4 pb-4 justify-center flex font-bold text-black">
          Are you sure you want to delete:
        </p>
        <div className="px-10 pb-4 justify-center flex font-bold text-black">
          <b>{recipeName}</b>
        </div>
        <div className="flex justify-center content-center mb-4">
          <PrimaryButton onClick={onDeleteRecipe} variant="danger">
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
                  onClick={() => { closeMenu(); router.push(`/change/${recipeId}`); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black transition-colors"
                >
                  Modify
                </button>
              </Link>
            </div>
          )}
          <div>
            <button
              onClick={() => { openDeleteDialog(); closeMenu(); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black transition-colors"
            >
              Delete Recipe
            </button>
          </div>
          {user.id !== added && (
            <button
              onClick={() => { addUserRecipe(recipeId); closeMenu(); }}
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
