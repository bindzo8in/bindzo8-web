import Image from "next/image";
import HorizontalSlide from "@/components/horizontal-scroll/HorizontalSlide";

const foodAppHighlights = [
  {
    title: "User-Friendly Interface",
    desc: "Clean, simple, and intuitive screens that help users browse menus, customize orders, and check out effortlessly.",
  },
  {
    title: "Fast & Real-Time Ordering System",
    desc: "Instant order placement, real-time order tracking, and live notifications for smooth communication between customer, delivery partner, and restaurant.",
  },
  {
    title: "Advanced Restaurant Dashboard",
    desc: "Restaurants can manage menus, prices, orders, inventory, and customer requests with ease through a dedicated dashboard.",
  },
  {
    title: "Secure Payments Integration",
    desc: "Multiple payment options like UPI, cards, wallets, and COD with secure and encrypted transactions.",
  },
  {
    title: "Delivery Partner App",
    desc: "A complete delivery partner system with live location tracking, route guidance, order pickups, and status updates.",
  },
  {
    title: "Smart Search & Filters",
    desc: "Users can find dishes, cuisines, and restaurants quickly using advanced search tools and personalized recommendations.",
  },
  {
    title: "Loyalty, Offers & Promotions",
    desc: "Coupons, discounts, loyalty points, combo deals, and festival offers built into the system to boost customer engagement.",
  },
  {
    title: "Scalable & High-Performance Technology",
    desc: "The app is built with a scalable backend to support thousands of users, restaurants, and delivery partners without slowing down.",
  },
];

export default function FoodAppKeyHighlightsContent() {
  return (
    <HorizontalSlide className="relative flex items-center justify-center overflow-hidden bg-transparent text-white">
      <section className="relative w-full px-5 py-12 font-kumbh sm:px-8 sm:py-16 lg:h-screen lg:px-12 lg:py-0 xl:px-20">
        <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center gap-10 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8 xl:gap-12">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:max-w-[600px] xl:max-w-[660px]">
            <h2 className="mb-8 text-[28px] font-bold leading-none text-[#EF8030] sm:text-[32px] lg:mb-7 lg:text-[28px] xl:mb-8 xl:text-[32px]">
              Key Highlights:
            </h2>

            <div className="space-y-5 sm:space-y-6 lg:space-y-4 xl:space-y-5">
              {foodAppHighlights.map((item, index) => (
                <div key={item.title} className="text-white">
                  <h3 className="text-[15px] font-bold leading-[1.15] sm:text-[16px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                    {index + 1}. {item.title}
                  </h3>

                  <p className="mt-1 max-w-[660px] text-[14px] font-normal leading-[1.25] text-white/95 sm:text-[15px] lg:text-[13.5px] lg:leading-[1.22] xl:text-[14.5px] 2xl:text-[15px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 flex w-full items-center justify-center lg:h-full lg:justify-end">
            <div className="relative h-[360px] w-full max-w-[620px] sm:h-[520px] sm:max-w-[740px] md:h-[600px] lg:h-[78vh] lg:max-h-[680px] lg:max-w-[720px] xl:h-[82vh] xl:max-h-[760px] xl:max-w-[820px]">
              <Image
                src="/good-vibes/food-app-screens.png"
                alt="Good Vibes food app screens"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52vw, 820px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </HorizontalSlide>
  );
}