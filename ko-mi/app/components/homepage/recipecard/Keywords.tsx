type Keywords = {
  id: number;
  name: string;
  recipeId: number;
};

const Keywords = ({ keywords }: { keywords: Keywords[] }) => {
  return (
    <div>
      Keywords:
      {keywords.map((keyword: Keywords) => {
        return (
          <div className="" key={keyword.id}>
            #{keyword.name}
          </div>
        );
      })}
    </div>
  );
};

export default Keywords;
