import React from "react";
import { ArrowRight } from "lucide-react";

export function InteractiveHoverButton({
  text = "Button",
  className,
  onClick,
  ...props
}) {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-full border bg-white p-2 text-center font-semibold text-black ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-black opacity-0 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-blue-900 group-hover:opacity-100 dark:group-hover:bg-blue-800"></div>
    </div>
  );
}