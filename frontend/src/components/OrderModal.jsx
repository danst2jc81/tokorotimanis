import { useState, useEffect } from "react";
import { X, Minus, Plus, Calendar as CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function OrderModal({ isOpen, onClose, product, onSubmit }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    email: "",
    quantity: 1,
    notes: "",
    pickup_date: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        product_name: product.name,
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      ...formData,
      product_name: product?.name || "",
      pickup_date: formData.pickup_date
        ? format(formData.pickup_date, "yyyy-MM-dd")
        : null,
    };

    await onSubmit(orderData);
    setIsSubmitting(false);
    setFormData({
      customer_name: "",
      phone: "",
      email: "",
      quantity: 1,
      notes: "",
      pickup_date: null,
    });
  };

  if (!product) return null;

  const totalPrice = product.price * formData.quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#FDFCF8] border-none p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-heading text-2xl text-[#2C2C2C] pr-8">
            Pesan Produk
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Product Info */}
          <div className="flex gap-4 mb-6 p-4 bg-[#F9F5F0]" data-testid="order-product-info">
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-[#8B5E3C] mb-1">
                {product.category}
              </p>
              <h4 className="font-heading text-lg font-semibold text-[#2C2C2C]">
                {product.name}
              </h4>
              <p className="text-[#8B5E3C] font-heading text-lg mt-1">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-5" data-testid="order-form">
            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-[#E0D5C9] 
                         focus:border-[#8B5E3C] outline-none font-body text-[#2C2C2C]"
                data-testid="order-name-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Nomor WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+62"
                className="w-full px-4 py-3 bg-white border border-[#E0D5C9] 
                         focus:border-[#8B5E3C] outline-none font-body text-[#2C2C2C]"
                data-testid="order-phone-input"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Email (Opsional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#E0D5C9] 
                         focus:border-[#8B5E3C] outline-none font-body text-[#2C2C2C]"
                data-testid="order-email-input"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Jumlah
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 bg-[#2C2C2C] text-white flex items-center justify-center 
                           hover:bg-[#8B5E3C] transition-colors"
                  data-testid="quantity-minus-btn"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-heading text-xl text-[#2C2C2C] w-12 text-center">
                  {formData.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 bg-[#2C2C2C] text-white flex items-center justify-center 
                           hover:bg-[#8B5E3C] transition-colors"
                  data-testid="quantity-plus-btn"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Tanggal Ambil (Opsional)
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-white border border-[#E0D5C9] 
                             text-left font-body text-[#2C2C2C] flex items-center justify-between"
                    data-testid="pickup-date-btn"
                  >
                    {formData.pickup_date ? (
                      format(formData.pickup_date, "dd MMMM yyyy", { locale: id })
                    ) : (
                      <span className="text-[#8B5E3C]/50">Pilih tanggal</span>
                    )}
                    <CalendarIcon className="w-4 h-4 text-[#8B5E3C]" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.pickup_date}
                    onSelect={(date) => {
                      setFormData({ ...formData, pickup_date: date });
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#8B5E3C] mb-2">
                Catatan Khusus (Opsional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Misalnya: tanpa kacang, tambah topping, dll."
                className="w-full px-4 py-3 bg-white border border-[#E0D5C9] 
                         focus:border-[#8B5E3C] outline-none font-body text-[#2C2C2C] resize-none"
                data-testid="order-notes-input"
              ></textarea>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-[#E0D5C9]">
              <span className="text-sm uppercase tracking-widest text-[#8B5E3C]">
                Total
              </span>
              <span className="font-heading text-2xl font-semibold text-[#2C2C2C]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              data-testid="order-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-[#F9F5F0] border-t-transparent rounded-full animate-spin"></span>
                  Memproses...
                </>
              ) : (
                "Kirim Pesanan"
              )}
            </button>

            <p className="text-xs text-center text-[#6B5B54]">
              Kami akan menghubungi Anda via WhatsApp untuk konfirmasi pesanan
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
