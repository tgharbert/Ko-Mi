import Image from "next/image";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import updateName from "../data/updateName";
import updatePhoto from "../data/updatePhoto";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

const ModifyNameAndPhoto = async ({ recipe }: { recipe: Recipe }) => {
  async function modifyNameAndPhoto(formData: FormData) {
    "use server";
    const rawFormData = {
      name: formData.get("name") as string,
      photo: formData.get("photo") as File,
    };

    let newName = rawFormData.name;
    if (newName) {
      newName = newName.toString();
      await updateName(recipe.id, newName);
    }

    if (rawFormData.photo instanceof File) {
      const arrayBuffer = await rawFormData.photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const filename = `${recipe.name}Photo`;
      const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(filename, buffer, {
          contentType: rawFormData.photo.type,
          cacheControl: "3600",
          upsert: true,
        });
      updatePhoto(recipe.id, recipeAddress);
      if (error) {
        console.error("error from upload: ", error);
      }
    }
    revalidatePath(`/change/${recipe.id}`);
  }

  return (
    <form action={modifyNameAndPhoto}>
      <div className="flex justify-center">
        <Image
          className="rounded-lg"
          src={recipe.image}
          alt={`photo of ${recipe.name}`}
          width={200}
          height={200}
        ></Image>
      </div>
      <Button
        role={undefined}
        className="px-4"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        <input type="file" name="photo"></input>
      </Button>
      <h1 className="text-xl font-semibold mb-2">{recipe.name}</h1>
      <div className="pb-4">
        <h3 className="text-lg">Name:</h3>
        <input
          className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          type="text"
          name="name"
          defaultValue={`${recipe.name}`}
        />
      </div>
      <Button>UPDATE</Button>
    </form>
  );
};

export default ModifyNameAndPhoto;
