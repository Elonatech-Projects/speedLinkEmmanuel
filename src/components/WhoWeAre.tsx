"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMd, setIsMd] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fromLeft: React.CSSProperties = {
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-60px)",
  };

  const fromRight: React.CSSProperties = {
    transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(60px)",
  };

  return (
    <section ref={sectionRef} className="bg-[#e8eaf0] py-20 px-6 overflow-hidden">
      <div
        className="max-w-6xl mx-auto grid gap-12 items-end"
        style={{ gridTemplateColumns: isMd ? "35% 65%" : "1fr" }}
      >

        {/* Left — red box (shown second on mobile via order) */}
        <div style={fromLeft} className="order-2 md:order-1 flex justify-center md:justify-start">
          <div className="text-white rounded-tr-[40px] rounded-bl-[40px] p-8 w-full md:max-w-xs shadow-lg flex flex-col min-h-[160px] md:min-h-0" style={{ background: 'linear-gradient(to bottom, #f04040, #b71c1c)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-80">
              Speedlink Hi-Tech Solutions
            </p>
            <h2 className="text-3xl md:text-2xl font-bold leading-snug mb-6">
              Who We Are &amp; What We Do.
            </h2>
            <div className="mt-auto flex justify-end">
              <Link
                href="/about"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:bg-white hover:text-[#EE3539] transition-colors text-white text-lg font-bold"
              >
                →
              </Link>
            </div>
          </div>
        </div>

        {/* Right — text content (shown first on mobile) */}
        <div style={fromRight} className="order-1 md:order-2">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#404297] leading-tight">
              Robust IT<span className="hidden md:inline"><br /></span>{" "}
              Solutions<span className="hidden md:inline"><br /></span>{" "}
              Provider
            </h2>
            <span className="border border-gray-400 text-gray-500 text-xs px-3 py-1 rounded-full whitespace-nowrap mt-2 ml-4">
              ESTD 2014
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Speedlink Hi-Tech Solutions Limited is a Nigerian leading IT systems provider, known for providing clients with enterprise-class solutions addressing their local business needs. We deliver positive, rapid and the best return on investment (ROI) solutions for our customers.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            As Nigeria&apos;s trusted IT systems provider, we deliver enterprise-grade solutions tailored to your local business realities. From Enterprise Content Management and Document Workflow Automation to Hospital Information Systems, ERP, and high-speed connectivity solutions—we provide the infrastructure that keeps Nigerian businesses competitive and compliant.
          </p>
        </div>

      </div>
    </section>
  );
}
