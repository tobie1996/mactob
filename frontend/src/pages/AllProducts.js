import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split('.')[1]))._id;

    try {
      const response = await fetch(SummaryApi.allProduct.url, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const dataResponse = await response.json();

      if (response.ok) {
        const filteredProducts = dataResponse.data.filter(product => product.userId === userId);
        setAllProduct(filteredProducts || []);
      } else {
        toast.error(dataResponse.message || "Failed to fetch products");
      }

    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-gray-800'>Gestion des Produits</h2>
        <button
          className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md'
          onClick={() => setOpenUploadProduct(true)}>
          <FaPlus className='text-sm' />
          <span>Nouveau produit</span>
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {allProduct.map((product, index) => (
          <AdminProductCard 
            data={product} 
            key={index + "allProduct"} 
            fetchdata={fetchAllProduct} 
          />
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct 
          onClose={() => setOpenUploadProduct(false)} 
          fetchData={fetchAllProduct} 
        />
      )}
    </div>
  );
}

export default AllProducts;
