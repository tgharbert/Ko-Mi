import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="text-center ">
      <div className="-mt-9">
        <Header />
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
    </div>
  );
}
