import React from 'react';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Benefits from '../components/Benefits';
import Title from '../components/Title';
import Banner from '../components/BannerProduct';

const Home = () => {
  const products = [
    { category: "IPHONE 15", heading: "iPhone 15 : Le dernier cri de la technologie Apple 📱" },
    { category: "IPHONE 14", heading: "iPhone 14 : Innovation et sécurité renforcées 📱" },
    { category: "IPHONE 13", heading: "iPhone 13 : Performance et autonomie exceptionnelles 📱" },
    { category: "IPHONE 12", heading: "iPhone 12 : Design premium et 5G 📱" },
    { category: "IPHONE 11", heading: "iPhone 11 : Photographie révolutionnaire 📱" },
    { category: "IPHONE XR", heading: "iPhone XR : Expérience premium à prix accessible 📱" },
    { category: "IPHONE 8", heading: "iPhone 8 : Équilibre parfait entre puissance et prix 📱" },
    { category: "STOCK SCELLÉ CANADA DISPONIBLE 🇨🇦", heading: "Produits scellés garantis d'origine canadienne 🇨🇦" },
    { category: "SMARTPHONES", heading: "Large gamme de smartphones de qualité 📱" },
    { category: "IPHONE PROMAX", heading: "iPhone Pro Max : puissance et grand écran 📱" },
    { category: "SAMSUNG", heading: "Smartphones Samsung innovants et polyvalents 📱" },
    { category: "PIXEL", heading: "Google Pixel : l'expérience Android pure" },
    { category: "REDMI", heading: "Smartphones Redmi : performance à prix abordable" },
    { category: "HUAWEI", heading: "Huawei : technologie avancée et photographie mobile" },
    { category: "GADGETS ÉLECTRONIQUES", heading: "Accessoires high-tech et innovations électroniques ⚡" },
    { category: "APPLE WATCH", heading: "Montres connectées Apple Watch ⌚" },
    { category: "ACCESSOIRES", heading: "Accessoires indispensables pour vos appareils" }
  ];

  return (
    <div>
      <Banner />
      <Title />
      
      {products.length > 0 ? (
        products.map((product, index) => (
          <VerticalCardProduct key={index} category={product.category} heading={product.heading} />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8 font-semibold">
          Aucun produit disponible pour le moment.
        </div>
      )}
    </div>
  );
};

export default Home;
