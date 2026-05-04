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
      className={`w-full shrink-0 overflow-hidden lg:h-screen lg:w-screen ${className}`}
    >
      {children}
    </div>
  );
}