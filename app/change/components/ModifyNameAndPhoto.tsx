"use client";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import updateName from "../data/updateName";
import updatePhoto from "../data/updatePhoto";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import heic2any from "heic2any";
import LoadingPage from "@/app/loading";

const ModifyNameAndPhoto = ({
  recipe,
  revalidate,
}: {
  recipe: Recipe;
  revalidate: Function;
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(recipe.name);

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]; // Get the selected file

    const fileType = file.type;
    if (fileType === "image/heic" || fileType === "image/heif") {
      try {
        setIsLoading(true);
        const convertedImage = await heic2any({
          blob: file,
          toType: "image/jpg",
        });
        setIsLoading(false);
        setSelectedImage(convertedImage);
        // handling type issues around Blob vs Blob[]
        let val;
        Array.isArray(convertedImage)
          ? (val = convertedImage[0])
          : (val = convertedImage);
        setPreviewUrl(URL.createObjectURL(val));
      } catch (error) {
        console.error("Error converted .heic/.heif image: ", error);
      }
    } else {
      setSelectedImage(file);
      // Generate a preview URL for the image
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage && name === recipe.name) {
      return;
    } else if (!selectedImage) {
      updateName(recipe.id, name);
      revalidate;
    } else {
      const filename = `${recipe.name}Photo-${new Date().getTime()}`;
      const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(filename, selectedImage, {
          contentType: selectedImage.type,
          cacheControl: "3600",
          upsert: true,
        });
      // adjust this value to accept and adjust name as well....
      updatePhoto(recipe.id, recipeAddress, name);
      setSelectedImage(recipeAddress);
      if (error) {
        console.error("error from upload: ", error);
      }
    }
  };

  return (
    <form className="pb-6" onSubmit={handleSubmit}>
      <div className="pb-4 pt-4">
        <input
          className="text-black text-center font-bold rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          type="text"
          accept="image/*,.pdf"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          defaultValue={`${recipe.name}`}
        />
      </div>
      <div className="flex justify-center pb-4">
        {isLoading ? (
          <div className="pb-4">
            <h2 className="bold italic text-xl">Processing Image...</h2>
            <LoadingPage />
          </div>
        ) : (
          <Image
            className="rounded-lg"
            src={previewUrl ? previewUrl : recipe.image}
            alt={`photo of ${recipe.name}`}
            width={300}
            height={300}
          ></Image>
        )}
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded cursor-pointer">
          <CloudUploadIcon />
          Upload file
          <input
            type="file"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <button
        className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Update Name and Photo
      </button>
    </form>
  );
};

export default ModifyNameAndPhoto;
