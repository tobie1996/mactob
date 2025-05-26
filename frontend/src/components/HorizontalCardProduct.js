import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import { FaWhatsapp } from 'react-icons/fa';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        if (categoryProduct?.data) {
            const updatedData = categoryProduct.data.map(product => ({
                ...product,
                rating: Math.floor(Math.random() * 5) + 1 // Attribution aléatoire des étoiles (1 à 5)
            }));
            setData(updatedData);
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative font-semibold'>
            {data.length > 0 && (
                <>
                    <h3 className='text-2xl font-semibold py-4 text-yellow-700'>{heading}</h3>
                    <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-50' onClick={scrollLeft}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block z-50' onClick={scrollRight}>
                            <FaAngleRight />
                        </button>

                        {loading ? (
                            loadingList.map((_, index) => (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h3 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h3>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            data.map((product) => {
                                const message = `Salut, puis-je avoir plus d'informations sur le produit ${product?.productName} coûtant ${displayINRCurrency(product?.price)} ?`;

                                return (
                                    <div key={product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                        <Link to={'product/' + product?._id} className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]' onClick={scrollTop}>
                                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                                        </Link>

                                        <div className='p-4 grid'>
                                            <Link to={'product/' + product?._id} onClick={scrollTop}>
                                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                            </Link>
                                            <div className='flex gap-3'>
                                                <p className='text-red-600 font-medium text-[10px]'>{displayINRCurrency(product?.sellingPrice)}</p>
                                                <p className='text-slate-500 line-through text-[10px]'>{displayINRCurrency(product?.price)}</p>
                                            </div>
                                            <div className='flex text-yellow-500'>
                                                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                                            </div>
                                            <a 
                                                href={`https://api.whatsapp.com/send?phone=237696926972&text=${encodeURIComponent(message)}`}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='flex items-center justify-center text-sm bg-gradient-to-r from-green-600 to-green-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full'>
                                                <FaWhatsapp className='mr-2' /> Commander
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default HorizontalCardProduct;