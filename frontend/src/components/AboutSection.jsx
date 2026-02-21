import { Award, Clock, Users, Heart } from "lucide-react";

const stats = [
  { icon: Clock, value: "15+", label: "Tahun Pengalaman" },
  { icon: Users, value: "50K+", label: "Pelanggan Puas" },
  { icon: Award, value: "25+", label: "Penghargaan" },
  { icon: Heart, value: "100%", label: "Bahan Alami" },
];

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-24 md:py-32 bg-[#F9F5F0]"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="img-hover-zoom">
                <img
                  src="https://images.pexels.com/photos/16135140/pexels-photo-16135140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Baker preparing fresh bread"
                  className="w-full aspect-[4/5] object-cover"
                  data-testid="about-main-image"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#2C2C2C] text-[#F9F5F0] p-6 md:p-8">
                <p className="font-accent text-3xl md:text-4xl text-[#D4AF37]">15+</p>
                <p className="text-xs uppercase tracking-widest mt-1">Tahun</p>
              </div>

              {/* Decorative line */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#D4AF37] -z-10"></div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="section-subtitle">Tentang Kami</p>
            <h2 className="section-title text-4xl md:text-5xl mb-6">
              Tradisi Rasa,
              <br />
              Kualitas Premium
            </h2>
            <div className="section-divider"></div>

            <div className="space-y-6 text-[#6B5B54] font-body leading-relaxed">
              <p>
                Didirikan pada tahun 2010, <strong className="text-[#2C2C2C]">Roti Manis Bakery</strong> lahir dari 
                kecintaan mendalam terhadap seni membuat roti. Kami memulai perjalanan ini dengan satu 
                misi sederhana: menghadirkan roti berkualitas tinggi dengan cita rasa autentik untuk 
                setiap keluarga Indonesia.
              </p>
              <p>
                Setiap roti yang kami panggang dibuat dengan bahan-bahan pilihan terbaik, 
                tanpa pengawet atau bahan buatan. Kami percaya bahwa roti yang sempurna 
                membutuhkan waktu, kesabaran, dan yang terpenting — cinta dalam setiap proses pembuatannya.
              </p>
              <p>
                Dari croissant renyah hingga sourdough artisan, setiap produk kami adalah 
                hasil dari dedikasi tukang roti berpengalaman yang telah menyempurnakan 
                keahlian mereka selama bertahun-tahun.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center md:text-left"
                  data-testid={`stat-${index}`}
                >
                  <stat.icon className="w-6 h-6 text-[#D4AF37] mx-auto md:mx-0 mb-3" />
                  <p className="font-heading text-2xl md:text-3xl font-semibold text-[#2C2C2C]">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#6B5B54] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
