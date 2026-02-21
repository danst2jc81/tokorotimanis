import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang", href: "#tentang" },
  { name: "Produk", href: "#produk" },
  { name: "Galeri", href: "#galeri" },
  { name: "Testimoni", href: "#testimoni" },
  { name: "Lokasi", href: "#lokasi" },
  { name: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FDFCF8]/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#beranda");
              }}
              className="flex items-center gap-3"
              data-testid="logo-link"
            >
              <span className="font-accent text-3xl text-[#D4AF37]">RM</span>
              <div className="hidden sm:block">
                <span className="font-heading text-xl font-semibold text-[#2C2C2C] tracking-tight">
                  Roti Manis
                </span>
                <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-[#8B5E3C] -mt-1">
                  Bakery
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link font-body"
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#kontak"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#kontak");
                }}
                className="btn-primary"
                data-testid="order-now-btn"
              >
                Pesan Sekarang
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-6 h-6 text-[#2C2C2C]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="mobile-menu-overlay"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        data-testid="mobile-menu"
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-heading text-xl font-semibold text-[#2C2C2C]">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            data-testid="close-menu-btn"
          >
            <X className="w-6 h-6 text-[#2C2C2C]" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-lg font-body text-[#2C2C2C] hover:text-[#8B5E3C] transition-colors"
              data-testid={`mobile-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#kontak");
            }}
            className="btn-primary w-full text-center block"
            data-testid="mobile-order-btn"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </>
  );
}
