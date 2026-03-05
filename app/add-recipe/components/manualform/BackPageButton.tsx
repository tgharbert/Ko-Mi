import PrimaryButton from "@/app/components/PrimaryButton";

function BackPageButton({ revertPage }: { revertPage: Function }) {
  return (
    <div>
      <PrimaryButton onClick={() => revertPage()}>Previous</PrimaryButton>
    </div>
  );
}

export default BackPageButton;
