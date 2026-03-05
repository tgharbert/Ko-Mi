"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ShuffleIcon from "@mui/icons-material/Shuffle";
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
    <div className="mb-4">
      <PrimaryButton onClick={() => randomClick()}>
        Randomize
        <ShuffleIcon className="ml-2" />
      </PrimaryButton>
    </div>
  );
}

export default RandomButton;
