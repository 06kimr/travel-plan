import cn from "classnames";
import Button from "../common/Button";

export default function PlanSteps() {
  const currentStep = 0;
  return (
    <div className="flex flex-col items-center justify-between px-20 py-50">
      <ul className="flex flex-col w-78 gap-y-30">
        {steps.map((step, index) => {
          const active = index === currentStep;
          return (
            <li
              key={index}
              className={cn("text-15 font-semibold leading-[1.5]", {
                "text-main": active,
                "text-gray300": !active,
              })}
            >
              STEP {index + 1}
              <br />
              {step.text}
            </li>
          );
        })}
      </ul>
      <Button className="px-36">다음</Button>
    </div>
  );
}

const steps = [
  { text: "날짜 선택" },
  { text: "장소 선택" },
  { text: "숙소 선택" },
];
