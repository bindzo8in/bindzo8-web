export default function FixedQuoteButton() {
  return (
    <button
      className="
        fixed right-0 top-1/2 z-[9999]
        flex h-[42px] w-[120px]
        -translate-y-1/2 translate-x-[39px]
        -rotate-90 items-center justify-center gap-2
        rounded-t-[6px] bg-[#F47C2A]
        text-[14px] font-semibold text-white
        shadow-lg transition hover:bg-[#e86f1f]
        font-kumbh
        hidden
        sm:block
      "
    >
      Get Quote
    </button>
  );
}