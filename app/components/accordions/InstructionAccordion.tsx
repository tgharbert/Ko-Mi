import Accordion from "@/app/components/Accordion";

function InstructionAccordion({ instructions }: { instructions: string[] }) {
  const he = require("he");

  return (
    <Accordion title="Method" maxHeight="max-h-[2000px]">
      {instructions.map((instruction: string, idx) => (
        <div className="pb-2 pt-2" key={idx}>
          {he.decode(instruction)}
        </div>
      ))}
    </Accordion>
  );
}

export default InstructionAccordion;
