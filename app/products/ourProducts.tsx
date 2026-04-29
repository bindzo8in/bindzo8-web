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
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-20 text-center text-4xl font-light text-[#E7325C] md:text-5xl">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-16 lg:px-32">
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
    <article className="overflow-hidden rounded-xl bg-[#FFF4F4]/95 shadow-lg backdrop-blur-sm">
      <div className="relative h-[260px] w-full md:h-[300px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="min-h-[210px] p-8">
        <h3 className="mb-6 text-2xl font-bold text-black">
          {product.title}
        </h3>

        <p className="text-sm leading-snug text-black">
          {product.description}
        </p>
      </div>
    </article>
  );
}