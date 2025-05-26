import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Création de l'élément script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];

    s1.async = true;
    s1.src = "https://embed.tawk.to/6707854202d78d1a30ef6264/1i9qm13rh";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    s0.parentNode.insertBefore(s1, s0);

    // Fonction de nettoyage pour retirer le script lorsque le composant est démonté
    return () => {
      if (s1 && s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []);

  return null; // Ce composant ne retourne rien visuellement
};

export default TawkToChat;
