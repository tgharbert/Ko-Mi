"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import PrimaryButton from "@/app/components/PrimaryButton";

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
      <PrimaryButton onClick={() => randomClick()} className="inline-flex items-center">
        Randomize
        <Shuffle className="ml-2" size={18} />
      </PrimaryButton>
    </div>
  );
}

export default RandomButton;
