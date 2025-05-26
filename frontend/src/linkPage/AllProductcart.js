import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';
import { FaWhatsapp } from 'react-icons/fa';


const VerticalCardProduct = ({ category, heading }) => {
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

        console.log("horizontal data", categoryProduct.data);
        setData(categoryProduct?.data || []);
    };

    const checkBoundary = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current;
        if (scrollLeft === 0) {
            scrollElement.current.scrollLeft = scrollWidth - clientWidth;
        } else if (scrollLeft + clientWidth >= scrollWidth) {
            scrollElement.current.scrollLeft = 1;
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    useEffect(() => {
        const handleScroll = () => checkBoundary();

        if (scrollElement.current) {
            scrollElement.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollElement.current) {
                scrollElement.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
        checkBoundary();
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
        checkBoundary();
    };

    return (
        <div className='container mx-auto px-4 my-6 relative font-semibold'>
            {data.length > 0 && (
                <>
                    <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
                    <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                            <FaAngleRight />
                        </button>

                        {loading ? (
                            loadingList.map((_, index) => (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            data.map((product) => (
                                <NavLink key={product?._id} to={"" + product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' onClick={scrollTop} />
                                    </div>
                                    <div className='p-4 grid gap-1' onClick={scrollTop}>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-1'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button 
                                        className='flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white px-3 py-0.5 rounded-full'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                        <FaWhatsapp size={16} />
                                        Commander
                                        </button>
                                    </div>
                                </NavLink>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default VerticalCardProduct;
