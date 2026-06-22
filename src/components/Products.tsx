"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "SpeedTalentHQ",
    description: "Online Recruitment Platform",
    image: "/Sales-Review-Meeting.webp",
    href: "/products/speedtalenthq",
  },
  {
    id: 2,
    title: "Blazzing Share",
    description: "Large File Transfer & Online Survey Solution",
    image: "/BlazzingShare.webp",
    href: "/products/blazzing-share", 
  },
  {
    id: 3,
    title: "ERP Software",
    description: "Enterprise Resource Planning (ERP) Software",
    image: "/ERP-Software-Presentation.webp",
    href: "/products/erp-software",
  },
  {
    id: 4,
    title: "SpeedKonnect",
    description: "Network and Internet Management Software",
    image: "/Internet-Services.webp",
    href: "/products/speedkonnect",
  },
  {
    id: 5,
    title: "Digischool",
    description: "All-in-One School Management Platform",
    image: "/Teacher-In-Classroom.webp",
    href: "/products/digischool",
  },
  {
    id: 6,
    title: "Speedlearn",
    description: "E-learning Platform & Digital Learning Solutions",
    image: "/SpeedLearn.webp",
    href: "/products/speedlearn",
  },
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

function ProductCard({
  title,
  description,
  image,
  href,
  delay,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  delay: number;
}) {
  const { ref, visible } = useVisible();
  return (
    <Link href={href}>
      <div
        ref={ref}
        style={{
          transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow cursor-pointer"
      >
        {/* Image container */}
        <div className="relative h-[240px] w-full overflow-hidden bg-gray-200">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content container */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[#404297] mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-6 flex-1">{description}</p>
          <div
            className="w-full bg-[#404297] text-white font-semibold py-3 rounded-lg text-center hover:bg-[#EE3539] transition-colors"
          >
            Learn More
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const { ref: titleRef, visible: titleVisible } = useVisible();

  return (
    <section className="bg-[#e8eaf0] py-16 px-6">
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
          <h2 className="text-3xl font-bold text-[#404297] mb-12">Our Products</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              href={product.href}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
