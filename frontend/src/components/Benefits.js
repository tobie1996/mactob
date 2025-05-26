import React from 'react';
import { FaShippingFast, FaMobileAlt, FaLaptop, FaHeadphones } from 'react-icons/fa';

const Benefits = () => {
    const benefits = [
        {
            icon: <FaShippingFast className="text-5xl text-blue-600" />,
            title: 'Frais de livraison',
            description: 'Pour toutes les villes à partir de 1000 à 10.000 XAF',
        },
    ];

    const products = [
        {
            icon: <FaMobileAlt className="text-5xl text-blue-500" />,
            title: 'Smartphones',
            description: 'Découvrez les dernières innovations en matière de téléphonie mobile.',
        },
        {
            icon: <FaLaptop className="text-5xl text-green-500" />,
            title: 'Ordinateurs portables',
            description: 'Des ordinateurs performants pour le travail et les loisirs.',
        },
        {
            icon: <FaHeadphones className="text-5xl text-purple-500" />,
            title: 'Accessoires audio',
            description: 'Profitez d’une qualité sonore exceptionnelle.',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
            {/* Bannière publicitaire */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-10 text-center">
                <h1 className="text-5xl font-extrabold tracking-wide mb-3">
                    
                </h1>
                <p className="text-lg font-normal opacity-90">
                    
                </p>
            </div>

            {/* Section avantages */}
            <div className="flex flex-col items-center justify-center py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-6">
                        Nos <span className="text-blue-600">Avantages</span>
                    </h2>
                    <p className="text-lg font-normal text-gray-600 max-w-2xl mx-auto">
                        Profitez de services exclusifs et d’une expérience d’achat améliorée.
                    </p>
                </div>
            </div>

            {/* Section produits électroniques */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-8">
                        Découvrez nos <span className="text-green-500">Produits Électroniques</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center bg-gray-100 p-10 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                            >
                                <div className="mb-6">{product.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-800 tracking-wide mb-3">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600 font-normal">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Appel à l'action */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-10 text-center">
                <h3 className="text-3xl font-extrabold tracking-wide mb-3">Ne manquez pas nos offres spéciales !</h3>
                <p className="text-lg font-normal opacity-90 max-w-xl mx-auto">
                    Visitez notre boutique en ligne dès aujourd'hui et trouvez le produit qui vous convient.
                </p>
            </div>
        </div>
    );
};

export default Benefits;
