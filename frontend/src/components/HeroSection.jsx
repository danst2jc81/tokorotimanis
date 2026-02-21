import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToProducts = () => {
    const element = document.querySelector("#produk");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-end pb-24 md:pb-32"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/31371161/pexels-photo-31371161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Fresh baked bread"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          {/* Accent text */}
          <p
            className="font-accent text-2xl md:text-3xl text-[#D4AF37] mb-4 animate-fade-up opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Sejak 2010
          </p>

          {/* Main heading */}
          <h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight animate-fade-up opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Roti Manis
            <br />
            <span className="text-[#D4AF37]">Bakery</span>
          </h1>

          {/* Divider */}
          <div
            className="section-divider animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          ></div>

          {/* Subtitle */}
          <p
            className="font-body text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mt-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards", textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
          >
            Nikmati kelezatan roti artisan berkualitas premium, 
            dipanggang dengan cinta menggunakan resep warisan keluarga.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <button
              onClick={scrollToProducts}
              className="btn-primary"
              data-testid="hero-explore-btn"
            >
              Jelajahi Produk
            </button>
            <a
              href="#tentang"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#tentang")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary text-center"
              data-testid="hero-story-btn"
            >
              Cerita Kami
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        data-testid="scroll-indicator"
      >
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center text-white/80 hover:text-[#D4AF37] transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-body">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-12 hidden xl:block">
        <div className="w-px h-32 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
      </div>
    </section>
  );
}
