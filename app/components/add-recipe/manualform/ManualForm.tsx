import { useState } from "react";
import NameAndDescription from "./NameAndDescription";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const pageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPage(page + 1);
  };
  console.log(name);

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
        />
      )}
      {page === 2 && <>page 2</>}
    </div>
  );
};

export default RecipeForm;
