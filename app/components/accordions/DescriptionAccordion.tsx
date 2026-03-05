import Accordion from "@/app/components/Accordion";

function DescriptionAccordion({ description }: { description: string }) {
  return (
    <Accordion title="Recipe Description" maxHeight="max-h-[500px]">
      <p>{description}</p>
    </Accordion>
  );
}

export default DescriptionAccordion;
