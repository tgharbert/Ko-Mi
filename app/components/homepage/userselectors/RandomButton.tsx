"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ShuffleIcon from "@mui/icons-material/Shuffle";

function RandomButton({ random }: { random: string }) {
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
    <div className="mb-4">
      <button
        className="bg-lime-600 hover:bg-lime-700 text-tertiary px-4 py-2 rounded"
        onClick={() => randomClick()}
      >
        Randomize
        <ShuffleIcon className="ml-2" />
      </button>
    </div>
  );
}

export default RandomButton;
