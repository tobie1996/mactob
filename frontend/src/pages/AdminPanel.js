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
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='flex flex-col md:flex-row w-full min-h-screen'>
            <aside className='bg-gray-400 w-full md:w-1/4 lg:w-1/5 p-4 customShadow'>
                <div className='flex flex-col items-center'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mb-4'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-16 h-16 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold text-black'>{user?.name}</p>
                    <p className='text-sm text-black mb-4'>{user?.role}</p>
                </div>

                {/***navigation */}
                <nav className='flex flex-col gap-3'>
                    <Link to={"all-users"} className='px-2 py-1 hover:bg-green-900 hover:text-white flex items-center border border-green-950 text-black rounded-md'>
                        <FaUsers className='mr-2' />Clients
                    </Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:bg-green-900 hover:text-white flex items-center border border-green-950 text-black rounded-md'>
                        <BsCart4 className='mr-2' />Produits
                    </Link>
                </nav>
            </aside>

            <main className='w-full md:w-3/4 lg:w-4/5 p-4'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
