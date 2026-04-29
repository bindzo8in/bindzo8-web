"use client"
import Image from "next/image";
import Background from "./background";
import { useEffect, useState } from "react";

export default function ServiceSection() {

    const [current, setCurrent] = useState<number>(0);

    const services: { title: string; media: string; }[] = [
        { title: "Digital Marketing", media: "/home/services/digital_marketing.png" },
        { title: "Cyber Security", media: "/home/services/cyber_security.png" },
        { title: "Branding", media: "/home/services/branding.png" },
        { title: "Web & CMS", media: "/home/services/web_&_cms.png" },
        { title: "Cloud Services", media: "/home/services/cloud_services.png" },
        { title: "Software Development", media: "/home/services/software_development.png" },
        { title: "Mobile App", media: "/home/services/mobile_app.png" },
    ];

    const INTERVAL = 3000;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % services.length);
        }, INTERVAL);
        return () => clearInterval(timer);
    }, [current, services.length]);

    return (
        <section className="relative w-full min-h-screen bg-black flex justify-center items-center overflow-hidden p-4 sm:p-8">

            <Background />

            <div className="relative w-full h-full flex flex-col">

                {/* heading */}
                <h4 className="text-4xl sm:text-5xl lg:text-6xl text-center font-kumbh text-[#EF8030]">
                    Services
                </h4>

                {/* content */}
                <div className="flex flex-col md:flex-row flex-1 justify-center items-center mt-6 sm:mt-10 gap-6 md:gap-0">

                    {/* left side — hide on small screens */}
                    <div className="hidden md:flex flex-1 justify-center items-center p-4">
                        <Image
                            src="/home/services/logo_rotate_white.png"
                            alt="Service Logo"
                            width={406}
                            height={462}
                            className="w-[200px] h-[228px] lg:w-[406px] lg:h-[462px] animate-spin-slow"
                        />
                    </div>

                    {/* right side */}
                    <div className="flex-1 relative h-[320px] sm:h-[380px] md:h-[460px] w-full">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                style={{
                                    opacity: index === current ? 1 : 0,
                                    transition: "opacity 1000ms ease-out",
                                    position: "absolute",
                                    width: "100%",
                                    pointerEvents: index === current ? "auto" : "none",
                                }}
                            >
                                <h3 className="text-center font-kumbh text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E7325C] mb-4">
                                    {service.title}
                                </h3>
                                <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px]">
                                    <Image
                                        src={service.media}
                                        alt={service.title}
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}
// "use client"
// import Image from "next/image";
// import Background from "./background";
// import { useEffect, useState } from "react";


// export default function ServiceSection() {

//     const [current, setCurrent] = useState<number>(0);
//     const [visible, setVisible] = useState<boolean>(true);

//     const services: {
//         title: string;
//         media: string;
//     }[] =
//         [
//             {
//                 title: "Digital Marketing",
//                 media: "/home/services/digital_marketing.png"
//             },
//             {
//                 title: "Cyber Security",
//                 media: "/home/services/cyber_security.png"
//             },
//             {
//                 title: "Branding",
//                 media: "/home/services/branding.png"
//             },
//             {
//                 title: "Web & CMS",
//                 media: "/home/services/web_&_cms.png"
//             },
//             {
//                 title: "Cloud Services",
//                 media: "/home/services/cloud_services.png"
//             },
//             {
//                 title: "Software Development",
//                 media: "/home/services/software_development.png"
//             },
//             {
//                 title: "Mobile App",
//                 media: "/home/services/mobile_app.png"
//             }
//         ];
//     const INTERVAL = 3000;

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % services.length);
//             setVisible(true)
//         }, INTERVAL);

//         return () => clearInterval(timer);
//     }, [current, services.length]);


//     return (
//         <>
//             {/* hero section */}
//             <section className="relative inset-0 w-full h-screen bg-black flex justify-center items-center gap-4 overflow-hidden p-8">

//                 <Background />
//                 <div className="relative w-full h-full">
//                     {/* heading */}
//                     <h4 className="text-6xl z-50 text-center text-nowrap font-kumbh text-[#EF8030]">Services</h4>
//                     <div className="flex flex-1 justify-center items-center mt-10 h-full">
//                         {/* left side */}
//                         <div className="flex-1 flex justify-center items-center p-4">
//                             <Image
//                                 src={"/home/services/logo_rotate_white.png"}
//                                 alt="Service Logo"
//                                 width={406}
//                                 height={462}
//                                 className="w-[406px] h-[462px] animate-spin-slow"

//                             />
//                         </div>
//                         {/* right side */}
//    {/* right side */}
// <div className="flex-1 relative h-[460px]">
//     {services.map((service, index) => (
//         <div
//             key={index}
//             style={{
//                 opacity: index === current ? 1 : 0,
//                 // transform: index === current ? "translateY(0px)" : "translateY(20px)",
//                 transition: "opacity 1000ms ease-out, transform 500ms ease-out",
//                 position: "absolute",
//                 width: "100%",
//                 pointerEvents: index === current ? "auto" : "none",
//             }}
//         >
//             <h3 className="text-center font-kumbh text-4xl font-bold text-[#E7325C] mb-4">{service.title}</h3>
//             <div className="relative w-full h-[400px]">
//                 <Image
//                     src={service.media}
//                     alt={service.title}
//                     fill
//                     className="object-contain rounded-lg "
//                 />
//             </div>
//         </div>
//     ))}
// </div>
//                     </div>
//                 </div>

//             </section>
//         </>
//     );
// }