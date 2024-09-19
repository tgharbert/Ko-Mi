"use client";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import updateName from "../data/updateName";
import updatePhoto from "../data/updatePhoto";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/mui-styles/styles";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ModifyNameAndPhoto = ({
  recipe,
  revalidate,
}: {
  recipe: Recipe;
  revalidate: Function;
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [name, setName] = useState(recipe.name);

  // Handle image selection
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedImage(file); // Set the file in state
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // SO THE ISSUE HERE IS THAT HEIC ISN'T A FORMAT THAT BROWSERS SUPPORT....
    // OPTION IS TO USE THIRD PARTY LIB THAT WILL DO A CONVERSION....
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
      // revalidate();
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
    <ThemeProvider theme={theme}>
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
          <Image
            className="rounded-lg"
            src={previewUrl ? previewUrl : recipe.image}
            alt={`photo of ${recipe.name}`}
            width={300}
            height={300}
          ></Image>
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
          {selectedImage !== null ? (
            <p className="pb-2 pt-2">
              <span className="italic pr-2">currently selected:</span>
              <b>{selectedImage.name}</b>
            </p>
          ) : (
            ""
          )}
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
    </ThemeProvider>
  );
};

export default ModifyNameAndPhoto;
