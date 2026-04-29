"use client";

export default function DevAnimation() {
  return (
    <div className="flex-1 flex items-end justify-center overflow-hidden min-h-[200px]">
      <div className="relative w-[260px] h-[240px] flex items-end justify-center">

        {/* Floating icons */}
        <div className="absolute top-2 right-2 pointer-events-none">
          {["⚡", "💡", "🚀"].map((icon, i) => (
            <span
              key={i}
              className="absolute text-base animate-floatup opacity-0"
              style={{
                top: `${i * 30}px`,
                right: `${i === 1 ? 20 : 5}px`,
                animationDelay: `${i}s`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Desk */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[22px] bg-[#8B4513] rounded-t">
          <div className="absolute bottom-0 left-5 w-3 h-7 bg-[#6B3310] rounded-b" />
          <div className="absolute bottom-0 right-5 w-3 h-7 bg-[#6B3310] rounded-b" />
        </div>

        {/* Monitor */}
        <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 w-[110px]">
          <div className="w-[110px] h-[72px] bg-[#1a1a2e] rounded-t-md border-[3px] border-gray-500 overflow-hidden">
            <div className="p-1.5 flex flex-col gap-1">
              {[
                { w: "60%", color: "#e3001b", delay: "0s" },
                { w: "80%", color: "#4fc3f7", delay: "0.2s" },
                { w: "40%", color: "#a5d6a7", delay: "0.4s" },
                { w: "70%", color: "#fff176", delay: "0.6s" },
                { w: "55%", color: "#4fc3f7", delay: "0.8s" },
                { w: "85%", color: "#e3001b", delay: "1s" },
              ].map((line, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded animate-codepulse"
                  style={{ width: line.w, background: line.color, animationDelay: line.delay }}
                />
              ))}
            </div>
          </div>
          <div className="w-[18px] h-4 bg-gray-500 mx-auto" />
          <div className="w-11 h-1.5 bg-gray-600 rounded mx-auto" />
        </div>

        {/* Keyboard */}
        <div className="absolute bottom-6 left-1/2 translate-x-[10%] w-[70px] h-[18px] bg-[#333] rounded">
          <div className="grid grid-cols-8 gap-0.5 p-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[5px] bg-[#555] rounded-sm animate-keypress"
                style={{ animationDelay: `${i % 3 === 0 ? 0.3 : i % 2 === 0 ? 0.1 : 0}s` }}
              />
            ))}
          </div>
        </div>

        {/* Character */}
        <div className="absolute bottom-[38px] left-1/2 -translate-x-[80%]">
          {/* Head */}
          <div className="relative w-[38px] h-[38px] bg-[#f5c5a3] rounded-full mx-auto mb-0.5 animate-headbob">
            {/* Hair */}
            <div className="absolute -top-1 left-[3px] w-8 h-[14px] bg-[#5c3a1e] rounded-[50%_50%_30%_30%]" />
            {/* Eyes */}
            <div className="absolute top-[14px] left-2 flex gap-2.5">
              <div className="w-1.5 h-1.5 bg-[#333] rounded-full animate-blink" />
              <div className="w-1.5 h-1.5 bg-[#333] rounded-full animate-blink" />
            </div>
            {/* Headset */}
            <div
              className="absolute -top-1.5 -left-1 w-[46px] h-6 border-t-[5px] border-[#3a8c3f] rounded-t-full"
              style={{ borderRadius: "50% 50% 0 0" }}
            >
              <div className="absolute w-2.5 h-3.5 bg-[#2e7d32] rounded top-2 -left-1.5" />
              <div className="absolute w-2.5 h-3.5 bg-[#2e7d32] rounded top-2 -right-1.5" />
            </div>
          </div>

          {/* Body */}
          <div
            className="relative w-10 h-[42px] mx-auto rounded-[8px_8px_4px_4px]"
            style={{ background: "linear-gradient(160deg,#80cbc4,#4db6ac)" }}
          >
            {/* Arms */}
            <div className="absolute top-[5px] w-full">
              <div
                className="absolute w-3.5 h-7 bg-[#80cbc4] rounded-[5px] -left-3 origin-top animate-armleft"
              />
              <div
                className="absolute w-3.5 h-7 bg-[#80cbc4] rounded-[5px] -right-3 origin-top animate-armright"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
