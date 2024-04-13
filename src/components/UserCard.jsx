import React, { useEffect, useState } from 'react'
import instance from '../axios';
import {Link, useNavigate} from "react-router-dom";
import DeleteModal from './DeleteModal';

const UserCard = () => {
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await instance.get("/api/v1/user/all-users", { withCredentials: true });
                if (res.data.success) {
                    setUsers(res.data.user);
                    // console.log(res.data.user);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchUsers();
    }, [users]);
    return (
        <>
            <div className='container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-[58px]'>
                {users === null ? (navigate("/login")) : (users.map((user) => (
                    <div className="card card-side glass shadow-xl rounded-md h-[18rem] p-4 ">
                        <div className="card-body py-0 px-2">
                            <div className='w-full flex justify-center items-center'>
                            <div className="w-24 h-24">
                                <img src={user.image?.avatar} className='rounded-full w-full h-full'/>
                            </div>
                            </div>
                            <h2 className="card-title">{user.fullName}</h2>
                            <ul>
                                <li>
                                    Role: {user.role}
                                </li>
                                <li>
                                    Email: {user.email}
                                </li>
                                <li>
                                    Joined: {user.createdAt.slice(0, 10)}
                                </li>
                            </ul>
                            <div className="card-actions flex items-end gap-5 h-full">
                                <Link className=' flex items-center' to={`/admin/edit-user/${user._id}`}>
                                <span className="material-symbols-outlined hover:text-green-500">
                                    edit_square
                                </span>
                                </Link>
                                <DeleteModal id={user._id}/>
                            </div>
                        </div>
                    </div>
                )))}
            </div>
        </>
    )
}

export default UserCard