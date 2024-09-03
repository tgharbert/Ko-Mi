import Image from "next/image";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const ModifyNameAndPhoto = async ({ recipe }: { recipe: Recipe }) => {
  async function modifyNameAndPhoto(formData: FormData) {
    "use server";
    const rawFormData = {
      name: formData.get("name"),
      photo: formData.get("photo"),
    };

    console.log(rawFormData);
    // write this to the db???
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
        // component="label"
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
    </form>
  );
};

export default ModifyNameAndPhoto;
