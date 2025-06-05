import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight, FaWhatsapp, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import { FaStar } from 'react-icons/fa';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef(null);
    const { fetchUserAddToCart } = useContext(Context);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        const updatedProducts = categoryProduct?.data?.map(product => ({
            ...product,
            rating: Math.floor(Math.random() * 5) + 1
        })) || [];
        setData(updatedProducts);
        setLoading(false);
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const checkScroll = () => {
        if (scrollElement.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scrollRight = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 500);
        }
    };

    const scrollLeft = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 500);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollElement.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => scrollContainer.removeEventListener('scroll', checkScroll);
        }
    }, [data]);

    return (
        <div className='container mx-auto px-4 my-12 relative'>
            {data.length > 0 && (
                <>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>{heading}</h2>
                        <div className='flex gap-2'>
                            {showLeftArrow && (
                                <button 
                                    onClick={scrollLeft}
                                    className='bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors fixed left-4 top-1/2 transform -translate-y-1/2 z-10'
                                    aria-label="Scroll left"
                                >
                                    <FaAngleLeft className='text-gray-600' />
                                </button>
                            )}
                            {showRightArrow && (
                                <button 
                                    onClick={scrollRight}
                                    className='bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors fixed right-4 top-1/2 transform -translate-y-1/2 z-10'
                                    aria-label="Scroll right"
                                >
                                    <FaAngleRight className='text-gray-600' />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='relative'>
                        <div 
                            className='flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4'
                            ref={scrollElement}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {loading ? (
                                loadingList.map((_, index) => (
                                    <div key={index} className='min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center'>
                                        <div className='bg-gray-100 h-64 animate-pulse'></div>
                                        <div className='p-4 space-y-3'>
                                            <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                                            <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
                                            <div className='h-8 bg-gray-200 rounded animate-pulse'></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                data.map((product) => {
                                    const whatsappMessage = `Bonjour, je suis intéressé par le produit ${product?.productName} (${displayINRCurrency(product?.sellingPrice)}). Pouvez-vous m'en dire plus ?`;
                                    const phoneNumber = '+237658306477';

                                    return (
                                        <div 
                                            key={product?._id} 
                                            className='min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden snap-center transition-transform hover:scale-[1.02] hover:shadow-lg'
                                        >
                                            <Link to={`/product/${product?._id}`} onClick={scrollTop} className='block'>
                                                <div className='bg-gray-100 h-64 flex justify-center items-center p-4 relative group'>
                                                    <img 
                                                        src={product.productImage[0]} 
                                                        className='object-contain h-full w-full group-hover:opacity-90 transition-opacity' 
                                                        alt={product?.productName}
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

                                                <div className='flex items-center gap-1'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar 
                                                            key={i} 
                                                            className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                                        />
                                                    ))}
                                                    <span className='text-xs text-gray-500 ml-1'>({product.rating})</span>
                                                </div>

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
                                })
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default VerticalCardProduct;