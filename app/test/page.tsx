import FloatingBrandMark from "./floatingBrandMark";

export default function HeroSection() {
  return (
    <FloatingBrandMark>

      {/* nav */}
      <nav className="w-full flex justify-between items-center px-10 py-6">
        <span className="text-white font-semibold tracking-tight">Acme</span>
        <div className="flex gap-6 text-sm text-white/50">
          <a href="#">Docs</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
        </div>
        <button>Sign in</button>
      </nav>

      {/* centred copy */}
      <div className="flex flex-col items-center text-center gap-6 px-6">
        <h1 className="text-5xl font-bold text-white">
          Ship faster.<br />Break less.
        </h1>
        <p className="text-white/50 max-w-md">
          Your platform description goes here.
        </p>
        <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl">
          Get started free
        </button>
      </div>

    </FloatingBrandMark>
  );
}