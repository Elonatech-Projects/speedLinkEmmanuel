"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type DropdownKey = "services" | "products" | null;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navLinkClass = (href: string) =>
    `text-sm transition-colors ${
      isActive(href)
        ? "font-bold text-[#404297]"
        : "font-medium text-[#707070] hover:text-[#EE3539]"
    }`;

  const mobileLinkClass = (href: string) =>
    `text-sm px-4 py-3 rounded transition-colors ${
      isActive(href)
        ? "bg-[#404297] text-white font-bold"
        : "bg-gray-100 text-gray-600 hover:bg-[#404297] hover:text-white"
    }`;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">

      {/* ── DESKTOP HEADER ── */}
      <div className="max-w-7xl mx-auto px-6 py-4 hidden md:flex items-center justify-between">
        <Link href="/">
          <Image src="/1-1536x638.webp" alt="Speedlink" width={160} height={45} priority className="object-contain" />
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/about" className={navLinkClass("/about")}>About</Link>

          {/* Products Mega Menu */}
          <div className="relative" onMouseEnter={() => setActiveDropdown("products")} onMouseLeave={() => setActiveDropdown(null)}>
            <button className="flex items-center gap-1 text-sm font-medium text-[#707070] hover:text-[#EE3539] cursor-pointer">
              Products
              <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-full h-2" />
            {activeDropdown === "products" && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-6">
                <p className="text-xs font-bold text-[#404297] tracking-widest uppercase mb-4">Our Products</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "E-Learning", sub: "Online Learning & Digital Solutions", icon: "🖥️" },
                    { label: "DigiSchool", sub: "School Management Solutions", icon: "🏫" },
                    { label: "SpeedKonnect", sub: "Internet Services & Management", icon: "📡" },
                    { label: "BlazzingShare", sub: "File Transfer / Survey Solutions", icon: "📁" },
                    { label: "SpeedTalentHQ", sub: "Recruitment Platform", icon: "👤" },
                    { label: "ERP Software", sub: "Enterprise Resource Planning", icon: "⊞" },
                  ].map((item) => (
                    <Link key={item.label} href={`/products/${item.label.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => setActiveDropdown(null)}
                      className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#404297]/30 hover:bg-[#404297]/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#eeeef8] flex items-center justify-center text-[#404297] text-lg flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-[#404297] uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Mega Menu */}
          <div className="relative" onMouseEnter={() => setActiveDropdown("services")} onMouseLeave={() => setActiveDropdown(null)}>
            <button className="flex items-center gap-1 text-sm font-medium text-[#707070] hover:text-[#EE3539] cursor-pointer">
              Services
              <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-full h-2" />
            {activeDropdown === "services" && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-6">
                <p className="text-xs font-bold text-[#404297] tracking-widest uppercase mb-4 pb-3 border-b border-gray-200">Our Services</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xs font-bold text-[#404297] uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">IT Services</p>
                    <ul className="space-y-2">
                      {[{ label: "Software Development & Deployment", active: true }, { label: "Networking/Internet Services" }, { label: "Smart Surveillance" }, { label: "Cybersecurity" }].map((item) => (
                        <li key={item.label}>
                          <Link href="/services/it-services" onClick={() => setActiveDropdown(null)}
                            className={`text-sm transition-colors ${item.active ? "text-gray-500 font-medium" : "text-gray-600 hover:text-[#EE3539]"}`}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xs font-bold text-[#404297] uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">Training & Certification</p>
                    <ul className="space-y-2">
                      {["Corporate Training", "Tutor-led Training", "Self-paced Training", "SIWES Placement"].map((label) => (
                        <li key={label}>
                          <Link href="/services/training" onClick={() => setActiveDropdown(null)}
                            className="text-sm text-[#707070] hover:text-[#404297] transition-colors">{label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Space Rental", sub: "Booking System Portal", icon: "⊞" },
                    { label: "Test Centre Solutions", sub: "Accredited Pearson Vue Test Centre", icon: "🎓" },
                    { label: "Digital Marketing", sub: "Tech Consultancy & Procurement", icon: "📢" },
                    { label: "Consultancy / Procurement", sub: "End-to-end marketing solutions", icon: "👥" }
                  ].map((item) => (
                    <Link key={item.label} href={`/products/${item.label.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => setActiveDropdown(null)}
                      className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:border-[#404297]/30 hover:bg-[#404297]/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#eeeef8] flex items-center justify-center text-[#404297] text-lg flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-[#404297] uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs text-[#707070] mt-0.5">{item.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/courses" className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors">Courses</Link>
          <Link href="/case-studies" className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors">Case Studies</Link>
          <Link href="/insights" className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors">Insights</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-sm font-medium text-[#707070] hover:text-[#EE3539] transition-colors">
                Register
              </Link>
            </>
          )}
          <Link href="/contact" className="bg-[#404297] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#EE3539] transition-colors">
            Book a Call
          </Link>
        </div>
      </div>

      {/* ── MOBILE HEADER: Logo | Hamburger (center) | Book a Call ── */}
      <div className="md:hidden px-5 py-4 grid grid-cols-3 items-center">
        <Link href="/" className="justify-self-start flex-shrink-0">
          <Image src="/1-1536x638.webp" alt="Speedlink" width={120} height={38} priority className="object-contain" />
        </Link>
        <button
          className="justify-self-center flex flex-col gap-1.5 cursor-pointer"
          onClick={() => { setMenuOpen(true); setMobileExpanded(null); }}
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-[#404297]" />
          <span className="block h-0.5 w-6 bg-[#404297]" />
          <span className="block h-0.5 w-6 bg-[#404297]" />
        </button>
        <Link href="/contact"
          className="justify-self-end bg-[#404297] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#EE3539] transition-colors whitespace-nowrap">
          Book a Call
        </Link>
      </div>

      {/* ── MOBILE MENU — slides in from left, partial overlay ── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => { setMenuOpen(false); setMobileExpanded(null); }}
      />

      {/* Panel — always rendered, slides in/out */}
      <div className={`md:hidden fixed top-0 left-0 bottom-0 z-50 bg-white w-[85vw] max-w-sm flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Panel header: Logo + X */}
        <div className="flex items-start justify-between px-5 py-5 border-b border-gray-200">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/1-1536x638.webp" alt="Speedlink" width={130} height={42} priority className="object-contain" />
          </Link>
          <button
            onClick={() => { setMenuOpen(false); setMobileExpanded(null); }}
            aria-label="Close menu"
            className="border border-gray-300 text-gray-600 text-sm w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors flex-shrink-0 mt-1"
          >
            ×
          </button>
        </div>

        {/* Main nav list — always shown, Products/Services expand on hover */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-2">
          <Link href="/about" onClick={() => setMenuOpen(false)}
            className="bg-gray-100 text-gray-600 text-sm px-4 py-3 rounded hover:bg-[#404297] hover:text-white transition-colors">
            About
          </Link>

          {/* Products — hover to expand */}
          <div
            onMouseEnter={() => setMobileExpanded("products")}
            onMouseLeave={() => setMobileExpanded(null)}
          >
            <div className={`text-sm px-4 py-3 rounded flex items-center justify-between transition-colors ${mobileExpanded === "products" ? "bg-[#404297] text-white" : "bg-gray-100 text-gray-600"}`}>
              Products
              <span className={`w-6 h-6 border rounded-sm flex items-center justify-center text-xs flex-shrink-0 ${mobileExpanded === "products" ? "border-white" : "border-current"}`}>▶</span>
            </div>
            {mobileExpanded === "products" && (
              <div className="mt-1 flex flex-col gap-2 pb-1">
                <p className="text-xs font-bold text-[#404297] tracking-widest uppercase pb-2 border-b border-gray-200 px-1">Our Products</p>
                {[
                  { label: "E-Learning", sub: "Online Learning & Digital Solutions", icon: "🖥️" },
                  { label: "DigiSchool", sub: "School Management Solutions", icon: "🏫" },
                  { label: "SpeedKonnect", sub: "Internet Services & Management", icon: "📡" },
                  { label: "BlazzingShare", sub: "File Transfer / Survey Solutions", icon: "📁" },
                  { label: "SpeedTalentHQ", sub: "Recruitment Platform", icon: "👤" },
                  { label: "ERP Software", sub: "Enterprise Resource Planning", icon: "⊞" },
                ].map((item) => (
                  <Link key={item.label} href={`/products/${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#404297]/30 hover:bg-[#404297]/5 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#eeeef8] flex items-center justify-center text-[#404297] text-sm flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-[#404297] uppercase tracking-wider">{item.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Services — hover to expand */}
          <div
            onMouseEnter={() => setMobileExpanded("services")}
            onMouseLeave={() => setMobileExpanded(null)}
          >
            <div className={`text-sm px-4 py-3 rounded flex items-center justify-between transition-colors ${mobileExpanded === "services" ? "bg-[#404297] text-white" : "bg-gray-100 text-gray-600"}`}>
              Services
              <span className={`w-6 h-6 border rounded-sm flex items-center justify-center text-xs flex-shrink-0 ${mobileExpanded === "services" ? "border-white" : "border-current"}`}>▶</span>
            </div>
            {mobileExpanded === "services" && (
              <div className="mt-1 flex flex-col gap-2 pb-1">
                <p className="text-xs font-bold text-[#404297] tracking-widest uppercase pb-2 border-b border-gray-200 px-1">Our Services</p>
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-[#404297] uppercase tracking-wider mb-2 pb-2 border-b border-gray-200">IT Services</p>
                  <ul className="space-y-2">
                    {["Software Development & Deployment", "Networking/Internet Services", "Smart Surveillance", "Cybersecurity"].map((label) => (
                      <li key={label}>
                        <Link href="/services/it-services" onClick={() => setMenuOpen(false)}
                          className="text-xs text-gray-600 hover:text-[#EE3539] transition-colors block">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-[#404297] uppercase tracking-wider mb-2 pb-2 border-b border-gray-200">Training & Certification</p>
                  <ul className="space-y-2">
                    {["Corporate Training", "Tutor-led Training", "Self-paced Training", "SIWES Placement"].map((label) => (
                      <li key={label}>
                        <Link href="/services/training" onClick={() => setMenuOpen(false)}
                          className="text-xs text-gray-600 hover:text-[#404297] transition-colors block">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {[
                  { label: "Space Rental", sub: "Booking System Portal", icon: "⊞" },
                  { label: "Test Centre Solutions", sub: "Accredited Pearson Vue Test Centre", icon: "🎓" },
                  { label: "Digital Marketing", sub: "End-to-end marketing solutions", icon: "📢" },
                  { label: "Consultancy / Procurement", sub: "Tech Consultancy & Procurement", icon: "👥" },
                ].map((item) => (
                  <Link key={item.label} href={`/services/${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 hover:border-[#404297]/30 hover:bg-[#404297]/5 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#eeeef8] flex items-center justify-center text-[#404297] text-sm flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-[#404297] uppercase tracking-wider">{item.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/courses" onClick={() => setMenuOpen(false)}
            className="bg-gray-100 text-gray-600 text-sm px-4 py-3 rounded hover:bg-[#404297] hover:text-white transition-colors">
            Courses
          </Link>
          <Link href="/case-studies" onClick={() => setMenuOpen(false)}
            className="bg-gray-100 text-gray-600 text-sm px-4 py-3 rounded hover:bg-[#404297] hover:text-white transition-colors">
            Case Studies
          </Link>
          <Link href="/insights" onClick={() => setMenuOpen(false)}
            className="bg-gray-100 text-gray-600 text-sm px-4 py-3 rounded hover:bg-[#404297] hover:text-white transition-colors">
            Insights
          </Link>
          <div className="mt-auto pt-6">
            {user ? (
              <>
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-3 rounded mb-2">
                  Hi, {user.username}
                </div>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block w-full bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-gray-300 transition-colors mb-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}
                  className="block w-full bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-gray-300 transition-colors mb-2">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}
                  className="block w-full bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-gray-300 transition-colors mb-2">
                  Register
                </Link>
              </>
            )}
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="block w-full bg-[#353380] text-white text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-[#EE3539] transition-colors">
              Book a Call
            </Link>
          </div>
        </nav>

      </div>
    </header>
  );
}
