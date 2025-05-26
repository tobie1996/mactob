import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error(" les mots de passes ne correspondent pas")
        }

    }

    return (
        <section id='signup' className=" flex justify-center items-center bg-gray-50 font-semibold">
            <div className='mx-auto container p-4'>
                <div className='bg-white p-8 w-full max-w-md mx-auto shadow-lg rounded-lg'>
                    <div className='w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-gray-200'>
                        <img src={data.profilePic || loginIcons} alt='login icons' className="object-cover" />
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Importer photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <div className='bg-gray-100 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500'>
                                <input
                                    type='text'
                                    placeholder='Votre nom'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent text-gray-800' />
                            </div>
                        </div>

                        <div className='grid'>
                            <div className='bg-gray-100 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500'>
                                <input
                                    type='email'
                                    placeholder='Entrez votre adresse email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent text-gray-800' />
                            </div>
                        </div>

                        <div className='grid'>
                            <div className='bg-gray-100 p-3 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-blue-500'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Votre mot de passe'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent text-gray-800' />
                                <div className='cursor-pointer text-gray-500' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <div className='grid'>
                            <div className='bg-gray-100 p-3 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-blue-500'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirmer le mot de passe'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent text-gray-800' />
                                <div className='cursor-pointer text-gray-500' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <button
                            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out mt-6'>
                            S'inscrire
                        </button>
                    </form>

                    <p className='mt-5 text-center text-gray-600'>
                        Vous avez déjà un compte ? <Link to={"/login"} className='text-blue-600 hover:text-blue-700 hover:underline'>
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SignUp