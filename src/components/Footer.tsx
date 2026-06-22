"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#404297] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-12">
          {/* Left: Brand & Description */}
          <div className="col-span-2 md:col-span-3 pb-8 md:pb-0 border-b md:border-b-0 border-gray-400">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/Speedlink-Logo-Secondary.webp"
                alt="Speedlink"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              A team of IT experts, providing comprehensive information technology solutions that make businesses stand out.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/80 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/80 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.405c0 .795-.645 1.44-1.44 1.44s-1.44-.645-1.44-1.44.645-1.44 1.44-1.44 1.44.645 1.44 1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/80  flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.807 0-9.726h3.554v1.375c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.735 1.39 3.735 4.38v5.581zM5.337 9.021c-1.144 0-1.884-.759-1.884-1.71 0-.956.74-1.71 1.925-1.71 1.183 0 1.883.754 1.909 1.71 0 .951-.726 1.71-1.95 1.71zm1.581 11.431H3.819V9.727h3.099v10.725zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#EE3539] hover:bg-[#EE3539]/80  flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-2 md:col-span-1 pb-8 md:pb-0 border-b md:border-b-0 border-gray-400">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/it-services" className="text-gray-300 hover:text-white transition-colors">
                  IT Services
                </Link>
              </li>
              <li>
                <Link href="/services/training" className="text-gray-300 hover:text-white transition-colors">
                  Training & Certification
                </Link>
              </li>
              <li>
                <Link href="/services/space-rental" className="text-gray-300 hover:text-white transition-colors">
                  Space Rental
                </Link>
              </li>
              <li>
                <Link href="/services/test-centre" className="text-gray-300 hover:text-white transition-colors">
                  Test Centre Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="text-gray-300 hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/consultancy" className="text-gray-300 hover:text-white transition-colors">
                  Consultancy & Procurement
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="col-span-1 md:col-span-1 pb-8 md:pb-0">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products/e-learning" className="text-gray-300 hover:text-white transition-colors">
                  E-Learning
                </Link>
              </li>
              <li>
                <Link href="/products/digischool" className="text-gray-300 hover:text-white transition-colors">
                  DigiSchool
                </Link>
              </li>
              <li>
                <Link href="/products/speedkonnect" className="text-gray-300 hover:text-white transition-colors">
                  SpeedKonnect
                </Link>
              </li>
              <li>
                <Link href="/products/blazzing-share" className="text-gray-300 hover:text-white transition-colors">
                  BlazzingShare
                </Link>
              </li>
              <li>
                <Link href="/products/speedtalenthq" className="text-gray-300 hover:text-white transition-colors">
                  SpeedTalentHQ
                </Link>
              </li>
              <li>
                <Link href="/products/erp-software" className="text-gray-300 hover:text-white transition-colors">
                  ERP Softwares
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-1 pb-8 md:pb-0">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 pt-8">
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2026 Speedlink Hi-Tech Solutions
            </p>
            <Link href="/developers" className="text-sm text-gray-400 hover:text-white transition-colors">
              Developers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
