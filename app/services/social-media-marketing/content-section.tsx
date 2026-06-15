import HorizontalScroll from '@/components/horizontal-scroll/HorizontalScroll'
import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import React from 'react'

function ContentSection() {
    return (
        <HorizontalScroll className="bg-black text-white">
            <HorizontalSlide className="flex items-center justify-center">
                <h2 className="text-6xl">Slide 01</h2>
            </HorizontalSlide>
        </HorizontalScroll>
    )
}

export default ContentSection