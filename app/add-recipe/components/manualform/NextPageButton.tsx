import PrimaryButton from "@/app/components/PrimaryButton";

function NextPageButton({ pageChange }: { pageChange: Function }) {
  return (
    <div>
      <PrimaryButton onClick={() => pageChange()}>Next Page</PrimaryButton>
    </div>
  );
}

export default NextPageButton;
