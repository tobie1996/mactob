import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { FaUsers } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user.role !== ROLE.ADMIN && user.role !== 'SUPERADMIN')) {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    if (!user || (user.role !== ROLE.ADMIN && user.role !== 'SUPERADMIN')) {
        return null;
    }

    return (
        <div className='flex flex-col md:flex-row w-full min-h-screen bg-gray-50'>
            <aside className='bg-white w-full md:w-1/4 lg:w-1/5 p-6 shadow-lg'>
                <div className='flex flex-col items-center border-b border-gray-200 pb-6'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mb-4'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full object-cover border-4 border-blue-500' alt={user?.name} />
                        ) : (
                            <div className='w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center'>
                                <FaRegCircleUser className='text-4xl text-blue-500' />
                            </div>
                        )}
                    </div>
                    <p className='capitalize text-xl font-bold text-gray-800'>{user?.name}</p>
                    <p className='text-sm text-blue-600 font-medium mb-4'>{user?.role}</p>
                </div>

                <nav className='flex flex-col gap-4 mt-6'>
                    <Link to={"all-users"} className='px-4 py-3 hover:bg-blue-50 hover:text-blue-600 flex items-center text-gray-700 rounded-lg transition-all duration-200'>
                        <FaUsers className='mr-3 text-xl' />
                        <span className='font-medium'>Clients</span>
                    </Link>
                    <Link to={"all-products"} className='px-4 py-3 hover:bg-blue-50 hover:text-blue-600 flex items-center text-gray-700 rounded-lg transition-all duration-200'>
                        <BsCart4 className='mr-3 text-xl' />
                        <span className='font-medium'>Produits</span>
                    </Link>
                </nav>
            </aside>

            <main className='w-full md:w-3/4 lg:w-4/5 p-8 bg-gray-50'>
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
