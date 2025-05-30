import React, { useContext } from 'react';
import { FaStar, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = Array.from({ length: 13 });
  const { fetchUserAddToCart } = useContext(Context);

  const renderStars = (rating) => (
    <div className='flex items-center gap-1'>
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
      <span className='text-xs text-gray-500 ml-1'>({rating})</span>
    </div>
  );

  const renderLoadingCard = (_, index) => (
    <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='bg-gray-100 h-64 animate-pulse'></div>
      <div className='p-4 space-y-3'>
        <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
        <div className='h-8 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  );

  const renderProductCard = (product, index) => {
    const rating = Math.floor(Math.random() * 5) + 1;
    const whatsappMessage = `Bonjour, je suis intéressé par le produit ${product?.productName} (${displayINRCurrency(product?.sellingPrice)}). Pouvez-vous m'en dire plus ?`;
    const phoneNumber = '+237658306477';

    return (
      <div 
        key={index} 
        className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg'
      >
        <Link to={`/product/${product?._id}`} onClick={scrollTop} className='block'>
          <div className='bg-gray-100 h-64 flex justify-center items-center p-4 relative group'>
            <img 
              src={product?.productImage[0]} 
              alt={product?.productName} 
              className='object-contain h-full w-full group-hover:opacity-90 transition-opacity'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all'></div>
          </div>
        </Link>

        <div className='p-4 space-y-3'>
          <div>
            <h3 className='font-semibold text-gray-800 truncate'>{product?.productName}</h3>
            <div className='flex items-center gap-2 mt-1'>
              <span className='font-bold text-lg text-red-600'>{displayINRCurrency(product?.sellingPrice)}</span>
              {product?.price > product?.sellingPrice && (
                <span className='text-sm text-gray-500 line-through'>{displayINRCurrency(product?.price)}</span>
              )}
            </div>
          </div>

          {renderStars(rating)}

          <div className='grid grid-cols-2 gap-2 mt-3'>
            <a
              href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors'
            >
              <FaWhatsapp className='text-base' />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors'
            >
              <FaPhoneAlt className='text-base' />
              <span>Appeler</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {loading ? loadingList.map(renderLoadingCard) : data.map(renderProductCard)}
    </div>
  );
};

export default VerticalCard;
