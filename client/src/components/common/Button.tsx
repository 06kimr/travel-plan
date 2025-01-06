import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface Props {
  variant?: "primary" | "action";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      className={cn(
        classes[variant],
        "font-medium text-16 rounded-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const classes = {
  primary: "text-white bg-black disabled:bg-gray200 py-14",
  action: "px-8 py-6 mr-5 font-medium bg-main/10 rounded-10 text-14 text-main",
};
