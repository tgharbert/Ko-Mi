import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <div className="header">
        <Header />
        <h1>Ko-Mi</h1>
      </div>
      <div>
        <>This is the Body</>
      </div>
    </div>
  );
}
