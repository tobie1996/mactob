import React, { useState, useEffect } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata,
  isSuperAdmin
}) => {
  const user = useSelector(state => state?.user?.user);
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    quantity: productData?.quantity
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  useEffect(() => {
    // Vérifier si l'utilisateur a le droit de modifier ce produit
    if (!isSuperAdmin && productData.userId !== user._id) {
      toast.error("Vous n'avez pas la permission de modifier ce produit");
      onClose();
    }
  }, [isSuperAdmin, productData.userId, user._id, onClose]);

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({
      ...preve,
      [name]: value
    }))
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve) => ({
      ...preve,
      productImage: [...preve.productImage, uploadImageCloudinary.url]
    }))
  }

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)
    setData((preve) => ({
      ...preve,
      productImage: [...newProductImage]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          _id: productData._id,
          ...data
        })
      })

      const responseData = await response.json()

      if (responseData.success) {
        toast.success(responseData?.message)
        fetchdata()
        onClose()
      } else {
        toast.error(responseData?.message || "Erreur lors de la mise à jour du produit")
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du produit")
      console.error(error)
    }
  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='bg-white p-4 rounded-lg w-full max-w-2xl'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Modifier le produit</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoClose />
          </div>
        </div>

        <form className='grid p-4 gap-3' onSubmit={handleSubmit}>
          <div className='grid gap-2'>
            <label htmlFor='productName'>Nom du produit</label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='brandName'>Marque</label>
            <input
              type='text'
              id='brandName'
              name='brandName'
              value={data.brandName}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='category'>Catégorie</label>
            <input
              type='text'
              id='category'
              name='category'
              value={data.category}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='price'>Prix</label>
            <input
              type='number'
              id='price'
              name='price'
              value={data.price}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='sellingPrice'>Prix de vente</label>
            <input
              type='number'
              id='sellingPrice'
              name='sellingPrice'
              value={data.sellingPrice}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='quantity'>Quantité</label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              value={data.quantity}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>

          <div className='grid gap-2'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={data.description}
              onChange={handleOnChange}
              className='w-full p-2 border rounded-md'
              rows={4}
              required
            />
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
                        setOpenFullScreenImage(true)
                        setFullScreenImage(el)
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

          <div className='flex justify-end gap-3 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border rounded-md hover:bg-gray-100'
            >
              Annuler
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  )
}

export default AdminEditProduct