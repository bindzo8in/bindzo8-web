import Image from "next/image";
import WaveBackground from "./background";

type Product = {
  title: string;
  description: string;
  image: string;
};

type ProductsSectionProps = {
  title?: string;
  products: Product[];
};

export default function ProductsSection({
  title = "Our Products",
  products,
}: ProductsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 font-kumbh">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
        <WaveBackground />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="mb-12 md:mb-20 text-center text-3xl font-bold text-[#E7325C] md:text-5xl lg:text-6xl tracking-tight">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-12 lg:px-12 xl:px-0">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[#FFF4F4]/95 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/20">
      <div className="relative h-[240px] sm:h-[280px] w-full md:h-[320px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col p-6 sm:p-8 min-h-[180px] md:min-h-[220px]">
        <h3 className="mb-4 text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h3>

        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
          {product.description}
        </p>
      </div>
    </article>
  );
}