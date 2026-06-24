"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const clients = [
  {
    id: 1,
    name: "Laser Engineering",
    image: "/Laser-Engineering.webp",
  },
  {
    id: 2,
    name: "Foundation for Agric",
    image: "/Foundation-for-Agric-and-social-Transformation.webp",
  },
  {
    id: 3,
    name: "CGRP Uniport",
    image: "/CGRP-Uniport.webp",
  },
  {
    id: 4,
    name: "ACE-CEFOR",
    image: "/ACE-uniport.webp",
  },
  {
    id: 5,
    name: "School of Basic",
    image: "/School-of-Basic.webp",
  },
];

export default function Clients() {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Create extended array for seamless loop
  const extendedClients = [...clients, ...clients, ...clients];
  const itemsPerView = isMobile ? 2 : 5;
  const itemWidth = 100 / itemsPerView; // Percentage width per item
  const translateX = -((offset % clients.length) * itemWidth);

  return (
    <section className="bg-[#e8eaf0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#404297] mb-12 border-b border-[#CAD0F7] md:border-lg">Our Clients</h2>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div
            ref={containerRef}
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {extendedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 p-2"
                style={{ width: `${itemWidth}%` }}
              >
                <div className="bg-white rounded-lg shadow-md  flex items-center justify-center h-[100px] md:h-[90px] hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-full transform scale-110">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain"
                       sizes="(max-w-768px) 150px, 200px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
