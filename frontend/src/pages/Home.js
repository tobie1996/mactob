import React, { useState } from 'react';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Benefits from '../components/Benefits';
import Title from '../components/Title';
import Banner from '../components/BannerProduct';

const Home = () => {
  const products = [
    { category: "IPHONE 6", heading: "iPhone 6 : L'icône de l'innovation Apple 📱" },
    { category: "IPHONE 7", heading: "iPhone 7 : Performance et design intemporel 📱" },
    { category: "IPHONE 8", heading: "iPhone 8 : Équilibre parfait entre puissance et prix 📱" },
    { category: "IPHONE XR", heading: "iPhone XR : Expérience premium à prix accessible 📱" },
    { category: "IPHONE 11", heading: "iPhone 11 : Photographie révolutionnaire 📱" },
    { category: "IPHONE 12", heading: "iPhone 12 : Design premium et 5G 📱" },
    { category: "IPHONE 13", heading: "iPhone 13 : Performance et autonomie exceptionnelles 📱" },
    { category: "IPHONE 14", heading: "iPhone 14 : Innovation et sécurité renforcées 📱" },
    { category: "IPHONE 15", heading: "iPhone 15 : Le dernier cri de la technologie Apple 📱" },
    { category: "SMARTPHONES", heading: "Large gamme de smartphones de qualité 📱" },
    { category: "STOCK SCELLÉ CANADA DISPONIBLE 🇨🇦", heading: "Produits scellés garantis d'origine canadienne 🇨🇦" },
    { category: "IPHONE PROMAX", heading: "iPhone Pro Max : puissance et grand écran 📱" },
    { category: "SAMSUNG", heading: "Smartphones Samsung innovants et polyvalents 📱" },
    { category: "PIXEL", heading: "Google Pixel : l'expérience Android pure" },
    { category: "REDMI", heading: "Smartphones Redmi : performance à prix abordable" },
    { category: "HUAWEI", heading: "Huawei : technologie avancée et photographie mobile" },
    { category: "GADGETS ÉLECTRONIQUES", heading: "Accessoires high-tech et innovations électroniques ⚡" },
    { category: "APPLE WATCH", heading: "Montres connectées Apple Watch ⌚" },
    { category: "ACCESSOIRES", heading: "Accessoires indispensables pour vos appareils" }
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
