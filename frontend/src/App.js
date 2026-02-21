import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import LocationSection from "./components/LocationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import OrderModal from "./components/OrderModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Seed data first
        await axios.post(`${API}/seed`);
        
        // Fetch products
        const productsRes = await axios.get(`${API}/products`);
        setProducts(productsRes.data);
        
        // Fetch testimonials
        const testimonialsRes = await axios.get(`${API}/testimonials`);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderModalOpen(true);
  };

  const handleOrderSubmit = async (orderData) => {
    try {
      await axios.post(`${API}/orders`, orderData);
      toast.success("Pesanan berhasil dikirim! Kami akan menghubungi Anda segera.");
      setOrderModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Gagal mengirim pesanan. Silakan coba lagi.");
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      await axios.post(`${API}/contact`, contactData);
      toast.success("Pesan berhasil dikirim! Terima kasih telah menghubungi kami.");
      return true;
    } catch (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      return false;
    }
  };

  return (
    <div className="App min-h-screen" data-testid="app-container">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" aria-hidden="true"></div>
      
      <Toaster position="top-right" richColors />
      
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection 
          products={products} 
          loading={loading}
          onOrderClick={handleOrderClick}
        />
        <GallerySection />
        <TestimonialsSection testimonials={testimonials} loading={loading} />
        <LocationSection />
        <ContactSection onSubmit={handleContactSubmit} />
      </main>
      
      <Footer />
      
      <WhatsAppButton />
      
      <OrderModal 
        isOpen={orderModalOpen}
        onClose={() => {
          setOrderModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}

export default App;
