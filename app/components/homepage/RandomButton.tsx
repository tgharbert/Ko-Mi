"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const RandomButton = ({ random }: { random: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const randomClick = () => {
    const params = new URLSearchParams(searchParams);
    random = String(Date.now());
    params.set("random", random);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <button onClick={() => randomClick()}>I am a random button!</button>
    </div>
  );
};

export default RandomButton;
