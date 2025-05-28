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
      productUrl: "https://mactob.vercel.app/product"
    },
    {
      id: 2,
      imageUrl: "https://img.freepik.com/premium-vector/smartphone-mobile-screen-technology-mobile-display-light-vector_3482-10653.jpg?w=996",
      altText: "MacBook Air M2",
      title: "MacBook Air M2",
      subtitle: "Chip Apple M2 - 13.6\" - 8GB RAM",
      price: "1 249€",
      productUrl: "https://mactob.vercel.app/product"
    },
    {
      id: 3,
      imageUrl: "https://img.freepik.com/premium-photo/cellphone-isometric-design-with-blank-screen-mock-up-modern-mobile-phone-illustration_163252-57.jpg?w=996",
      altText: "Samsung Galaxy S23 Ultra",
      title: "Galaxy S23 Ultra",
      subtitle: "Appareil photo 200MP - 12GB RAM",
      price: "1 259€",
      productUrl: "https://mactob.vercel.app/product"
    },
    {
      id: 4,
      imageUrl: "https://img.freepik.com/premium-vector/smartphone-mobile-screen-technology-mobile-display-light-vector_3482-10653.jpg?w=996",
      altText: "Sony WH-1000XM5",
      title: "Sony WH-1000XM5",
      subtitle: "Casque antibruit sans fil",
      price: "379€",
      productUrl: "https://mactob.vercel.app/product"
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
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden group">
      {/* Slides */}
      <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            {/* Overlay gradient amélioré */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            
            {/* Image avec effet de zoom au survol */}
            <div className="w-full h-full overflow-hidden">
              <img
                src={slide.imageUrl}
                alt={slide.altText}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
              />
            </div>
            
            {/* Product Info avec animation */}
            <div className="absolute left-10 md:left-20 bottom-20 z-20 text-white max-w-xl transform transition-all duration-500 group-hover:translate-y-[-10px]">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">{slide.title}</h2>
              <p className="text-lg md:text-2xl mb-6 text-gray-200">{slide.subtitle}</p>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <span className="text-3xl md:text-4xl font-bold text-blue-400">{slide.price}</span>
                <a 
                  href={slide.productUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <FiShoppingCart className="text-xl" /> 
                  <span className="text-lg font-medium">Acheter maintenant</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation améliorée */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white z-30 transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110"
        aria-label="Slide précédent"
      >
        <FiChevronLeft className="w-7 h-7 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-white z-30 transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110"
        aria-label="Slide suivant"
      >
        <FiChevronRight className="w-7 h-7 text-gray-800" />
      </button>

      {/* Pagination améliorée */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx);
              resetAutoPlay();
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx 
                ? 'bg-white w-8' 
                : 'bg-white/50 w-3 hover:bg-white/80'
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;