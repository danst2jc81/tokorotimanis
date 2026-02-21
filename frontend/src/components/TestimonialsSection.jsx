import { Star, Quote } from "lucide-react";

const defaultTestimonials = [
  {
    id: "1",
    name: "Sarah Wijaya",
    message: "Roti terenak yang pernah saya coba! Croissant-nya sangat renyah dan butter-nya terasa premium. Pasti akan kembali lagi!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  },
  {
    id: "2",
    name: "Budi Santoso",
    message: "Wedding cake dari Roti Manis membuat acara pernikahan kami sempurna. Desainnya elegan dan rasanya luar biasa!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  },
  {
    id: "3",
    name: "Maya Putri",
    message: "Sourdough artisan mereka adalah yang terbaik di kota! Fermentasi sempurna dan teksturnya sangat nikmat.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div
      className="bg-[#F9F5F0] p-8 md:p-10 relative group animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
      data-testid={`testimonial-card-${index}`}
    >
      {/* Quote Mark */}
      <Quote className="absolute top-6 right-6 w-12 h-12 text-[#D4AF37] opacity-20" />

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? "star-filled fill-current" : "star-empty"
            }`}
          />
        ))}
      </div>

      {/* Message */}
      <p className="font-body text-[#2C2C2C] leading-relaxed mb-8 text-lg">
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-heading text-lg font-semibold text-[#2C2C2C]">
            {testimonial.name}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#8B5E3C]">
            Pelanggan Setia
          </p>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37] 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const TestimonialSkeleton = () => (
  <div className="bg-[#F9F5F0] p-8 md:p-10">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 skeleton rounded-full"></div>
      ))}
    </div>
    <div className="space-y-3 mb-8">
      <div className="h-4 skeleton w-full"></div>
      <div className="h-4 skeleton w-5/6"></div>
      <div className="h-4 skeleton w-4/6"></div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 skeleton rounded-full"></div>
      <div>
        <div className="h-5 skeleton w-32 mb-2"></div>
        <div className="h-3 skeleton w-24"></div>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection({ testimonials, loading }) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section
      id="testimoni"
      className="py-24 md:py-32 bg-[#FDFCF8]"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle">Testimoni</p>
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            Kata Mereka
          </h2>
          <div className="section-divider mx-auto"></div>
          <p className="text-[#6B5B54] max-w-2xl mx-auto mt-6 font-body">
            Dengarkan langsung dari pelanggan setia kami tentang pengalaman 
            mereka menikmati produk Roti Manis Bakery.
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-[#E0D5C9]">
          <p className="text-center text-xs uppercase tracking-widest text-[#8B5E3C] mb-8">
            Dipercaya Oleh
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            <span className="font-heading text-xl text-[#2C2C2C]">Google Reviews</span>
            <span className="font-heading text-xl text-[#2C2C2C]">TripAdvisor</span>
            <span className="font-heading text-xl text-[#2C2C2C]">Zomato</span>
            <span className="font-heading text-xl text-[#2C2C2C]">GrabFood</span>
          </div>
        </div>
      </div>
    </section>
  );
}
