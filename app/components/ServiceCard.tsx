"use client";

interface Props {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export default function ServiceCard({ title, items, icon }: Props) {
  return (
    <div className="bg-[#f0f0f0] rounded-2xl p-7 text-center shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200">
      {/* Icon */}
      <div className="flex items-center justify-center h-[130px] mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-[17px] font-bold text-[#1a1a2e] mb-3">{title}</h3>

      {/* Items */}
      <ul className="list-none mb-5">
        {items.map((item) => (
          <li key={item} className="text-[12px] text-gray-500 py-1 border-b border-dashed border-gray-300 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex gap-2.5 justify-center flex-wrap">
        <button className="flex items-center gap-1 bg-[#1a1a2e] text-white px-4 py-1.5 rounded-full text-[11px] font-semibold hover:bg-[#e3001b] transition-colors cursor-pointer">
          💬 Chat With Us
        </button>
        <button className="flex items-center gap-1 bg-[#1a1a2e] text-white px-4 py-1.5 rounded-full text-[11px] font-semibold hover:bg-[#e3001b] transition-colors cursor-pointer">
          📞 Call Us
        </button>
      </div>
    </div>
  );
}
