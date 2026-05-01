import HorizontalScroll from "@/components/horizontal-scroll/HorizontalScroll";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

export default function Page() {
  return (
    <main>
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-5xl">Normal Section</h1>
      </section>

      <HorizontalScroll className="bg-black text-white">
        <HorizontalSlide className="flex items-center justify-center">
          <h2 className="text-6xl">Slide 01</h2>
        </HorizontalSlide>

        <HorizontalSlide className="flex items-center justify-center">
          <h2 className="text-6xl">Slide 02</h2>
        </HorizontalSlide>

        <HorizontalSlide className="flex items-center justify-center">
          <h2 className="text-6xl">Slide 03</h2>
        </HorizontalSlide>
      </HorizontalScroll>

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-5xl">Next Normal Section</h1>
      </section>
    </main>
  );
}