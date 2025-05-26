import React, { useContext } from 'react';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = Array.from({ length: 13 });
  const { fetchUserAddToCart } = useContext(Context);

  const renderStars = (rating) => (
    <div className='flex gap-1 text-yellow-500 justify-center'>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'} />
      ))}
    </div>
  );

  const renderLoadingCard = (_, index) => (
    <div key={index} className='flex flex-col items-center bg-white rounded-lg shadow-lg min-w-[280px] md:min-w-[200px] overflow-hidden animate-pulse'>
      <div className='bg-slate-200 h-48 w-full'></div>
      <div className='p-4 w-full grid gap-3'>
        <div className='bg-slate-200 h-6 rounded-full'></div>
        <div className='bg-slate-200 h-4 rounded-full'></div>
        <div className='flex gap-3'>
          <div className='bg-slate-200 h-6 w-full rounded-full'></div>
          <div className='bg-slate-200 h-6 w-full rounded-full'></div>
        </div>
        <div className='bg-slate-200 h-10 w-full rounded-full'></div>
      </div>
    </div>
  );

  const renderProductCard = (product, index) => {
    const rating = Math.floor(Math.random() * 5) + 1;
    const message = `Salut, puis-je avoir plus d'informations sur le produit ${product?.productName} coûtant ${displayINRCurrency(product?.price)} ?`;

    return (
      <div key={index} className='flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105'>
        <Link to={`/product/${product?._id}`} onClick={scrollTop} className='block'>
          <div className='bg-slate-200 h-48 flex justify-center items-center'>
            <img src={product?.productImage[0]} alt={product?.productName} className='object-contain h-full w-full transition-transform hover:scale-110' />
          </div>
        </Link>
        <div className='p-4 text-center'>
          <h2 className='font-semibold text-lg text-black truncate'>{product?.productName}</h2>
          <div className='flex justify-center gap-2 my-2'>
            <p className='text-red-600 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
          </div>
          {renderStars(rating)}
        </div>
        <a
          href={`https://api.whatsapp.com/send?phone=237696926972&text=${encodeURIComponent(message)}`}
          target='_blank'
          rel='noreferrer'
          className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 m-4'
        >
          <FaWhatsapp /> Commander
        </a>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-6 overflow-x-scroll scrollbar-none'>
      {loading ? loadingList.map(renderLoadingCard) : data.map(renderProductCard)}
    </div>
  );
};

export default VerticalCard;
