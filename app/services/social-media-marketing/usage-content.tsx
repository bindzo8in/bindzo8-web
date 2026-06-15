import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import Image from 'next/image'

const UsageContent = () => {
    return (
        <HorizontalSlide className="flex flex-col lg:flex-row items-center justify-center py-16 lg:py-[95px] gap-12 lg:gap-4 px-6 lg:px-0 ">
            <div className='flex flex-col lg:flex-row flex-1 gap-8 lg:gap-x-4 justify-center items-start lg:items-center h-full px-4 lg:px-8'>
                <ListBlock
                    title="Usage / Use Cases"
                    items={[
                        "Brand promotion",
                        "Lead generation",
                        "Product marketing",
                        "Event promotions",
                        "E-commerce campaigns",
                        "Social media branding",
                        "Customer engagement",
                    ]}
                />

                <ListBlock
                    title="Technologies Used"
                    items={[
                        "Meta Ads Manager",
                        "Google Ads",
                        "Google Analytics",
                        "Canva, Photoshop, Illustrator",
                        "Mailchimp / SendGrid",
                        "Keyword research tools (SEMrush, Ahrefs)",
                    ]}
                />
            </div>
            <div className='flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-0 w-full'>
                <h2 className='text-[#d3325c] font-bold leading-[1.5] tracking-tight text-3xl lg:text-5xl text-center lg:text-left lg:pl-12 shrink-0'>
                    360° Digital<br />
                    Marketing
                </h2>
                <div className='relative flex justify-center lg:justify-end w-full lg:pr-8'>
                    <Image
                        src={"/services/rocket.png"}
                        alt=''
                        width={496}
                        height={655}
                        className='w-48 lg:w-[380px] xl:w-[460px] h-auto'
                    />
                </div>
            </div>
        </HorizontalSlide>
    )
}

export default UsageContent

/* ---------------- HELPERS ---------------- */

function ListBlock({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    return (
        <div className="parallax-item w-full lg:w-auto">
            <h3 className="text-[#d3325c] font-semibold mb-4 lg:mb-6 text-xl lg:text-[clamp(1.45rem,2vw,2.4rem)]">
                {title}
            </h3>

            <ul className="space-y-2 lg:space-y-4 text-white/95 text-sm lg:text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
                {items.map((item) => (
                    <li key={item} className="flex gap-3">
                        <span className="text-white/55">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}