import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="text-center ">
      <div className="header">
        <Header />
        <h1>Ko-Mi</h1>
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
    </div>
  );
}
