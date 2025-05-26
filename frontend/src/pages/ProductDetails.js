import { Helmet } from 'react-helmet';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { RiWhatsappFill } from "react-icons/ri";
import { PiPhoneCallFill } from 'react-icons/pi';
import { FaRegStar, FaStar, FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon } from 'react-share';
import { IoIosArrowForward } from 'react-icons/io';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    userId: ""
  });
  
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const [rating, setRating] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    });
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
    setRating(Math.floor(Math.random() * 5) + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
    setZoomImage(true);
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const shareUrl = window.location.href;

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      {/* Open Graph meta tags */}
      <Helmet>
        <title>{data.productName ? `${data.productName} - ${data.brandName}` : "Détails du produit"}</title>
        <meta property="og:title" content={data.productName} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={activeImage || 'url_image_defaut'} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumb */}
      <div className='flex items-center text-sm text-gray-500 mb-6'>
        <Link to="/" className='hover:text-blue-600'>Accueil</Link>
        <IoIosArrowForward className='mx-2' />
        <Link to="/products" className='hover:text-blue-600'>Produits</Link>
        <IoIosArrowForward className='mx-2' />
        <span className='text-gray-700'>{data.productName}</span>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Product Images */}
        <div className='flex flex-col lg:flex-row-reverse gap-4 w-full lg:w-1/2'>
          {/* Main Image */}
          <div 
            className='relative h-96 w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg'
            onMouseMove={handleZoomImage}
            onMouseLeave={handleLeaveImageZoom}
          >
            {loading ? (
              <div className='animate-pulse bg-gray-200 w-full h-full'></div>
            ) : (
              <>
                <img 
                  src={activeImage} 
                  className='w-full h-full object-contain p-4'
                  alt={data.productName}
                />
                {/* Zoom Image */}
                {zoomImage && (
                  <div className='hidden lg:block absolute inset-0 pointer-events-none'>
                    <div 
                      className='absolute w-full h-full bg-contain bg-no-repeat'
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                        transform: 'scale(2)',
                        transformOrigin: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className='flex lg:flex-col gap-2 overflow-x-auto scrollbar-thin'>
            {loading ? (
              Array(4).fill(null).map((_, index) => (
                <div key={`loading-${index}`} className='flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg animate-pulse'></div>
              ))
            ) : (
              data?.productImage?.map((imgURL, index) => (
                <button
                  key={imgURL}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden p-1 border-2 ${activeImage === imgURL ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => handleMouseEnterProduct(imgURL)}
                >
                  <img 
                    src={imgURL} 
                    className='w-full h-full object-contain'
                    alt={`Vue ${index + 1} de ${data.productName}`}
                  />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className='w-full lg:w-1/2'>
          {loading ? (
            <div className='space-y-4'>
              <div className='h-6 w-32 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-8 w-full bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-6 w-48 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-12 w-full bg-gray-200 rounded animate-pulse'></div>
              <div className='h-12 w-full bg-gray-200 rounded animate-pulse'></div>
              <div className='h-24 w-full bg-gray-200 rounded animate-pulse'></div>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Brand */}
              <span className='inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                {data.brandName}
              </span>

              {/* Title */}
              <h1 className='text-3xl font-bold text-gray-900'>{data.productName}</h1>

              {/* Category */}
              <p className='text-gray-500 capitalize'>{data.category}</p>

              {/* Rating */}
              <div className='flex items-center gap-2'>
                <div className='flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  ))}
                </div>
                <span className='text-sm text-gray-500'>({rating}/5)</span>
              </div>

              {/* Price */}
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-red-600'>
                  {displayINRCurrency(data.sellingPrice)}
                </span>
                {data.price > data.sellingPrice && (
                  <span className='text-xl text-gray-400 line-through'>
                    {displayINRCurrency(data.price)}
                  </span>
                )}
                {data.price > data.sellingPrice && (
                  <span className='px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded'>
                    {Math.round((1 - data.sellingPrice/data.price) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Link
                  to={`https://wa.me/237696926972?text=Bonjour, je suis intéressé par le produit ${encodeURIComponent(data.productName)} (${displayINRCurrency(data.sellingPrice)})`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg'
                >
                  <RiWhatsappFill className='text-xl' />
                  <span>Commander via WhatsApp</span>
                </Link>

                <Link
                  to='tel:+237696926972'
                  className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg'
                >
                  <PiPhoneCallFill className='text-xl' />
                  <span>Appeler maintenant</span>
                </Link>
              </div>

              {/* Description */}
              <div className='pt-6 border-t border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>Description</h3>
                <p className='text-gray-700 whitespace-pre-line'>{data.description}</p>
              </div>

              {/* Share Options */}
              <div className='relative pt-4'>
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'
                >
                  <FaShareAlt />
                  <span>Partager ce produit</span>
                </button>
                
                {showShareOptions && (
                  <div className='absolute left-0 mt-2 flex gap-3 bg-white p-3 rounded-lg shadow-lg z-10 border border-gray-200'>
                    <FacebookShareButton
                      url={shareUrl}
                      quote={`Découvrez ${data.productName} sur notre boutique`}
                      hashtag="#Shopping"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    
                    <WhatsappShareButton
                      url={shareUrl}
                      title={`Regardez ce produit: ${data.productName} - ${displayINRCurrency(data.sellingPrice)}`}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {data.category && (
        <div className='mt-16'>
          <CategroyWiseProductDisplay 
            category={data.category} 
            heading="Produits similaires" 
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;