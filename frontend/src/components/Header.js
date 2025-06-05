import React, { useContext, useRef, useState, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser, FaUserCheck } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { Menu, X } from "lucide-react";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("token");
        dispatch(setUserDetails(null));
        navigate("/");
        setIsMobileMenuOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    setIsSearching(value.length > 0);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed w-full z-50 top-0 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-white">Dimi</span>
              <span className="text-orange-500">Business</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                onChange={handleSearch}
                value={search}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <GrSearch className="hover:text-orange-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-orange-500 transition-colors duration-300">Accueil</Link>
            <Link to="/product" className="text-white hover:text-orange-500 transition-colors duration-300">Articles</Link>
            <Link to="/about" className="text-white hover:text-orange-500 transition-colors duration-300">À Propos</Link>
            <Link to="/contact" className="text-white hover:text-orange-500 transition-colors duration-300">Contact</Link>
            
            {/* Cart Icon */}
            {user?._id && (
              <Link to="/cart" className="relative text-white hover:text-orange-500 transition-colors duration-300">
                <TiShoppingCart size={24} />
                {context?.cartProductCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>
            )}
            
            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user?._id ? (
                <>
                  <div className="relative" ref={menuRef}>
                    <button 
                      onClick={() => setMenuDisplay(!menuDisplay)}
                      className="flex items-center space-x-1 focus:outline-none hover:text-orange-500 transition-colors duration-300"
                    >
                      {user?.profilePic ? (
                        <img 
                          src={user?.profilePic} 
                          className="w-8 h-8 rounded-full object-cover border-2 border-orange-500" 
                          alt={user?.name}
                        />
                      ) : (
                        <FaRegCircleUser size={20} className="text-white hover:text-orange-500" />
                      )}
                    </button>
                    
                    {menuDisplay && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-300 ease-in-out">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <p className="font-medium">Bonjour, {user?.name}</p>
                        </div>
                        {user?.role === ROLE.ADMIN && (
                          <Link 
                            to="/admin-panel/all-products" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                            onClick={() => setMenuDisplay(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                        >
                          Déconnexion
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  Connexion
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button - Moved to right */}
          <button
            className="md:hidden text-white focus:outline-none hover:text-orange-500 transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search Bar (shown only when not in mobile menu) */}
        {!isMobileMenuOpen && (
          <div className="md:hidden py-2 px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                onChange={handleSearch}
                value={search}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <GrSearch className="hover:text-orange-500 transition-colors" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseMobileMenu}
          className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors duration-300 focus:outline-none"
          aria-label="Fermer le menu"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col h-full pt-20 px-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white text-xl py-2 border-b border-gray-800 hover:text-orange-500 transition-colors duration-300"
              onClick={handleCloseMobileMenu}
            >
              Accueil
            </Link>
            <Link 
              to="/product" 
              className="text-white text-xl py-2 border-b border-gray-800 hover:text-orange-500 transition-colors duration-300"
              onClick={handleCloseMobileMenu}
            >
              Articles
            </Link>
            <Link 
              to="/about" 
              className="text-white text-xl py-2 border-b border-gray-800 hover:text-orange-500 transition-colors duration-300"
              onClick={handleCloseMobileMenu}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="text-white text-xl py-2 border-b border-gray-800 hover:text-orange-500 transition-colors duration-300"
              onClick={handleCloseMobileMenu}
            >
              Contact
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            {user?._id ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  {user?.profilePic ? (
                    <img 
                      src={user?.profilePic} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-500" 
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser size={24} className="text-white" />
                  )}
                  <span className="text-white">{user?.name}</span>
                </div>
                
                <Link 
                  to="/cart" 
                  className="flex items-center text-white hover:text-orange-500 transition-colors duration-300"
                  onClick={handleCloseMobileMenu}
                >
                  <TiShoppingCart size={24} className="mr-2" />
                  Panier
                  {context?.cartProductCount > 0 && (
                    <span className="ml-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                      {context?.cartProductCount}
                    </span>
                  )}
                </Link>
                
                {user?.role === ROLE.ADMIN && (
                  <Link 
                    to="/admin-panel/all-products" 
                    className="text-white hover:text-orange-500 transition-colors duration-300"
                    onClick={handleCloseMobileMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-orange-500 text-left transition-colors duration-300"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-md transition-all duration-300 transform hover:scale-105"
                onClick={handleCloseMobileMenu}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;