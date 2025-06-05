import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const UploadProduct = ({ onClose, fetchData }) => {
  const user = useSelector(state => state?.user?.user);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    userId: "",
    status: "active"
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setData(prev => ({ ...prev, userId }));
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Veuillez sélectionner un fichier valide.");
      return;
    }

    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData(prev => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }));
    } catch (error) {
      toast.error("Erreur lors de l'upload de l'image.");
      console.error(error);
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData(prev => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Erreur d'authentification, veuillez vous reconnecter.");
      return;
    }

    if (Number(data.sellingPrice) >= Number(data.price)) {
      toast.error("Le prix de vente doit être inférieur au prix original");
      return;
    }

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du produit.");
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
        <div className='flex justify-between items-center p-4 bg-gray-50 border-b'>
          <h2 className='text-xl font-semibold text-gray-800'>Nouveau produit</h2>
          <button 
            onClick={onClose}
            className='p-2 hover:bg-gray-200 rounded-full transition-colors duration-200'
          >
            <CgClose className='text-2xl text-gray-600' />
          </button>
        </div>

        <form className='p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>Titre</label>
            <input
              type='text'
              id='productName'
              placeholder='Entrez le nom du produit'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='brandName' className='block text-sm font-medium text-gray-700'>Marque</label>
            <input
              type='text'
              id='brandName'
              placeholder='Entrez la marque'
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Catégorie</label>
            <select
              required
              value={data.category}
              name='category'
              onChange={handleOnChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value="">Sélectionner</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Images</label>
            <label htmlFor='uploadImageInput' className='block'>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer'>
                <div className='flex flex-col items-center gap-2'>
                  <FaCloudUploadAlt className='text-4xl text-gray-400' />
                  <p className='text-sm text-gray-600'>Cliquez pour sélectionner des images</p>
                  <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                </div>
              </div>
            </label>

            {data?.productImage.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
                {data.productImage.map((el, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={el}
                      alt={el}
                      className='w-full h-24 object-cover rounded-lg cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      type='button'
                      className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-red-600 mt-2'>*Veuillez sélectionner au moins une image</p>
            )}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Ancien prix</label>
              <input
                type='number'
                id='price'
                placeholder='Entrez le prix'
                value={data.price}
                name='price'
                onChange={handleOnChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                required
                min="0"
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700'>Nouveau prix</label>
              <input
                type='number'
                id='sellingPrice'
                placeholder='Entrez le prix de vente'
                value={data.sellingPrice}
                name='sellingPrice'
                onChange={handleOnChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                required
                min="0"
              />
            </div>
          </div>

          {user?.role === 'SUPERADMIN' && (
            <div className='space-y-2'>
              <label htmlFor='status' className='block text-sm font-medium text-gray-700'>Statut du produit</label>
              <select
                id='status'
                name='status'
                value={data.status}
                onChange={handleOnChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="featured">En vedette</option>
              </select>
            </div>
          )}

          <div className='space-y-2'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea
              id='description'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
              placeholder='Entrez la description du produit'
              rows={4}
              onChange={handleOnChange}
              name='description'
              value={data.description}
              required
            />
          </div>

          <div className='flex justify-end gap-4 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'
            >
              Annuler
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
