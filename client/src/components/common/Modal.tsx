import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";

export default function Modal({ children }: PropsWithChildren) {
  return createPortal(
    <div className="fixed inset-0 w-full h-full" role="dialog">{children}</div>,
    document.body
  );
}

export function ModalBackdrop() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(1,1,1,0.5)] -z-10 "></div>
  );
}

export function ModalPanel({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={cn(
          "relative bg-white border rounded-20 border-gray100 p-28",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
