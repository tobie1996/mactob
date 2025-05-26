import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split('.')[1]))._id; // Decode token to get userId

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
        // Filter products by userId
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
    <div>
      <div className='bg-black py-2 px-4 flex justify-between items-center left-20'>
        <h2 className='font-bold text-lg text-center text-white'>Produits</h2>
        <button
          className='border-2 w-40 border-white text-white hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}>Nouveau produit</button>
      </div>

      {/** all product */}
      <div className='flex items-center justify-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            );
          })
        }
      </div>

      {/** upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
    </div>
  );
}

export default AllProducts;
