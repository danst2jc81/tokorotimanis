const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1759749597913-98abd8b3127d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxhcnRpc2FuJTIwc291cmRvdWdoJTIwYnJlYWQlMjBydXN0aWMlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzE3MDA3OTJ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Artisan Bread Collection",
    span: "col-span-2 row-span-2",
  },
  {
    url: "https://images.pexels.com/photos/30056396/pexels-photo-30056396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Freshly Baked Pastries",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.pexels.com/photos/8105060/pexels-photo-8105060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Luxury Croissants",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1745937745692-273bbd37b601?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBiYWtlcnklMjBpbnRlcmlvciUyMHdhcm0lMjBsaWdodGluZyUyMG1pbmltYWxpc3R8ZW58MHx8fHwxNzcxNzAwNzk1fDA&ixlib=rb-4.1.0&q=85",
    alt: "Bakery Interior",
    span: "col-span-1 row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1589648219334-23195fe1043d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxwYXN0cnklMjBjaGVmJTIwZGVjb3JhdGluZyUyMGNha2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzcxNzAwNzk2fDA&ixlib=rb-4.1.0&q=85",
    alt: "Wedding Cake",
    span: "col-span-1 row-span-1",
  },
  {
    url: "https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Fresh Baguettes",
    span: "col-span-1 row-span-1",
  },
];

export default function GallerySection() {
  return (
    <section
      id="galeri"
      className="py-24 md:py-32 bg-[#2C2C2C]"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-2xl md:text-3xl text-[#D4AF37] mb-2">
            Galeri
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#F9F5F0] mb-4">
            Karya Kami
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto"></div>
          <p className="text-[#A09080] max-w-2xl mx-auto mt-6 font-body">
            Sekilas tentang kreasi roti dan kue artisan kami yang dibuat 
            dengan penuh dedikasi dan keahlian.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.span} overflow-hidden cursor-pointer`}
              data-testid={`gallery-item-${index}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <p className="text-[#A09080] font-body mb-4">
            Lihat lebih banyak di Instagram kami
          </p>
          <a
            href="https://instagram.com/rotimanisbakery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#F9F5F0] text-[#F9F5F0] 
                       px-8 py-4 uppercase tracking-widest text-xs font-medium
                       hover:bg-[#F9F5F0] hover:text-[#2C2C2C] transition-all duration-300"
            data-testid="instagram-link"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @rotimanisbakery
          </a>
        </div>
      </div>
    </section>
  );
}
