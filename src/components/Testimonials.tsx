"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ekomobong Cletus",
    text: "Speedlink Hi-Tech Solutions is a leading provider of networking, cybersecurity, and IT solutions. Their expertise in fiber optics, cloud networking, and advanced IT infrastructure is top-notch. The team is professional, knowledgeable, and committed to delivering high-quality services. In addition to their excellent IT services, they offer well-equipped co-working spaces with a productive and collaborative environment—perfect for freelancers, startups, and tech professionals. Their training programs are also hands-on and industry-relevant, making them a great choice for anyone looking to gain practical IT and networking skills. Highly recommended for businesses, individuals, and tech enthusiasts!",
  },
  {
    id: 2,
    name: "Juniper Dakoru C.",
    text: "This is hands down one of the best ICT hubs in Port Harcourt! The space is well-designed, super functional, and perfect for getting work done. Whether you're a techie, entrepreneur, or just need a solid workspace, this place has everything—great facilities, a cool vibe, and an environment that keeps you productive. Highly recommend it to anyone looking for an innovation hub that actually delivers here in the city of Port Harcourt. Definitely a game-changer for the tech scene in Port Harcourt and Rivers State entirely!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-[#404297] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">
          Testimonials
        </h2>

        {/* Carousel */}
        <div className="flex items-stretch justify-center gap-3 md:gap-12">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/90 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors self-end mb-8 md:mb-12"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Testimonial Card */}
          <div className="flex-1 max-w-3xl bg-white rounded-xl p-4 md:p-8 flex gap-0 items-start relative">
            {/* Avatar — positioned outside left */}
            <div className="absolute -left-6 md:-left-8 top-4 md:top-8">
              <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden bg-gray-300 border-4 border-white shadow-lg">
                <Image
                  src="/Dummy-Profile.webp"
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content — offset right for avatar space */}
            <div className="flex-1 flex flex-col ml-6 md:ml-8">
              <h3 className="text-lg md:text-xl font-bold text-[#404297] mb-2 md:mb-3">
                {current.name}
              </h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                {current.text}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="flex-shrink-0 w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/90 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors self-end mb-8 md:mb-12"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
