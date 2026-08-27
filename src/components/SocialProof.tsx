import React from 'react';

const LOGOS = [
  { name: "Tidio", src: "/logos/tidio.svg" },
  { name: "HubSpot", src: "/logos/hubSpot.svg" },
  { name: "Freshworks", src: "/logos/freshworks.svg" },
  { name: "Gorgias", src: "/logos/gorgias.svg" },
  { name: "Zendesk", src: "/logos/zendesk.svg" },
  { name: "Drift", src: "/logos/drift.svg" },
];

export default function SocialProof() {
  const marqueeLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="w-full py-8 my-12 overflow-hidden">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-smooth {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-smooth gap-12 md:gap-20 items-center pr-12 md:pr-20">
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center p-2 cursor-pointer shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 md:h-8 w-auto max-w-30 object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />

              <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-medium bg-zinc-900 text-white px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}