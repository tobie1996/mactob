import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import { FaStar, FaRegStar, FaWhatsapp } from 'react-icons/fa';

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
        setData(categoryProduct?.data.map(product => ({ ...product, stars: generateRandomStars() })));
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
        <div className='container relative md:left-28 left-auto mt-10 font-semibold'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
                {loading ? (
                    new Array(itemsPerPage).fill(null).map((_, index) => (
                        <div key={index} className='w-full min-w-[140px] md:min-w-[320px] max-w-[140px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-1'>
                                <h2 className='animate-pulse bg-slate-200 p-2 rounded-full'></h2>
                            </div>
                        </div>
                    ))
                ) : (
                    selectedProducts.map((product) => {
                        const message = `Salut, puis-je avoir plus d'informations sur le produit ${product?.productName} coûtant ${displayINRCurrency(product?.price)} ?`;

                        return (
                            <div key={product?._id} className="w-full min-w-[140px] md:min-w-[320px] max-w-[140px] md:max-w-[320px] bg-white rounded-sm shadow font-semibold">
                                <Link to={`/product/${product?._id}`} onClick={scrollTop}>
                                    <div className='bg-slate-200 h-48 p-4 flex justify-start'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt={product?.productName} />
                                    </div>
                                    <div className='p-4 flex justify-center items-center flex-col'>
                                        <h2 className='font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>

                                        {/* Affichage des étoiles */}
                                        <div className='flex'>
                                            {[...Array(5)].map((_, i) => (
                                                i < product.stars ? <FaStar key={i} className='text-yellow-500' /> : <FaRegStar key={i} className='text-gray-400' />
                                            ))}
                                        </div>
                                    </div>
                                </Link>

                                {/* Bouton WhatsApp placé en dehors du <Link> */}
                                <div className="p-4">
                                    <a 
                                        href={`https://api.whatsapp.com/send?phone=237696926972&text=${encodeURIComponent(message)}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center justify-center text-sm bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full transition-all"
                                    >
                                         <FaWhatsapp className='mr-2' /> Commander
                                    </a>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Précédent
                </button>
                <span className="px-3 py-1 mx-1 bg-blue-500 text-white rounded">
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
