import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import Image from 'next/image'

const UsageContent = () => {
    return (
        <HorizontalSlide className="flex items-center justify-center py-[95px]">
            <div className='flex flex-1 gap-x-4 justify-center items-center h-full'>
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
            <div className='flex-1 relative flex items-center'>
                <h2 className='text-orange-500 font-bold leading-[1.5] tracking-tight text-5xl text-center  top-1/2 -translate-y-1/2'>
                    360° Digital<br />
                    Marketing
                </h2>
                <Image
                    src={"/services/rocket.png"}
                    alt=''
                    width={496}
                    height={655}
                    className='absolute top-1/2 -translate-y-1/2 right-[10%]'
                />
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
        <div className="parallax-item">
            <h3 className="text-orange-500 font-semibold mb-6 text-[clamp(1.45rem,2vw,2.4rem)]">
                {title}
            </h3>

            <ul className="space-y-4 text-white/95 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug">
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