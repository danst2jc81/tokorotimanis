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

// Default products data - tampil langsung tanpa loading
const defaultProducts = [
  {
    id: "1",
    name: "Croissant Premium",
    description: "Croissant butter klasik dengan lapisan renyah sempurna",
    price: 35000,
    category: "Pastry",
    image_url: "https://images.pexels.com/photos/8105060/pexels-photo-8105060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: true
  },
  {
    id: "2",
    name: "Sourdough Artisan",
    description: "Roti sourdough dengan fermentasi alami 24 jam",
    price: 85000,
    category: "Roti",
    image_url: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: true
  },
  {
    id: "3",
    name: "Wedding Cake Elegant",
    description: "Kue pengantin mewah dengan dekorasi bunga segar",
    price: 2500000,
    category: "Kue",
    image_url: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: true
  },
  {
    id: "4",
    name: "Pain au Chocolat",
    description: "Pastry lembut dengan cokelat Belgium premium",
    price: 42000,
    category: "Pastry",
    image_url: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: false
  },
  {
    id: "5",
    name: "Baguette Klasik",
    description: "Baguette Prancis dengan kulit renyah dan lembut di dalam",
    price: 45000,
    category: "Roti",
    image_url: "https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: false
  },
  {
    id: "6",
    name: "Birthday Cake Deluxe",
    description: "Kue ulang tahun dengan buttercream dan fondant premium",
    price: 650000,
    category: "Kue",
    image_url: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    is_featured: true
  }
];

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

function App() {
  // Langsung gunakan default data, tidak perlu loading state
  const [products, setProducts] = useState(defaultProducts);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch data dari API di background (optional update)
    const fetchData = async () => {
      try {
        // Seed data first
        axios.post(`${API}/seed`).catch(() => {});
        
        // Fetch products (update jika berhasil)
        const productsRes = await axios.get(`${API}/products`);
        if (productsRes.data && productsRes.data.length > 0) {
          setProducts(productsRes.data);
        }
        
        // Fetch testimonials (update jika berhasil)
        const testimonialsRes = await axios.get(`${API}/testimonials`);
        if (testimonialsRes.data && testimonialsRes.data.length > 0) {
          setTestimonials(testimonialsRes.data);
        }
      } catch (error) {
        // Jika API error, tetap gunakan default data
        console.log("Using default data");
      }
    };

    fetchData();
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
          loading={false}
          onOrderClick={handleOrderClick}
        />
        <GallerySection />
        <TestimonialsSection testimonials={testimonials} loading={false} />
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
