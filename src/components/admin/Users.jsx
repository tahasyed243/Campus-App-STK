import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import useGetAllUsers from '@/hooks/useGetAllUsers';
import Footer from '../shared/Footer';
import UserTable from './Usertable';

const Users = () => {
    useGetAllUsers();
    const [input, setInput] = useState("");

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <UserTable />
            </div>
            <Footer />
        </div>
    )
}

export default Users;
