import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

const Banner = () => {
  // Données des slides avec produits électroniques réels
  const slides = [
    {
      id: 1,
      imageUrl: "https://img.freepik.com/premium-vector/smartphone-mobile-screen-technology-mobile-display-light-vector_3482-10935.jpg?w=996",
      altText: "iPhone 15 Pro Max",
      title: "iPhone 15 Pro Max",
      subtitle: "Écran Super Retina XDR - 256GB",
      price: "1 199€",
      productUrl: "https://www.amazon.fr/Apple-iPhone-Pro-Max-256/dp/B0CHX6W6D4"
    },
    {
      id: 2,
      imageUrl: "https://img.freepik.com/premium-vector/smartphone-mobile-screen-technology-mobile-display-light-vector_3482-10653.jpg?w=996",
      altText: "MacBook Air M2",
      title: "MacBook Air M2",
      subtitle: "Chip Apple M2 - 13.6\" - 8GB RAM",
      price: "1 249€",
      productUrl: "https://img.freepik.com/free-photo/black-person-setting-configuration-smart-home_657883-247.jpg?t=st=1746832950~exp=1746836550~hmac=53801967ab14be8bef9c2c07f36bf02dfe9fe38fc9eb32c3961683a85552d625&w=740"
    },
    {
      id: 3,
      imageUrl: "https://img.freepik.com/premium-photo/cellphone-isometric-design-with-blank-screen-mock-up-modern-mobile-phone-illustration_163252-57.jpg?w=996",
      altText: "Samsung Galaxy S23 Ultra",
      title: "Galaxy S23 Ultra",
      subtitle: "Appareil photo 200MP - 12GB RAM",
      price: "1 259€",
      productUrl: "https://img.freepik.com/premium-photo/logo-mobile-products-that-is-made-by-companys-brand_1189726-5329.jpg?w=740"
    },
    {
      id: 4,
      imageUrl: "https://img.freepik.com/premium-vector/smartphone-mobile-screen-technology-mobile-display-light-vector_3482-10653.jpg?w=996",
      altText: "Sony WH-1000XM5",
      title: "Sony WH-1000XM5",
      subtitle: "Casque antibruit sans fil",
      price: "379€",
      productUrl: "https://img.freepik.com/free-vector/antigravity-technology-with-elements_23-2148131463.jpg?t=st=1746832801~exp=1746836401~hmac=908f7606f34696e101c1a26ad43f15ddf5816fa1bd06afe0de7a805963b5d59a&w=740"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group">
      {/* Slides */}
      <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <img
              src={slide.imageUrl}
              alt={slide.altText}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            
            {/* Product Info */}
            <div className="absolute left-10 md:left-20 bottom-20 z-20 text-white max-w-md">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-4">{slide.subtitle}</p>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold">{slide.price}</span>
                <a 
                  href={slide.productUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors"
                >
                  <FiShoppingCart /> Acheter maintenant
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white z-30 transition-all group-hover:opacity-100 opacity-0"
      >
        <FiChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white z-30 transition-all group-hover:opacity-100 opacity-0"
      >
        <FiChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx);
              resetAutoPlay();
            }}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;