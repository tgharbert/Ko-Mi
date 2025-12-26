"use client";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import updateName from "../data/updateName";
import updatePhoto from "../data/updatePhoto";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import heic2any from "heic2any";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
        <Button
          component="label"
          role={undefined}
          onChange={handleImageChange}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className="bg-lime-500 px-4"
          color="lime"
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <Button
        className="bg-lime-500 px-4"
        variant="contained"
        color="lime"
        onClick={handleSubmit}
      >
        Update Name and Photo
      </Button>
    </form>
  );
};

export default ModifyNameAndPhoto;
