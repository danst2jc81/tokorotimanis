import { ShoppingBag } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product, onOrderClick, index }) => {
  return (
    <div
      className="card-product group animate-fade-up opacity-0"
      style={{ 
        animationDelay: `${index * 0.1}s`, 
        animationFillMode: "forwards" 
      }}
      data-testid={`product-card-${index}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] mb-6 img-hover-zoom overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="product-image-overlay"></div>
        
        {/* Featured Badge */}
        {product.is_featured && (
          <span className="badge-new absolute top-4 left-4">
            Favorit
          </span>
        )}

        {/* Quick Order Button */}
        <button
          onClick={() => onOrderClick(product)}
          className="absolute bottom-4 left-4 right-4 bg-[#2C2C2C] text-[#F9F5F0] py-3 px-4 
                     flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 
                     transform translate-y-4 group-hover:translate-y-0 
                     transition-all duration-300"
          data-testid={`order-btn-${index}`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider">Pesan</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#8B5E3C]">
          {product.category}
        </p>
        <h3 className="font-heading text-xl font-semibold text-[#2C2C2C]">
          {product.name}
        </h3>
        <p className="text-sm text-[#6B5B54] leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <p className="price-tag pt-2">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="card-product">
    <div className="aspect-[4/5] mb-6 skeleton"></div>
    <div className="space-y-2">
      <div className="h-3 w-16 skeleton"></div>
      <div className="h-5 w-3/4 skeleton"></div>
      <div className="h-4 w-full skeleton"></div>
      <div className="h-5 w-24 skeleton mt-2"></div>
    </div>
  </div>
);

export default function ProductsSection({ products, loading, onOrderClick }) {
  const featuredProducts = products.filter((p) => p.is_featured);
  const otherProducts = products.filter((p) => !p.is_featured);

  return (
    <section
      id="produk"
      className="py-24 md:py-32 bg-[#FDFCF8]"
      data-testid="products-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle">Koleksi Kami</p>
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            Produk Premium
          </h2>
          <div className="section-divider mx-auto"></div>
          <p className="text-[#6B5B54] max-w-2xl mx-auto mt-6 font-body">
            Setiap roti dibuat dengan bahan-bahan pilihan terbaik dan 
            dipanggang dengan penuh keahlian untuk menghadirkan cita rasa sempurna.
          </p>
        </div>

        {/* Featured Products - Bento Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrderClick={onOrderClick}
                  index={index}
                />
              ))}
            </div>

            {/* Other Products */}
            {otherProducts.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-[#E0D5C9]"></div>
                  <span className="text-xs uppercase tracking-widest text-[#8B5E3C]">
                    Produk Lainnya
                  </span>
                  <div className="h-px flex-1 bg-[#E0D5C9]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrderClick={onOrderClick}
                      index={index + featuredProducts.length}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16">
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary inline-block"
            data-testid="view-all-products-btn"
          >
            Lihat Semua & Pesan
          </a>
        </div>
      </div>
    </section>
  );
}
