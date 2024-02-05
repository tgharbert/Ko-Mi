const Keywords = ({ keywords }: { keywords: string[] }) => {
  return (
    <div>
      Keywords:
      {keywords.map((keyword: string) => {
        return (
          <div className="" key={keyword}>
            #{keyword}
          </div>
        );
      })}
    </div>
  );
};

export default Keywords;
