"use client";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import updateName from "../data/updateName";
import updatePhoto from "../data/updatePhoto";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

const ModifyNameAndPhoto = ({ recipe }: { recipe: Recipe }) => {
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  // useEffect(() => {
  //   const handleFileInputChange = () => {
  //     if (!recipe.image) {
  //       return;
  //     }
  //     const file: any = recipe.image;
  //     if (file instanceof Blob) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  //   handleFileInputChange();
  // }, [recipe.image]);

  const handleRecipeSubmission = async () => {
    // here is where the problem lies. I cannot pass the photo file to the backend...
    // i'm hacking around it by copying the recipe object and giving it an any type
    // then reassigning the photoFile key to a string of imagePreview.
    // let customRecipe: any = recipe;
    console.log("HIIIIIITTTTTT");
    try {
      const filename = `${recipe.name}Photo`;
      const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(filename, recipe.image, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        console.error("error from upload: ", error);
      }
      // customRecipe.image = recipeAddress;
      // await addCustomRecipe(recipe);
      updatePhoto(recipe.id, recipeAddress);
    } catch (error) {
      console.error("error attempting to upload: ", error);
    }
  };

  // async function modifyNameAndPhoto(formData: FormData) {
  //   "use server";
  //   console.log("submitted name and photo");
  //   try {
  //     const rawFormData = {
  //       name: formData.get("name") as string,
  //       photo: formData.get("photo") as File,
  //     };

  //     let newName = rawFormData.name;
  //     if (newName) {
  //       newName = newName.toString();
  //       await updateName(recipe.id, newName);
  //     }

  //     if (rawFormData.photo.size === 0) {
  //       return;
  //     }
  //     const filename = `${recipe.name}Photo`;
  //     // delete photo file
  //     // const { error } = await supabase.storage.from("images").remove([filename]);
  //     // if (error) {
  //     //   console.error("error deleting old photo: ", error);
  //     //   return;
  //     // }

  //     const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
  //     if (rawFormData.photo instanceof File) {
  //       // const filename = `${recipe.name}Photo`;
  //       const { error } = await supabase.storage
  //         .from("images")
  //         .upload(filename, rawFormData.photo, {
  //           contentType: rawFormData.photo.type,
  //           cacheControl: "3600",
  //           upsert: true,
  //         });
  //       if (error) {
  //         console.error("error from upload: ", error);
  //         return;
  //       }
  //       updatePhoto(recipe.id, recipeAddress);
  //     }
  //     revalidatePath(`/change/${recipe.id}`);
  //   } catch (error) {
  //     console.error("error on submission: ", error);
  //     return;
  //   }
  // }

  return (
    // <form action={modifyNameAndPhoto} className="pb-6">
    <form className="pb-6" onSubmit={() => handleRecipeSubmission}>
      <div className="pb-4 pt-4">
        <input
          className="text-black text-center font-bold rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          type="text"
          accept="image/*,.pdf"
          name="name"
          defaultValue={`${recipe.name}`}
        />
      </div>
      <div className="flex justify-center pb-4">
        {typeof imagePreview === "string" && (
          <Image
            width="400"
            height="400"
            src={imagePreview}
            alt="recipe-photo"
            className="rounded-lg"
          />
        )}
        <Image
          className="rounded-lg"
          src={recipe.image}
          alt={`photo of ${recipe.name}`}
          width={300}
          height={300}
        ></Image>
      </div>
      <div className="relative inline-block cursor-pointer ">
        <input
          type="file"
          name="photo"
          className=" absolute inset-0 w-full h-full cursor-pointer "

          // className="opacity-0 absolute inset-0 w-full h-full cursor-pointer "
        ></input>
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-secondary text-white hover:bg-lime-600 ml-2 px-4 py-2 rounded-lg italic"
        >
          <CloudUploadIcon className="mr-2 pb-1 cursor-pointer" />
          Click to Upload Photo
        </label>
      </div>
      <div className="pt-4">
        <button className="font-bold ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4">
          Update Name and Photo
        </button>
      </div>
    </form>
  );
};

export default ModifyNameAndPhoto;
