import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";

export default function ContactSection({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
    
    setIsSubmitting(false);
  };

  return (
    <section
      id="kontak"
      className="py-24 md:py-32 bg-[#2C2C2C] relative overflow-hidden"
      data-testid="contact-section"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5E3C] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Text */}
          <div>
            <p className="font-accent text-2xl md:text-3xl text-[#D4AF37] mb-2">
              Hubungi Kami
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#F9F5F0] mb-6">
              Pesan Khusus
              <br />
              <span className="text-[#8B5E3C]">Untuk Anda</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mb-8"></div>

            <p className="text-[#A09080] font-body leading-relaxed mb-8 text-lg">
              Punya pesanan khusus atau pertanyaan? Kami siap membantu mewujudkan 
              keinginan Anda. Hubungi kami dan tim akan merespons dalam 24 jam.
            </p>

            {/* Quick Contact Options */}
            <div className="space-y-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                data-testid="whatsapp-contact-link"
              >
                <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center 
                              group-hover:bg-[#D4AF37] transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#D4AF37] group-hover:text-[#2C2C2C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#F9F5F0] font-body">Chat via WhatsApp</p>
                  <p className="text-[#A09080] text-sm">Respon cepat</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#D4AF37] ml-auto opacity-0 
                                       group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="tel:+6281234567890"
                className="flex items-center gap-4 group"
                data-testid="phone-contact-link"
              >
                <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center 
                              group-hover:bg-[#D4AF37] transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#D4AF37] group-hover:text-[#2C2C2C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F9F5F0] font-body">Telepon Langsung</p>
                  <p className="text-[#A09080] text-sm">+62 812 3456 7890</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#D4AF37] ml-auto opacity-0 
                                       group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#F9F5F0] p-8 md:p-12 relative">
            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#D4AF37] -translate-x-4 -translate-y-4"></div>

            <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
              {/* Name */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="input-elegant peer"
                  data-testid="contact-name-input"
                />
                <label htmlFor="contact-name" className="form-label">
                  Nama Lengkap
                </label>
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="input-elegant peer"
                  data-testid="contact-email-input"
                />
                <label htmlFor="contact-email" className="form-label">
                  Email
                </label>
              </div>

              {/* Phone */}
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  id="contact-phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="input-elegant peer"
                  data-testid="contact-phone-input"
                />
                <label htmlFor="contact-phone" className="form-label">
                  Nomor Telepon (Opsional)
                </label>
              </div>

              {/* Message */}
              <div className="form-group">
                <textarea
                  name="message"
                  id="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="input-elegant peer resize-none"
                  data-testid="contact-message-input"
                ></textarea>
                <label htmlFor="contact-message" className="form-label">
                  Pesan Anda
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-[#F9F5F0] border-t-transparent rounded-full animate-spin"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
