import { useState } from "react";
import NameAndDescription from "./NameAndDescription";
import convertTime from "@/utils/convertInputTime";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [servingSize, setServingSize] = useState<string>("1");
  const [cookTime, setCookTime] = useState("");

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const servingsChange = (value: string) => {
    setServingSize(value);
  };

  const pageChange = () => {
    setPage(page + 1);
  };

  const formatTime = (hours: string, minutes: string) => {
    const formattedTime = convertTime(hours, minutes);
    setCookTime(formattedTime);
  };

  console.log(cookTime);

  return (
    <div className="px-8 justify-center flex">
      {page === 1 && (
        <NameAndDescription
          nameChange={nameChange}
          descriptionChange={descriptionChange}
          pageChange={pageChange}
          name={name}
          description={description}
          page={page}
          servingsChange={servingsChange}
          servingSize={servingSize}
          formatTime={formatTime}
        />
      )}
      {page === 2 && <>page 2</>}
    </div>
  );
};

export default RecipeForm;
