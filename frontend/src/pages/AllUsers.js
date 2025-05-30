import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const token = localStorage.getItem("token");
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Gestion des Utilisateurs</h2>
            
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50 border-b border-gray-200'>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>#</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Nom</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Email</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Rôle</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {allUser.map((el, index) => (
                                <tr key={el._id} className='hover:bg-gray-50 transition-colors duration-200'>
                                    <td className='px-6 py-4 text-sm text-gray-600'>{index + 1}</td>
                                    <td className='px-6 py-4 text-sm text-gray-800 font-medium'>{el?.name}</td>
                                    <td className='px-6 py-4 text-sm text-gray-600'>{el?.email}</td>
                                    <td className='px-6 py-4 text-sm'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            el?.role === 'ADMIN' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {el?.role}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-sm'>
                                        <button 
                                            className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)
                                            }}
                                        >
                                            <MdModeEdit className='text-xl' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    )
}

export default AllUsers