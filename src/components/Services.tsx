"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const IT_IMAGES = ["/Internet-Services.webp", "/Access-Control-Technology.webp", "/CCTV-Security-Camera-e1762521184809.webp"];

const itServices = [
  { label: "Software Development & Deployment", icon: "🖥️" },
  { label: "Smart Surveillance", icon: "📷" },
  { label: "Cybersecurity", icon: "🔒" },
  { label: "Internet & Networking", icon: "📡" },
];

const trainingServices = [
  { label: "Corporate Training", icon: "🏢" },
  { label: "Tutor-led Training", icon: "🎓" },
  { label: "Self-paced training", icon: "💻" },
  { label: "SIWES Placement", icon: "👷" },
];

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ImageCard({
  title,
  image,
  href,
  delay,
  roundedClass = "rounded-xl",
  className = "h-[280px]", // 👈 1. Added fallback default mobile height here
}: {
  title: string;
  image: string;
  href: string;
  delay: number;
  roundedClass?: string;
  className?: string; // 👈 2. Made className an accepted prop
}) {
  const { ref, visible } = useVisible();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
      // 👈 3. Swapped static h-[280px] out for the incoming dynamic className prop
      className={`relative overflow-hidden w-full ${className} ${roundedClass}`}
    >
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <h3 className="text-white font-bold text-lg leading-tight max-w-[60%]">{title}</h3>
        <Link
          href={href}
          className="self-end w-9 h-9  flex items-center justify-center text-white transition-colors"
        >
          <MoveRight/>
        </Link>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref: titleRef, visible: titleVisible } = useVisible();
  const { ref: itRef, visible: itVisible } = useVisible();
  const { ref: trainRef, visible: trainVisible } = useVisible();
  const [itImgIndex, setItImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItImgIndex((i) => (i + 1) % IT_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl font-bold text-[#404297] mb-8">Our Services</h2>
        </div>

        {/* Main grid — Enforces exact desktop 450px grid container limit (including gap space) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-[217px_217px_auto]">

          {/* IT Services — spans 2 cols × 2 rows */}
          {/* IT Services — spans 2 cols × 2 rows */}
        <div
          ref={itRef}
          style={{
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            opacity: itVisible ? 1 : 0,
            transform: itVisible ? "translateY(0)" : "translateY(40px)",
          }}
          className="relative overflow-hidden md:col-span-2 md:row-span-2 h-[420px] md:h-auto rounded-tl-4xl rounded-tr-none md:rounded-tr-none md:rounded-tl-4xl"
        >
          <Image src={IT_IMAGES[itImgIndex]} alt="IT Services" fill className="object-cover transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-black/50" />
  
            {/* Added "items-start" here to prevent children from stretching to full-width */}
            <div className="absolute inset-0 flex flex-col justify-between items-start p-5 md:pb-25 md:pl-10 md:pt-10">
              <h3 className="text-white font-bold text-xl md:pl-5">IT Services</h3>
    
              {/*  Cleaned up overlay panel to match your new screenshot exactly */}
              <div className="flex flex-col gap-2 bg-white/65 backdrop-blur-md p-4 rounded-2xl max-w-[460px] w-full border border-white/10 ">
                {itServices.map((s) => (
                <Link
                  key={s.label}
                  href={`/services/${s.label.toLowerCase().replace(/\s/g, "-").replace(/&/g, "and")}`}
                  className="bg-white rounded-xl px-2 py-1 md:py-2 flex items-center gap-3 transition-all duration-300 group hover:translate-x-1"
                >
                  <span className="w-8 h-8 rounded-full bg-[#404297] flex items-center justify-center text-white text-sm flex-shrink-0 group-hover:bg-[#EE3539] transition-colors">{s.icon}</span>
                  <span className="text-sm text-[#707070] text-[16px]">{s.label}</span>
                </Link>
                ))}
              </div>
            </div>
        </div>


          {/* Digital Marketing — col 3, row 1 */}
          <ImageCard 
            title="Digital Marketing" 
            image="/Digital-Marketing-Thumbnail-1.webp" 
            href="/services/digital-marketing" 
            delay={0.1} 
            roundedClass="rounded-none md:rounded-tr-4xl" 
            className="h-[280px] md:h-full" 
          />
          
          {/* Space Rental — col 3, row 2 */}
          <ImageCard 
            title="Space Rental" 
            image="/Cowork-Space.webp" 
            href="/services/space-rental" 
            delay={0.2} 
            roundedClass="rounded-none" 
            className="h-[280px] md:h-full"
          />
          
          {/* Test Centre — col 1, row 3 — Keeps natural mobile-only layout default height */}
          <ImageCard title="Test Centre Solutions" image="/Test-Centre.webp" href="/services/test-centre" delay={0.1} roundedClass="rounded-none md:rounded-bl-4xl" />

          {/* Training & Certifications — col 2, row 3 */}
          <div
            ref={trainRef}
            style={{
              transition: "opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s",
              opacity: trainVisible ? 1 : 0,
              transform: trainVisible ? "translateY(0)" : "translateY(40px)",
            }}
            className="bg-[#404297] rounded-none p-6 flex flex-col gap-4 h-[280px]"
          >
            <h3 className="text-white font-bold text-lg leading-tight">Training &amp; Certifications</h3>
            <div className="flex flex-col gap-2 flex-1">
              {trainingServices.map((s) => (
                <Link
                  key={s.label}
                  href={`/services/${s.label.toLowerCase().replace(/\s/g, "-")}`}
                  className="bg-white rounded-lg px-2 py-2 flex items-center gap-3 transition-all duration-300 group"
                >
                  <span className="w-7 h-7 rounded-full bg-[#404297] flex items-center justify-center text-white text-sm flex-shrink-0 group-hover:bg-[#EE3539] transition-colors">{s.icon}</span>
                  <span className="text-sm text-[#707070] font-medium">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Consultancy & Procurement — col 3, row 3 — Keeps natural layout height */}
          <ImageCard title="Consultancy & Procurement" image="/Tech-Consulting.webp" href="/services/consultancy" delay={0.3} roundedClass="rounded-bl-none rounded-br-4xl md:rounded-none md:rounded-br-4xl" />
        </div>
      </div>
    </section>
  );
}
