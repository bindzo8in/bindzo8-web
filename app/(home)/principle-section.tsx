"use client";

import { useState } from "react";

export default function PrinciplesSection() {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const pathData = `M 243.19999,932.17533 V 696.21356 l 132.71999,0.21316 c 72.996,0.11724 178.224,0.21895 233.83999,0.22602 91.83325,0.0117 101.03183,0.0587 100.16,0.51227 -39.37651,20.48455 -74.69291,52.0378 -99.34018,88.75496 -30.00949,44.70528 -45.48358,93.18028 -45.45486,142.39453 0.009,15.36719 1.24523,27.3332 4.51334,43.68546 4.71886,23.61111 12.41879,46.10604 23.05711,67.36004 12.06268,24.0996 25.5267,42.9132 43.75901,61.1455 9.47359,9.4736 18.06415,16.7866 28.31002,24.0997 34.04878,24.3029 74.50617,38.994 118.11556,42.8909 4.07842,0.3645 -21.06189,0.4346 -167.23631,0.4664 l -172.03631,0.037 0.26933,-1.52 c 1.32787,-7.4941 49.2363,-303.55361 49.13716,-303.65274 -0.0721,-0.0721 -56.11516,68.38232 -124.5402,152.12084 -68.42504,83.7386 -124.60367,152.4628 -124.84141,152.7205 -0.36302,0.3936 -0.43224,-37.3178 -0.43224,-235.49317 z m 582.23997,235.61457 c -0.704,-0.056 -3.368,-0.2561 -5.92,-0.4437 -52.52353,-3.8619 -105.0626,-26.8315 -145.86417,-63.7707 -5.17597,-4.686 -15.58202,-15.2485 -19.91603,-20.2155 -44.27972,-50.7472 -65.11276,-114.59655 -58.52231,-179.36004 7.03626,-69.14448 44.96917,-133.31291 103.43161,-174.96798 17.77821,-12.66715 37.82485,-23.4085 58.3101,-31.24361 l 3.83919,-1.4684 22.08081,0.0229 22.0808,0.0229 -6.5805,1.71848 c -17.01537,4.4435 -30.25195,9.40689 -45.73949,17.15116 -29.04347,14.52268 -54.48719,35.10927 -74.90342,60.60461 -23.72857,29.63171 -39.46112,65.46377 -44.74934,101.91999 -1.57548,10.8611 -1.78763,14.25799 -1.77868,28.48 0.009,14.2229 0.18977,17.06038 1.78433,28 6.14868,42.18359 27.05992,82.52329 58.89163,113.60759 31.93241,31.1826 71.9289,51.4781 115.63547,58.6774 12.01591,1.9793 17.81845,2.4097 32.64,2.4215 14.05577,0.011 18.47085,-0.2565 29.12,-1.7654 56.88172,-8.0601 108.79001,-38.9279 143.10844,-85.1011 14.1396,-19.0238 25.375,-42.08344 31.5728,-64.79999 9.5982,-35.18031 8.5851,-73.8236 -2.8649,-109.28 -15.3336,-47.48206 -46.39261,-88.14875 -88.61634,-116.02862 -27.26367,-18.0019 -56.77233,-29.3337 -90.24,-34.65361 l -3.84,-0.6104 23.63075,-0.0337 c 26.78628,-0.0382 23.46556,-0.3429 32.84925,3.0144 47.98098,17.16669 89.06164,46.80864 119.06754,85.91373 39.5483,51.54127 56.6824,114.25061 47.9567,175.51818 -10.8656,76.29311 -61.4542,144.69351 -133.74424,180.83461 -30.07488,15.0358 -60.73426,23.3885 -94.4,25.718 -4.15993,0.2878 -25.10697,0.3746 -28.32,0.1173 z M 443.22368,634.79997 c -0.15426,-0.396 -9.95648,-23.4 -21.78272,-51.12 C 311.44608,325.85861 243.19999,165.72385 243.19999,165.44977 c 0,-0.22616 85.84303,-0.31287 273.19999,-0.27598 150.25999,0.0296 272.62399,0.10536 271.91999,0.1684 -14.85758,1.33038 -26.87284,3.28383 -40.05906,6.51282 -34.6101,8.4752 -66.39559,23.97174 -93.23369,45.45472 -12.36164,9.89506 -21.52937,19.19279 -32.7854,33.25026 -29.66848,37.0525 -48.80458,80.52405 -54.70872,124.28199 -1.65553,12.26982 -1.90923,16.41364 -1.91251,31.238 -0.003,14.11288 0.26265,19.01387 1.59647,29.44 5.46925,42.75177 22.53524,84.3244 49.32689,120.16 22.51638,30.11713 51.70307,56.22345 84.25602,75.36362 3.08,1.81094 6.032,3.55655 6.56,3.87911 0.93179,0.56925 -2.93057,0.58664 -131.44792,0.59187 l -132.40791,0.005 z m 310.69629,-1.81252 c -41.61542,-17.51364 -75.9169,-42.48533 -103.33357,-75.22747 -43.18077,-51.56829 -62.7164,-115.4927 -54.71556,-179.04 3.15331,-25.04539 10.69493,-50.04237 22.15693,-73.43999 15.577,-31.79766 37.79129,-59.93125 65.8122,-83.34877 15.3917,-12.86309 35.12571,-25.39873 53.42847,-33.93938 27.18762,-12.6866 53.85868,-19.70972 84.65152,-22.29073 6.29861,-0.52794 27.95511,-0.52717 34.24,0.001 26.03883,2.18916 48.70673,7.46137 71.90744,16.72459 39.38882,15.72655 74.9978,41.91303 102.5545,75.41742 27.802,33.80284 46.3327,75.20291 52.242,116.71564 4.2748,30.03121 2.1295,61.1752 -6.2274,90.40462 -13.1159,45.87425 -40.2663,87.2792 -78.41153,119.57942 -25.42124,21.52591 -55.28419,38.38264 -87.26878,49.26057 l -5.04377,1.71538 -23.91623,-0.0305 -23.91623,-0.0305 5.16683,-0.91556 c 45.72038,-8.10168 87.07962,-29.99115 119.47619,-63.23305 46.15522,-47.35954 67.70122,-111.66637 58.52352,-174.67042 -8.3857,-57.56621 -42.3338,-110.85275 -91.64654,-143.85268 -10.90464,-7.29735 -25.73033,-15.15649 -37.38248,-19.81655 -42.87113,-17.14553 -89.14725,-18.98504 -133.1615,-5.29327 -16.4699,5.12338 -33.93101,13.30593 -48.97601,22.95091 -18.50573,11.86357 -35.8857,27.37833 -50.10928,44.7316 -25.41627,31.00873 -41.62868,68.83807 -46.3538,108.15999 -1.09291,9.09503 -1.38691,14.2504 -1.38691,24.32 0,10.07331 0.29442,15.23317 1.38769,24.32 4.39371,36.51891 18.63651,71.72689 41.10058,101.6 23.91753,31.80594 55.77815,56.19578 92.47429,70.79064 10.09871,4.01648 19.98111,7.0978 31.52742,9.8302 l 4.64,1.09805 -21.75999,-10e-6 -21.76,-10e-6 z`;
  
  // The transformation directly from the new SVG's <g> tag to ensure accurate path placement.
  const svgTransform = "translate(-243.19999,-165.16558)";

  const principles = [
    {
      title: "Unique Design & Branding Excellence",
      description: "Crafted to stand out and speak your brand.",
    },
    {
      title: "Engaging UX Design",
      description: "Built to retain visitors and achieve your business goals.",
    },
    {
      title: "Lightning-Fast Performance",
      description: "Optimized visuals and interactions for a smooth experience.",
    },
  ];

  return (
    <section className="relative min-h-fit lg:min-h-screen overflow-hidden bg-[#232323] text-white font-kumbh">
      <div className="mx-auto grid min-h-fit lg:min-h-screen w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex items-center justify-center px-6 pt-12 pb-6 sm:px-8 sm:pt-16 lg:p-8">
          <div
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-full max-w-[190px] xs:max-w-[220px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[520px]"
            style={{ aspectRatio: "841.80643 / 1002.8339" }}
          >
            <svg
              viewBox="0 0 841.80643 1002.8339"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="logoMask">
                  <rect width="100%" height="100%" fill="black" />
                  <g transform={svgTransform}>
                    <path d={pathData} fill="white" />
                  </g>
                </mask>

                <linearGradient
                  id="baseGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#181818" />
                  <stop offset="50%" stopColor="#080808" />
                  <stop offset="100%" stopColor="#121212" />
                </linearGradient>

                <radialGradient id="shine" cx="20%" cy="8%">
                  <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
                  <stop offset="35%" stopColor="rgba(255,255,255,.05)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/* Base */}
              <g transform={svgTransform}>
                <path d={pathData} fill="url(#baseGrad)" />
              </g>

              {/* Glow */}
              <foreignObject width="100%" height="100%" mask="url(#logoMask)">
                <div
                  className="h-full w-full transition-opacity duration-300"
                  style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(circle 250px at ${mouse.x}% ${mouse.y}%, rgba(255,140,80,1), rgba(255,0,100,.65), transparent 72%)`,
                    filter: "blur(18px)",
                  }}
                />
              </foreignObject>

              {/* Shine */}
              <g transform={svgTransform}>
                <path d={pathData} fill="url(#shine)" opacity=".6" />
              </g>

              {/* Border */}
              <g transform={svgTransform}>
                <path
                  d={pathData}
                  fill="none"
                  stroke="rgba(255,255,255,.05)"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center px-6 pb-14 pt-4 text-center sm:px-8 md:px-12 lg:px-16 lg:py-20 lg:text-left xl:px-20">
          <h2 className="mb-10 text-center text-[34px] font-bold leading-[1.05] text-[#d3325c] sm:text-5xl md:text-[58px] lg:mb-16 lg:text-left">
            Our Principles
          </h2>

          <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 sm:gap-10 lg:mx-0 lg:gap-12">
            {principles.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-8 transition-colors hover:bg-white/[0.04] lg:border-0 lg:bg-transparent lg:p-0 lg:hover:bg-transparent"
              >
                <h3 className="text-[22px] font-semibold tracking-wide text-white sm:text-2xl md:text-[32px]">
                  {item.title}
                </h3>

                <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-gray-400 sm:text-base lg:mx-0">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import { useState } from "react";

// export default function PrinciplesSection() {
//   const [hovered, setHovered] = useState(false);
//   const [mouse, setMouse] = useState({ x: 50, y: 50 });

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     setMouse({
//       x: ((e.clientX - rect.left) / rect.width) * 100,
//       y: ((e.clientY - rect.top) / rect.height) * 100,
//     });
//   };

//   const pathData = `m 78.917217,396.15785 c 0.818593,-2.7216 13.543327,-81.04153 16.842847,-103.66666 0.74862,-5.13334 1.71215,-10.53334 2.14118,-12 0.69467,-2.37478 0.5588,-2.44775 -1.24129,-0.66667 -1.11174,1.1 -11.826127,14.01814 -23.809759,28.70697 -11.983632,14.68883 -33.188421,40.6555 -47.121755,57.7037 l -25.33333294,30.99674 -0.342538,-92.2945 c -0.188395,-50.76198 0.145834,-92.78287 0.742733,-93.37977 0.59689804,-0.5969 41.76571094,-0.93104 91.48625194,-0.74254 l 90.400976,0.34273 -9.3991,6.42191 c -28.41341,19.41338 -44.10497,50.03464 -43.51204,84.91143 0.25403,14.94174 2.34549,23.48678 9.31521,38.05897 6.62064,13.84231 18.63044,27.8544 31.82594,37.132 9.33655,6.56442 11.48256,7.87766 11.48256,7.02671 0,-0.3335 -3.00426,-2.53419 -6.67613,-4.89042 -8.24902,-5.29338 -21.82556,-19.85202 -27.81089,-29.82267 -2.46786,-4.11108 -6.31621,-12.73142 -8.55189,-19.15631 -3.69702,-10.62447 -4.06336,-13.18989 -4.04807,-28.34828 0.0147,-14.57464 0.46984,-18.00557 3.626,-27.33334 1.98506,-5.86666 6.12585,-15.09263 9.20176,-20.50214 13.00865,-22.87796 43.09981,-44.60848 60.89888,-43.9785 3.68152,0.1303 6.69367,0.35821 6.69367,0.50645 0,0.14825 -3.87349,2.77458 -8.60776,5.8363 -37.87512,24.49435 -53.12962,68.36614 -36.31459,104.44038 15.80438,33.90604 46.04337,50.26553 75.87808,41.05052 33.16502,-10.24363 56.21764,-48.06273 50.38277,-82.65575 -3.0839,-18.28344 -11.45752,-34.18653 -25.03783,-47.55158 -7.56337,-7.4435 -18.49435,-15.19385 -26.62084,-18.87488 l -5.01316,-2.2708 8,-0.41139 c 15.09782,-0.77638 37.8814,11.29832 54,28.61858 26.29765,28.25818 33.36791,64.54855 19.34593,99.29916 -8.78412,21.76968 -29.72774,42.36412 -53.04564,52.16126 -17.53745,7.36846 -21.797,7.66573 -109.84076,7.66573 -76.177728,0 -80.600395,-0.1291 -79.937413,-2.33334 z m 82.144553,-19.34658 c 0,-0.92396 -5.08898,-7.84983 -11.30885,-15.39084 -6.21986,-7.54101 -13.14869,-16.38505 -15.39739,-19.65342 -2.24869,-3.26837 -4.65971,-5.94249 -5.35782,-5.94249 -4.23446,0 1.44091,14.78769 10.38472,27.05832 7.74264,10.62267 21.67934,19.57664 21.67934,13.92843 z M 76.079285,180.15785 C 74.610039,176.67452 64.567417,153.12452 53.762347,127.82452 14.924447,36.885832 1.0617741,3.7206113 1.0617741,1.7430563 c 0,-1.78070174 14.0709679,-1.96078174 122.9999959,-1.57415164 135.69782,0.4816427 127.32417,-0.029393 147.20185,8.98357664 45.06584,20.4338297 68.12923,70.1782417 53.1052,114.5403087 -11.13091,32.8667 -46.20592,62.7984 -73.58936,62.7984 h -9.00196 l 9.74205,-5 C 300.50577,156.34953 312.11762,99.026126 275.65022,62.366999 260.3924,47.028954 241.64398,40.531341 221.63387,43.646627 c -33.31088,5.186024 -59.14053,40.241286 -56.08412,76.115763 2.01507,23.65179 17.98266,47.72605 40.27925,60.7288 l 9.14539,5.33333 -7.62472,0.39992 c -6.7337,0.35319 -8.84594,-0.23542 -18.0749,-5.03685 -25.14374,-13.08121 -43.7925,-35.49839 -51.66852,-62.10937 -3.23038,-10.91458 -3.1831,-35.580151 0.0893,-46.587034 4.95743,-16.674621 18.06422,-37.710017 29.13338,-46.756853 2.32806,-1.902732 3.02829,-2.867558 1.55605,-2.144058 -3.67466,1.805833 -16.51554,15.512932 -21.86007,23.334706 -5.68901,8.325914 -12.9456,24.077674 -14.91363,32.37277 -2.31784,9.769504 -2.52114,28.442019 -0.41886,38.471109 5.02893,23.99099 24.97503,52.27196 45.24436,64.15057 3.27708,1.9205 5.95833,3.7348 5.95833,4.03179 0,0.29698 -23.32,0.53997 -51.82223,0.53997 H 78.750641 Z M 144.42165,163.3855 c -2.73749,-4.17794 -6.79231,-6.14984 -4.7328,-2.30161 1.77367,3.31413 5.52415,7.03385 6.30485,6.25314 0.33796,-0.33796 -0.36946,-2.11615 -1.57205,-3.95153 z`;

//   const principles = [
//     {
//       title: "Unique Design & Branding Excellence",
//       description: "Crafted to stand out and speak your brand.",
//     },
//     {
//       title: "Engaging UX Design",
//       description: "Built to retain visitors and achieve your business goals.",
//     },
//     {
//       title: "Lightning-Fast Performance",
//       description: "Optimized visuals and interactions for a smooth experience.",
//     },
//   ];

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#232323] text-white font-kumbh">
//       <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
//         {/* LEFT SIDE */}
//         <div className="flex items-center justify-center px-6 pt-12 pb-6 sm:px-8 sm:pt-16 lg:p-8">
//           <div
//             onMouseMove={handleMove}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//             className="relative w-full max-w-[190px] xs:max-w-[220px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[520px]"
//             style={{ aspectRatio: "328.94547 / 398.49118" }}
//           >
//             <svg
//               viewBox="0 0 328.94547 398.49118"
//               className="h-full w-full"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <defs>
//                 <mask id="logoMask">
//                   <rect width="100%" height="100%" fill="black" />
//                   <path d={pathData} fill="white" />
//                 </mask>

//                 <linearGradient
//                   id="baseGrad"
//                   x1="0%"
//                   y1="0%"
//                   x2="100%"
//                   y2="100%"
//                 >
//                   <stop offset="0%" stopColor="#181818" />
//                   <stop offset="50%" stopColor="#080808" />
//                   <stop offset="100%" stopColor="#121212" />
//                 </linearGradient>

//                 <radialGradient id="shine" cx="20%" cy="8%">
//                   <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
//                   <stop offset="35%" stopColor="rgba(255,255,255,.05)" />
//                   <stop offset="100%" stopColor="rgba(255,255,255,0)" />
//                 </radialGradient>
//               </defs>

//               {/* Base */}
//               <path d={pathData} fill="url(#baseGrad)" />

//               {/* Glow */}
//               <foreignObject width="100%" height="100%" mask="url(#logoMask)">
//                 <div
//                   className="h-full w-full transition-opacity duration-300"
//                   style={{
//                     opacity: hovered ? 1 : 0,
//                     background: `radial-gradient(circle 120px at ${mouse.x}% ${mouse.y}%,
//                       rgba(255,140,80,1),
//                       rgba(255,0,100,.65),
//                       transparent 72%)`,
//                     filter: "blur(18px)",
//                   }}
//                 />
//               </foreignObject>

//               {/* Shine */}
//               <path d={pathData} fill="url(#shine)" opacity=".6" />

//               {/* Border */}
//               <path
//                 d={pathData}
//                 fill="none"
//                 stroke="rgba(255,255,255,.05)"
//                 strokeWidth="1"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col justify-center px-6 pb-14 pt-4 text-center sm:px-8 md:px-12 lg:px-16 lg:py-20 lg:text-left xl:px-20">
//           <h2 className="mb-10 text-center text-[34px] font-bold leading-[1.05] text-[#c42b47] sm:text-5xl md:text-[58px] lg:mb-16 lg:text-left">
//             Our Principles
//           </h2>

//           <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 sm:gap-10 lg:mx-0 lg:gap-12">
//             {principles.map((item, index) => (
//               <div
//                 key={index}
//                 className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-5 sm:px-6 sm:py-6 lg:border-0 lg:bg-transparent lg:p-0"
//               >
//                 <h3 className="text-[22px] font-normal leading-tight text-[#d3325c] sm:text-2xl md:text-[32px]">
//                   {item.title}
//                 </h3>

//                 <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-relaxed text-[#d3325c]/90 sm:text-base lg:mx-0">
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
