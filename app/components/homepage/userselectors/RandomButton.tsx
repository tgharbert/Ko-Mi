"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";


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
    <div>
      <button
        onClick={() => randomClick()}
        className="inline-flex items-center text-xs sm:text-sm text-accent border border-accent px-3 py-1.5 rounded hover:bg-accent hover:text-black active:scale-95 transition-all duration-150 whitespace-nowrap"
      >
        <Shuffle className="mr-1 shrink-0" size={14} />
        Randomize
      </button>
    </div>
  );
}

export default RandomButton;
