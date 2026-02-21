import { MapPin, Clock, Phone, Mail } from "lucide-react";

const storeInfo = {
  address: "Jl. Sudirman No. 123, Jakarta Selatan, 12190",
  phone: "+62 21 1234 5678",
  whatsapp: "+62 812 3456 7890",
  email: "hello@rotimanisbakery.com",
  hours: [
    { day: "Senin - Jumat", time: "07:00 - 21:00" },
    { day: "Sabtu", time: "07:00 - 22:00" },
    { day: "Minggu", time: "08:00 - 20:00" },
  ],
};

// Google Maps embed URL for Jakarta (random central location)
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1651234567890!5m2!1sen!2sid";

export default function LocationSection() {
  return (
    <section
      id="lokasi"
      className="py-24 md:py-32 bg-[#F9F5F0]"
      data-testid="location-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info Column */}
          <div>
            <p className="section-subtitle">Kunjungi Kami</p>
            <h2 className="section-title text-4xl md:text-5xl mb-6">
              Lokasi Toko
            </h2>
            <div className="section-divider"></div>

            <p className="text-[#6B5B54] font-body leading-relaxed mt-6 mb-10">
              Datang dan rasakan langsung aroma roti segar yang baru keluar 
              dari oven. Tim kami siap membantu Anda menemukan roti favorit.
            </p>

            {/* Store Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4" data-testid="store-address">
                <div className="w-12 h-12 bg-[#2C2C2C] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B5E3C] mb-1">
                    Alamat
                  </p>
                  <p className="font-body text-[#2C2C2C]">{storeInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4" data-testid="store-phone">
                <div className="w-12 h-12 bg-[#2C2C2C] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B5E3C] mb-1">
                    Telepon / WhatsApp
                  </p>
                  <p className="font-body text-[#2C2C2C]">{storeInfo.phone}</p>
                  <p className="font-body text-[#2C2C2C]">{storeInfo.whatsapp}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4" data-testid="store-email">
                <div className="w-12 h-12 bg-[#2C2C2C] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B5E3C] mb-1">
                    Email
                  </p>
                  <p className="font-body text-[#2C2C2C]">{storeInfo.email}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4" data-testid="store-hours">
                <div className="w-12 h-12 bg-[#2C2C2C] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                    Jam Operasional
                  </p>
                  <div className="space-y-1">
                    {storeInfo.hours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className="flex justify-between gap-8 font-body text-[#2C2C2C]"
                      >
                        <span>{schedule.day}</span>
                        <span className="text-[#8B5E3C]">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Directions CTA */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block mt-10"
              data-testid="get-directions-btn"
            >
              Dapatkan Petunjuk Arah
            </a>
          </div>

          {/* Map Column */}
          <div className="relative">
            <div
              className="map-grayscale w-full h-[400px] lg:h-full min-h-[400px]"
              data-testid="google-map-container"
            >
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Roti Manis Bakery"
              ></iframe>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-[#D4AF37] -z-10 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
