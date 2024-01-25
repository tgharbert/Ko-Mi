import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  //
  // THIS IS THE FUNCTION THAT WILL PULL NUMBERS FROM INGREDIENTS
  // CAN THEN BE 'SET' BY NEW SERVING SIZE
  // const parseNumberAmount = (string) => {
  //   const firstValue = string.split(' ')[0]
  //   if (firstValue.includes('.') || firstValue.includes('/')) {
  //     return eval(firstValue)
  //   } else if (parseInt(firstValue) < 0 || parseInt(firstValue) > 0) {
  //     return parseInt(firstValue);
  //   }
  //   return false;
  // }

  return (
    <div className="text-center ">
      <div className="-mt-9">
        <Header />
        {/* <h1>Ko-Mi</h1> */}
      </div>
      <h2>
        <p>Here are a list of your recipes:</p>
      </h2>
    </div>
  );
}
