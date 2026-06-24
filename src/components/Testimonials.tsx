"use client";

import { useState, useEffect } from "react";
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

  // 1. AUTO-PLAY LOOP: Automatically changes slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 4000);

    // Clear interval when user changes slide manually or leaves page to prevent bugs
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="bg-[#404297] py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">
          Testimonials
        </h2>

        {/* Carousel Layout Frame */}
        <div className="flex items-end justify-center gap-4 md:gap-12 max-w-4xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/90 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors mb-6 md:mb-8 z-10"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Masking Container window */}
          <div className="flex-1 overflow-hidden relative">
            
            {/* 2. THE SLIDING TRACK: Uses w-full and tracks by a cleaner standard -100% calculation */}
            <div 
              className="flex transition-transform duration-700 ease-out w-full"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((slide) => (
                <div 
                  key={slide.id} 
                  className="w-full flex-shrink-0 px-2 md:px-4 relative"
                >
                  
                  {/* Testimonial Card Layout Item */}
                  <div className="bg-white rounded-xl p-4 md:p-8 pl-14 md:pl-16 flex gap-0 items-start relative h-[340px] sm:h-[260px] md:h-[240px] w-full shadow-lg">
                    
                    {/* Floating Avatar Positioned Outside Left */}
                    <div className="absolute -left-2 md:-left-4 top-4 md:top-6">
                      <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden bg-gray-300 border-4 border-white shadow-md">
                        <Image
                          src="/Dummy-Profile.webp"
                          alt={slide.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Card Body Text Layout */}
                    <div className="flex-1 flex flex-col h-full min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-[#404297] mb-2">
                        {slide.name}
                      </h3>
                      {/* Internal text scroll track */}
                      <div className="overflow-y-auto pr-1 flex-1 scrollbar-none">
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                          {slide.text}
                        </p>
                      </div>
                    </div>

                  </div>
                  
                </div>
              ))}
            </div>

          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="flex-shrink-0 w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/90 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors mb-6 md:mb-8 z-10"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
