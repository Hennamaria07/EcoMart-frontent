import React from 'react'
import instance from '../axios';
import { toast } from 'react-toastify';

const CategoryModal = ({id}) => {
    const handleDelete = async () => {
        try {
          const res = await instance.delete(`/api/v1/category/delete/${id}`, { withCredentials: true });
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error)
        }
      }
      const handleCloseModal = () => {
        document.getElementById(`modal_${id}`).close();
      };
  return (
    <section>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    <span className="material-symbols-outlined absolute top-2 right-2 bg-base-100 rounded-full cursor-pointer" onClick={() => document.getElementById(`modal_${id}`).showModal()}>
      close
    </span>
    <dialog id={`modal_${id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">"Are you sure you want to delete this category?"</h3>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className='flex gap-5'>
            <button className="btn"  onClick={handleCloseModal}>No</button>
            <button className="btn" onClick={handleDelete}>Yes</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </section>
  )
}

export default CategoryModal