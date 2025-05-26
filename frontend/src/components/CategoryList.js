import React, { useEffect, useState, useRef } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef(null);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // Fonction qui gère le scroll infini sans dupliquer les catégories
    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            const scrollWidth = scrollContainer.scrollWidth;
            const containerWidth = scrollContainer.clientWidth;
            const maxScrollLeft = scrollWidth - containerWidth;

            const offset = 200;

            // Si on approche de la fin, on remet au début
            if (scrollContainer.scrollLeft > maxScrollLeft - offset) {
                scrollContainer.scrollLeft = scrollContainer.scrollLeft - maxScrollLeft / 3;
            }

            // Si on approche du début, on remet vers la fin
            if (scrollContainer.scrollLeft < offset) {
                scrollContainer.scrollLeft = maxScrollLeft / 3;
            }
        }
    };

    return (
        <div className='container mx-auto mt-2 mb-5 font-semibold'>
            <div
                className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'
                onScroll={handleScroll}
                ref={scrollContainerRef}
            >
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div
                            className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link
                            to={"/product-category?category=" + product?.category}
                            className='cursor-pointer'
                            key={index}
                        >
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.category}
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                />
                            </div>
                            <p className="text-center text-xs md:text-sm capitalize text-blue-950">
                                {product?.category?.slice(0, 10)}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
