import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const user = useSelector(state => state?.user?.user);

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
        if (user?.role === 'SUPERADMIN') {
          // SUPERADMIN voit tous les produits
          setAllProduct(dataResponse.data || []);
        } else if (user?.role === 'ADMIN') {
          // ADMIN ne voit que ses propres produits
          const filteredProducts = dataResponse.data.filter(product => product.userId === userId);
          setAllProduct(filteredProducts || []);
        }
      } else {
        toast.error(dataResponse.message || "Erreur lors de la récupération des produits");
      }

    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      toast.error("Erreur lors de la récupération des produits");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [user?.role]);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Gestion des Produits</h2>
          <p className='text-sm text-gray-600 mt-1'>
            {user?.role === 'SUPERADMIN' 
              ? 'Vue complète de tous les produits' 
              : 'Vue de vos produits uniquement'}
          </p>
        </div>
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
            isSuperAdmin={user?.role === 'SUPERADMIN'}
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
