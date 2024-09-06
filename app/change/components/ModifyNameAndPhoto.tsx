import Image from "next/image";
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
          // cacheControl: "3600",
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
    <form action={modifyNameAndPhoto} className="pb-6">
      <div className="pb-4 pt-4">
        <input
          className="text-black text-center font-bold rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
          type="text"
          name="name"
          defaultValue={`${recipe.name}`}
        />
      </div>
      <div className="flex justify-center pb-4">
        <Image
          className="rounded-lg"
          src={recipe.image}
          alt={`photo of ${recipe.name}`}
          width={300}
          height={300}
        ></Image>
      </div>
      <input
        type="file"
        name="photo"
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-secondary text-white hover:bg-lime-600 ml-2 px-4 py-2 rounded-lg italic"
      >
        <CloudUploadIcon className="mr-4" />
        Click to Upload Photo
      </label>
      <div className="pt-4">
        <button className="font-bold ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4">
          Update Name and Photo
        </button>
      </div>
    </form>
  );
};

export default ModifyNameAndPhoto;
