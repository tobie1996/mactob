import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const deleteProducts = async (id) => {
    try {
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
      console.error("Error deleting product:", err.message);
    }
  };

  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-2'>
        <div className='w-full'>
          <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} alt="Product" className='mx-auto object-contain h-full' />
          </div>
          <h1 className='truncate line-clamp-2'>{data.productName.slice(0, 10)}</h1>
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-semibold'>
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div className='flex sm:hidden justify-end'>
            <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
              <MdModeEditOutline />
            </div>
            <div className='w-fit ml-auto p-2 bg-red-100 hover:bg-red-700 rounded-full hover:text-white cursor-pointer' onClick={() => deleteProducts(data._id)}>
              <MdDelete />
            </div>
          </div>
        </div>
        <div className='hidden sm:flex justify-end'>
          <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
            <MdModeEditOutline />
          </div>
          <div className='w-fit ml-auto p-2 bg-red-100 hover:bg-red-700 rounded-full hover:text-white cursor-pointer' onClick={() => deleteProducts(data._id)}>
            <MdDelete />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )}
    </div>
  );
};

export default AdminProductCard;
