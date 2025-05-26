import React, { useState } from 'react';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Benefits from '../components/Benefits';
import Title from '../components/Title';
import Banner from '../components/BannerProduct';

const Home = () => {
  const products = [
    { category: "IPHONE", heading: "Smartphones Apple performants et élégants 🍏" },
    { category: "IPHONE PROMAX", heading: "iPhone Pro Max : puissance et grand écran 📱" },
    { category: "SAMSUNG", heading: "Smartphones Samsung innovants et polyvalents 📱" },
    { category: "PIXEL", heading: "Google Pixel : l'expérience Android pure" },
    { category: "REDMI", heading: "Smartphones Redmi : performance à prix abordable" },
    { category: "HUAWEI", heading: "Huawei : technologie avancée et photographie mobile" },
    { category: "GADGETS ÉLECTRONIQUE", heading: "Accessoires high-tech et innovations électroniques ⚡" },
    { category: "APPLE WATCH", heading: "Montres connectées Apple Watch ⌚" },
    { category: "ACCESSOIRES", heading: "Accessoires indispensables pour vos appareils" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
       <Banner />
      {/* <Benefits /> */}
      <HorizontalCardProduct category="SMARTPHONES" heading="Smartphones Android et iOS : performance et innovation 📱" />
      <HorizontalCardProduct category="IPHONE PROMAX" heading="iPhone Pro Max : puissance, élégance et grand écran 📱" />
      <HorizontalCardProduct category="SAMSUNG" heading="Samsung Galaxy : design, innovation et polyvalence 🚀" />
      <HorizontalCardProduct category="PIXEL" heading="Google Pixel : fluidité et photographie avancée 📸" />
      <HorizontalCardProduct category="REDMI" heading="Redmi : smartphones performants à prix abordable 🔥" />
      <HorizontalCardProduct category="HUAWEI" heading="Huawei : technologie de pointe et qualité photo exceptionnelle 📷" />
      <HorizontalCardProduct category="GADGETS ÉLECTRONIQUE" heading="Découvrez les dernières innovations high-tech ⚡" />
      <HorizontalCardProduct category="APPLE WATCH" heading="Apple Watch : élégance et suivi de santé intelligent ⌚" />
      <HorizontalCardProduct category="ACCESSOIRES" heading="Tous les accessoires pour optimiser votre expérience mobile 🔌" />
      <HorizontalCardProduct category="IPHONE 6" heading="iPhone 6 : un classique fiable et fonctionnel ⚙️" />
      <HorizontalCardProduct category="IPHONE 7" heading="iPhone 7 : performance et design intemporel 🛡️" />
      <HorizontalCardProduct category="IPHONE 8" heading="iPhone 8 : puissance et compacité dans un format élégant 🔋" />
      <HorizontalCardProduct category="IPHONE XR" heading="iPhone XR : couleurs vives et écran Liquid Retina 📱" />
      <HorizontalCardProduct category="IPHONE 11" heading="iPhone 11 : double caméra et autonomie impressionnante 🔥" />
      <HorizontalCardProduct category="IPHONE 12" heading="iPhone 12 : design bord droit et puissance 5G ⚡" />
      <HorizontalCardProduct category="IPHONE 13" heading="iPhone 13 : autonomie optimisée et photos exceptionnelles 📸" />
      <HorizontalCardProduct category="IPHONE 14" heading="iPhone 14 : performances avancées et sécurité renforcée 🏆" />
      <HorizontalCardProduct category="IPHONE 15" heading="iPhone 15 : design en titane et puissance ultime 🚀" />
      <HorizontalCardProduct category="STOCK SCELLÉ CANADA DISPONIBLE 🇨🇦" heading="Stock scellé du Canada : smartphones authentiques et garantis 🇨🇦" />

      
      <Title />
      
      {currentProducts.length > 0 ? (
        currentProducts.map((product, index) => (
          <VerticalCardProduct key={index} category={product.category} heading={product.heading} />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8 font-semibold">
          Aucun produit disponible pour le moment.
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center mt-8 font-semibold">
          <button
            className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Retour
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 border rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
