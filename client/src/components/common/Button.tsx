import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface Props {
  variant?: "primary";
}

export default function Button({
  variant="primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button className={cn(classes[variant], "font-medium  py-14 rounded-6", className)} {...props}>
      {children}
    </button>
  );
}

const classes = {
  primary: "text-white bg-black disabled:bg-gray200"
}