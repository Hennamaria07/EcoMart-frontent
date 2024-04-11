import React from 'react'
import instance from '../axios';
import {toast} from 'react-toastify';

const DeleteModal = ({ id }) => {
    const handleDelete = async () => {
       try {
         const res = await instance.delete(`/api/v1/user/delete/${id}`, {withCredentials: true});
         if(res.data.success) {
             toast.success(res.data.message);
         }
       } catch (error) {
        toast.error(error.response.data.message)
       }
    }
    return (
        <section className='flex items-center'>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500" onClick={() => document.getElementById('my_modal_1').showModal()}>
                delete
            </span>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-2">Are you sure you want to delete this User?</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className='flex gap-5'>
                            <button className="btn">No, cancel</button>
                            <button className="btn" onClick={handleDelete}>"Yes, I'm sure"</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default DeleteModal