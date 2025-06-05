import { FaRegBuilding, FaTruck, FaExchangeAlt, FaHistory, FaStar, FaUsers, FaShieldAlt } from 'react-icons/fa';

const AboutPage = () => {
  const features = [
    {
      icon: <FaRegBuilding className="text-4xl" />,
      title: "Notre Histoire",
      description: "Fondé en 2020, Dimi Business est né de la passion pour la technologie et du désir d'offrir des produits électroniques de qualité supérieure avec un service client exceptionnel.",
      color: "text-blue-400"
    },
    {
      icon: <FaTruck className="text-4xl" />,
      title: "Livraison Internationale",
      description: "Notre réseau logistique nous permet de vous proposer une livraison rapide et sécurisée, même pour les commandes internationales.",
      color: "text-green-400"
    },
    {
      icon: <FaExchangeAlt className="text-4xl" />,
      title: "Échange de Produits",
      description: "Nous facilitons les échanges pour vous garantir une totale satisfaction. Votre bonheur est notre priorité.",
      color: "text-yellow-400"
    },
    {
      icon: <FaHistory className="text-4xl" />,
      title: "Notre Engagement",
      description: "Depuis notre création, nous mettons un point d'honneur à satisfaire nos clients avec des produits de qualité et un SAV réactif.",
      color: "text-purple-400"
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Qualité Garantie",
      description: "Tous nos produits sont rigoureusement sélectionnés et testés pour répondre à nos standards de qualité élevés.",
      color: "text-amber-400"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Service Client",
      description: "Notre équipe dédiée est disponible pour répondre à toutes vos questions et vous accompagner dans vos achats.",
      color: "text-cyan-400"
    }
  ];

  const stats = [
    { value: "1000+", label: "Clients satisfaits" },
    { value: "500+", label: "Produits disponibles" },
    { value: "24h", label: "Support réactif" },
    { value: "3 ans", label: "D'expérience" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            À propos de <span className="text-orange-500">Dimi Business</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Depuis 2020, Dimi Business s'engage à fournir les meilleurs produits électroniques et services à ses clients.
            Basé à Yaoundé, nous offrons une gamme complète de produits électroniques de qualité.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir Dimi Business ?</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`${feature.color} mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="/about.jpg" 
                alt="Notre équipe" 
                className="rounded-xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chez Dimi Business, nous croyons que la technologie devrait être accessible à tous. Notre mission est de fournir des produits électroniques de haute qualité à des prix compétitifs, accompagnés d'un service client exceptionnel.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaShieldAlt className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Garantie sur tous nos produits</p>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Équipe dédiée à votre satisfaction</p>
                </div>
                <div className="flex items-start">
                  <FaStar className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Produits rigoureusement sélectionnés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;