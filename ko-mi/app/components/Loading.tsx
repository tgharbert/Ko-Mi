import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center pt-10">
      <Image
        // className="flex justify-center items-center"
        src="/loading-buffering.gif"
        alt="loading-spinner"
        width="40"
        height="40"
      />
    </div>
  );
};

export default Loading;
