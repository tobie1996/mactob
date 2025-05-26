import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import {BsWhatsapp } from "react-icons/bs";
import { FaPrint } from "react-icons/fa";



const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)
    const [printed, setPrinted] = useState(false);

    useEffect(() => {
        setPrinted(false);
    }, []);

    function printPage() {
        setPrinted(true);
        window.print();
    }




    const fetchData = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
        })


        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }


    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    const increaseQty = async (id, qty) => {
        const token = localStorage.getItem("token");
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            fetchData()
        }
    }


    const decraseQty = async (id, qty) => {
        const token = localStorage.getItem("token");
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const token = localStorage.getItem("token");
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    const generateOrderMessage = () => {
        let message = '🛒 *NOUVELLE COMMANDE$* 🛒 %0A%0A';
        data.forEach((product, index) => {
            message += `Produit ${index + 1}:%0A`;
            message += `${product?.productId?.productName}%0A`;
            message += `Quantité: ${product.quantity}%0A`;
            message += `Prix: ${product?.productId?.sellingPrice} FCFA%0A%0A`;
        });
        message += `*Total Quantité: ${totalQty} unités*%0A`;
        message += `*Total: ${totalPrice} FCFA* 🚚%0A`;
        message += `Mme / M. Votre commande a été bien reçue ,%0A`;
        message += `🙏 Merci pour votre confiance !%0A%0A`;

        return message;
    };

    const whatsappUrl = `https://api.whatsapp.com/send?phone=237658306477&text=${generateOrderMessage()}`;


    return (
        <div className='container mx-auto'>

            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>Pas de produits</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Commander  Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/**delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-blue-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-green-950  font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border  bg-blue-600  hover:bg-blue-400 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border  bg-blue-600 -400 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-56 bg-white'>
                                <h2 className='text-white bg-blue-600 px-4 py-1'>Sommation</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantité</p>
                                    <p className="text-red-700">{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 mb-4'>
                                    <p>Prix Total</p>
                                    <p className='text-blue-800'>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                {/*
                                    <div className='text-center'>
                                        <span className='text-red-800'>NB:</span>
                                        <span className='text-blue-700'> Veillez imprimer ensuite commendez</span>
                                    </div>
                                    */}

                                <div className='gap-9'>
                                    <button
                                        className='h-14 w-full bg-slate-600 flex justify-center items-center relative top-6 bottom-1 gap-1'>
                                        <FaPrint className='w-10 h-10 ' onClick={printPage} />
                                        <span className='text-white'>imprimer</span>
                                    </button>
                                    <div className='bg-green-800 p-4 flex justify-center items-center mt-10 mb-10 text-center'>
                                        <Link to={whatsappUrl} target='_blank' rel="noreferrer" className='flex text-center items-center transition-all hover:bg-green-950 text-white w-full h-full rounded'>
                                            <BsWhatsapp className='w-6 h-6 mr-2 transform hover:scale-110 transition duration-300 cursor-pointer' />
                                            <p className='text-white ml-10'>Commander sur WhatsApp</p>
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Cart