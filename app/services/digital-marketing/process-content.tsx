import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import React from 'react'

function ProcessContent() {
    return (
        <HorizontalSlide className='flex items-start lg:items-center justify-center flex-col text-white py-16 lg:py-[95px] bg-black'>
            <header className='mb-8 lg:mb-16 self-start pl-6 lg:pl-8 pt-4 lg:pt-8'>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-[#EF8030]">
                    Process:
                </h4>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0 px-6 lg:px-0 w-full flex-1">
                <div className="space-y-10 lg:space-y-16 lg:border-r lg:border-white/40 lg:pr-10 pr-0 lg:pl-8">
                    <ListBlock
                        title='1. User & Market Research'
                        items={[
                            'Analyze target audience behavior',
                            'Understand customer pain points',
                            'Study competitor marketing strategies',
                            'Identify marketing gaps & opportunities'
                        ]}
                    />
                    <ListBlock
                        title='2. Designing & Prototyping'
                        items={[
                            'Campaign visual mockups',
                            'Ad creative designs',
                            'Content planning & calendars',
                            'Copywriting for ads & captions'
                        ]}
                    />
                </div>

                <div className="space-y-10 lg:space-y-16 lg:border-r lg:border-white/40 lg:px-10">
                    <ListBlock
                        title='3. Development'
                        items={[
                            "Setting up ad campaigns",
                            "Creating landing pages",
                            "Configuring tracking & analytics",
                            "Audience segmentation"
                        ]}
                    />
                    <ListBlock
                        title='4. Testing'
                        items={[
                            "A/B testing of creatives",
                            "Split testing headlines",
                            "Testing audience groups",
                            "Reviewing engagement metrics"
                        ]}
                    />
                </div>

                <div className="space-y-10 lg:space-y-16 lg:pl-10">
                    <ListBlock
                        title='5. Deployment'
                        items={[
                            "Launching digital campaigns",
                            "Publishing posts & ads",
                            "Scheduling content"
                        ]}
                    />
                    <ListBlock
                        title='6. Platform Approval'
                        items={[
                            "(Optional – Ads Approval)",
                            "Facebook/Instagram ad approval",
                            "Google search/display ad approval"
                        ]}
                    />
                </div>
            </div>
        </HorizontalSlide>
    )
}

export default ProcessContent

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
            <h3 className="text-white font-semibold mb-4 text-lg lg:text-[clamp(1.45rem,2vw,2.4rem)]">
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