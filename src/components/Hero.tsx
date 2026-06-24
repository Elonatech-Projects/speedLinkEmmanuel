import Link from "next/link";

const floatUp = `
  @keyframes floatUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function fadeStyle(delay: number): React.CSSProperties {
  return {
    animation: `floatUp 0.8s ease-out ${delay}s forwards`,
    opacity: 0,
  };
}

export default function Hero() {
  return (
    <section
      className="relative text-white min-h-[620px] flex items-end pb-16 px-6"
      style={{
        backgroundImage: "url('/Hallo-in-sky-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <style>{floatUp}</style>

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Badge pill */}
        <div
          style={fadeStyle(0.1)}
          className="inline-flex items-center gap-2 border-2 border-white/60 bg-[#707070]/60 text-white text-sm px-4 py-2 rounded-full"
        >
          <span className="text-[#EE3539] font-bold text-base leading-none">→</span>
          <span>100+ advanced tech projects</span>
          <Link
            href="/about"
            className="bg-[#AEB8FE] text-[#7974BB] hover:bg-[#EE3539] hover:text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors whitespace-nowrap"
          >
            Learn More
          </Link>
        </div>

        {/* Headline */}
        <h1
          style={fadeStyle(0.3)}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Let&apos;s give your business the edge it needs!
        </h1>

        {/* Subtext */}
        <p
          style={fadeStyle(0.5)}
          className="text-white/80 text-lg max-w-xl leading-relaxed"
        >
          Through our cutting-edge information technology solutions.
        </p>

        {/* CTA */}
        <Link
          href="/services"
          style={fadeStyle(0.7)}
          className="bg-[#EE3539] hover:bg-[#404297] text-white font-semibold px-10 py-3 rounded-full transition-colors mt-2"
        >
          Our Solutions
        </Link>
      </div>
    </section>
  );
}
