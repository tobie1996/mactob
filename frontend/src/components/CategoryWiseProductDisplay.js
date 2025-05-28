import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import { FaStar, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const generateRandomStars = () => Math.floor(Math.random() * 5) + 1;

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data.map(product => ({ ...product, rating: generateRandomStars() })));
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className='container mx-auto px-4 my-12 relative'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>{heading}</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {loading ? (
                    new Array(itemsPerPage).fill(null).map((_, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                            <div className='bg-gray-100 h-64 animate-pulse'></div>
                            <div className='p-4 space-y-3'>
                                <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                                <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
                                <div className='h-8 bg-gray-200 rounded animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    selectedProducts.map((product) => {
                        const whatsappMessage = `Bonjour, je suis intéressé par le produit ${product?.productName} (${displayINRCurrency(product?.sellingPrice)}). Pouvez-vous m'en dire plus ?`;
                        const phoneNumber = '+237696926972';

                        return (
                            <div 
                                key={product?._id} 
                                className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg'
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

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white shadow-lg rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Précédent
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white shadow-lg rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
