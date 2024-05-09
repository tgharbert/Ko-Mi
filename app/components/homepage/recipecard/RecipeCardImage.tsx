import Image from "next/image";

function RecipeCardImage({ image, name }: { image: string; name: string }) {
  return (
    <div>
      <Image
        src={image}
        alt={`Image of ${name}`}
        width="100"
        height="100"
        className="rounded-lg"
      />
    </div>
  );
}

export default RecipeCardImage;
