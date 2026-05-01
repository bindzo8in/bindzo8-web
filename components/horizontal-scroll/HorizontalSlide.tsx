import { ReactNode } from "react";

type HorizontalSlideProps = {
  children: ReactNode;
  className?: string;
};

export default function HorizontalSlide({
  children,
  className = "",
}: HorizontalSlideProps) {
  return (
    <div
      className={`h-screen w-screen shrink-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}