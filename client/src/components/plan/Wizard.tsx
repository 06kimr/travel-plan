import { ReactNode, useState } from "react";
import Button from "../common/Button";
import cn from "classnames";

type Step = {
  title: string;
  content: ({ onNext }: { onNext: () => void }) => ReactNode;
};

interface Props {
  steps: Step[];
  onCompleted?: () => void;
}

export default function Wizard({ steps, onCompleted }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className="flex">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onChangeStep={setCurrentStep}
        onCompleted={onCompleted}
      />
      {steps[currentStep].content({ onNext })}
    </div>
  );
}

function Steps({
  steps,
  currentStep,
  onChangeStep,
  onCompleted,
}: {
  steps: Step[];
  currentStep: number;
  onChangeStep: (index: number) => void;
  onCompleted?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between flex-shrink px-20 py-50 w-140 whitespace-nowrap">
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
              <button onClick={() => onChangeStep(index)}>
                STEP {index + 1}
                <br />
                {step.title}
              </button>
            </li>
          );
        })}
      </ul>
      {(currentStep < steps.length - 1 ||
        onCompleted) && (
          <Button
            className=" px-36"
            onClick={() =>
              currentStep < steps.length - 1
                ? onChangeStep(currentStep + 1)
                : onCompleted?.()
            }
          >
            다음
          </Button>
        )}
    </div>
  );
}
