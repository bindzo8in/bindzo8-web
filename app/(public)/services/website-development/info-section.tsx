const InfoSection = ({ content }: { content: string }) => {
    return (
        <section className="relative z-10 min-h-[300px] flex items-center justify-center px-6 text-center bg-black! font-kumbh text-white">
            <p className="max-w-4xl text-[clamp(1.2rem,2vw,2rem)]">
                {content}
            </p>
        </section>
    )
}

export default InfoSection