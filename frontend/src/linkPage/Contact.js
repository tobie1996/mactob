import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: 'Téléphone',
      content: 'Appelez-nous au (+237)658 30 64 77',
      Link: 'tel:+237658306477',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: 'Email',
      content: 'Envoyez-nous un email à Pekadimitri@icloud.com',
      Link: 'mailto:Pekadimitri@icloud.com',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <FaWhatsapp className="text-3xl" />,
      title: 'WhatsApp',
      content: 'Écrivez-nous au (+237)658 30 64 77',
      Link: 'https://api.whatsapp.com/send?phone=237658306477&text=Bonjour%2C%20je%20souhaite%20plus%20d%27informations%20sur%20vos%20produits.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: 'Adresse',
      content: 'Yaoundé, Cameroun, quartier Maképé',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: <MdOutlineSupportAgent className="text-3xl" />,
      title: 'Heures de Support',
      content: 'Lundi-Vendredi: 8h-18h\nSamedi: 9h-14h',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contactez <span className="text-orange-500">Dimi Business</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nous sommes là pour vous aider ! Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos achats.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className={`${method.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-700 whitespace-pre-line">{method.content}</p>
                {method.link && (
                  <a 
                    href={method.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-white rounded-md text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Nous contacter
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Objet de votre message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre message ici..."
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
                  >
                    <FaPaperPlane className="mr-2" />
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.490637355191!2d11.51886061475763!3d3.866863197237725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcdee5d2e7c3f%3A0x1b1b1b1b1b1b1b1b!2sYaound%C3%A9%2C%20Cameroun!5e0!3m2!1sfr!2sus!4v1620000000000!5m2!1sfr!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy"
                  className="min-h-[400px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Questions fréquentes</h2>
        <div className="space-y-4">
          {[
            { question: "Quels sont vos horaires d'ouverture ?", answer: "Nous sommes ouverts du lundi au vendredi de 8h à 18h, et le samedi de 9h à 14h." },
            { question: "Quels modes de paiement acceptez-vous ?", answer: "Nous acceptons les paiements en espèces, par mobile money, et par virement bancaire." },
            { question: "Quelle est votre politique de retour ?", answer: "Nous acceptons les retours sous 7 jours pour les produits non ouverts et en parfait état." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;