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

  console.log(selectedImage);

  // Handle image selection
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedImage(file); // Set the file in state
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the image
      // console.log("previewURL: ", previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // SO THE ISSUE HERE IS THAT HEIC ISN'T A FORMAT THAT BROWSERS SUPPORT....
    // OPTION IS TO USE THIRD PARTY LIB THAT WILL DO A CONVERSION....
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }
    const filename = `${recipe.name}Photo-${new Date().getTime()}`;
    const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
    // await supabase.storage.from("images").update(filename, selectedImage);
    const { error } = await supabase.storage
      .from("images")
      .upload(filename, selectedImage, {
        contentType: selectedImage.type,
        cacheControl: "3600",
        upsert: true,
      });
    updatePhoto(recipe.id, recipeAddress);
    setSelectedImage(recipeAddress);
    if (error) {
      console.error("error from upload: ", error);
    }
    revalidate();
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
            defaultValue={`${recipe.name}`}
          />
        </div>
        <div className="flex justify-center pb-4">
          {previewUrl ? (
            <Image
              width={300}
              height={300}
              src={previewUrl}
              alt={`preview of ${recipe.name}`}
              className="rounded-lg"
            />
          ) : (
            <Image
              className="rounded-lg"
              src={recipe.image}
              alt={`photo of ${recipe.name}`}
              width={300}
              height={300}
            ></Image>
          )}
        </div>
        {/* <div className="relative inline-block cursor-pointer ">
        <input
          type="file"
          name="photo"
          // className=" absolute inset-0 w-full h-full cursor-pointer "
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer "
          onChange={handleImageChange}
        ></input>
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-secondary text-white hover:bg-lime-600 ml-2 px-4 py-2 rounded-lg italic"
        >
          <CloudUploadIcon className="mr-2 pb-1 cursor-pointer" />
          Click to Upload Photo
        </label>
      </div> */}

        <div className="mb-4">
          {/* <p>Upload a Photo:</p> */}
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

        <div className="">
          <Button
            className="bg-lime-500 px-4"
            variant="contained"
            color="lime"
            // className="font-bold ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4"
          >
            Update Name and Photo
          </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default ModifyNameAndPhoto;
