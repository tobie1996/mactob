import React, { useState } from 'react';
import { BsWhatsapp, BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMailOutline, MdOutlineSupportAgent } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Ajoutez ici votre logique d'abonnement
    alert(`Merci pour votre abonnement! ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne Logo et Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-white">Dimi</span>
                <span className="text-orange-500">Business</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Votre destination premium pour les appareils électroniques et accessoires high-tech.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="https://facebook.com" 
                target="_blank"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </Link>
              <Link 
                to="https://twitter.com" 
                target="_blank"
                className="bg-gray-700 hover:bg-black p-2 rounded-full transition-colors"
              >
                <BsTwitterX className="w-4 h-4" />
              </Link>
              <Link 
                to="https://instagram.com" 
                target="_blank"
                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
              >
                <BsInstagram className="w-4 h-4" />
              </Link>
              <Link 
                to="https://wa.me/237658306477" 
                target="_blank"
                className="bg-gray-700 hover:bg-green-500 p-2 rounded-full transition-colors"
              >
                <BsWhatsapp className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Colonne Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors">Accueil</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-orange-500 transition-colors">Boutique</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-orange-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Colonne Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <IoCall className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Service client</p>
                  <a href="tel:+237658306477" className="hover:text-orange-500 transition-colors">+237 658 30 64 77</a>
                </div>
              </li>
              <li className="flex items-start">
                <MdOutlineMailOutline className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a href="mailto:Pekadimitri@icloud.com" className="hover:text-orange-500 transition-colors">Pekadimitri@icloud.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Adresse</p>
                  <p>123 Avenue Tech, Yaoundé, Cameroun</p>
                </div>
              </li>
              <li className="flex items-start">
                <MdOutlineSupportAgent className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Support</p>
                  <p>24/7</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Colonne Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Abonnez-vous pour recevoir nos offres spéciales et actualités.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors"
              >
                S'abonner
              </button>
            </form>
            <div className="mt-4 flex items-center space-x-2">
              <img src="/path/to/payment-methods.png" alt="Méthodes de paiement" className="h-8" />
            </div>
          </div>
        </div>

        {/* Copyright et Mentions légales */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} <span className="text-white">Dimi</span><span className="text-orange-500">Business</span>. Tous droits réservés.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Confidentialité</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Conditions</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;