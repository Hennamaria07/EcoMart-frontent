import React from 'react'
import instance from '../axios';
import { toast } from 'react-toastify';

const DeleteModal = ({ id }) => {
    // console.log(id);
    const handleDelete = async () => {
        try {
            const res = await instance.delete(`/api/v1/user/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleCloseModal = () => {
        document.getElementById(`modal_${id}`).close();
      };
    return (
        <section className='flex items-center'>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500" onClick={() => document.getElementById(`modal_${id}`).showModal()}>
                delete
            </span>
            <dialog id={`modal_${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delte this product?</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className='flex gap-5'>
                                <button className="btn" onClick={handleCloseModal}>No</button>
                                <button className="btn" onClick={handleDelete}>Yes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default DeleteModal