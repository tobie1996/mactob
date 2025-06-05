import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const AdminProductCard = ({ data, fetchdata, isSuperAdmin }) => {
  const [editProduct, setEditProduct] = useState(false);
  const user = useSelector(state => state?.user?.user);

  const deleteProducts = async (id) => {
    try {
      // Vérifier si l'utilisateur a le droit de supprimer ce produit
      if (!isSuperAdmin && data.userId !== user._id) {
        toast.error("Vous n'avez pas la permission de supprimer ce produit");
        return;
      }

      const body = JSON.stringify({ _id: id });

      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json',
        },
        body: body
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchdata();
      } else {
        console.error(responseData.message);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du produit:", err.message);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
      <div className='relative'>
        <img 
          src={data?.productImage[0]} 
          alt="Product" 
          className='w-full h-48 object-cover'
        />
        <div className='absolute top-2 right-2 flex gap-2'>
          <button 
            onClick={() => setEditProduct(true)}
            className='p-2 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-200'
          >
            <MdModeEditOutline className='text-xl' />
          </button>
          <button 
            onClick={() => deleteProducts(data._id)}
            className='p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-all duration-200'
          >
            <MdDelete className='text-xl' />
          </button>
        </div>
        {isSuperAdmin && (
          <div className='absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
            {data.userId === user._id ? 'Votre produit' : 'Produit d\'un autre admin'}
          </div>
        )}
      </div>
      
      <div className='p-4'>
        <h3 className='font-semibold text-gray-800 text-lg mb-2 line-clamp-2'>
          {data.productName}
        </h3>
        <div className='flex items-center justify-between'>
          <p className='text-blue-600 font-bold text-lg'>
            {displayINRCurrency(data.sellingPrice)}
          </p>
          {data.price > data.sellingPrice && (
            <p className='text-gray-500 line-through text-sm'>
              {displayINRCurrency(data.price)}
            </p>
          )}
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct 
          productData={data} 
          onClose={() => setEditProduct(false)} 
          fetchdata={fetchdata}
          isSuperAdmin={isSuperAdmin}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
