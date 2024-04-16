import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import instance from '../axios';

const Modal = ({ question, productId }) => {
  // useEffect(() => {
  //   console.log('model---->', productId)
  // }, [productId])
  // console.log("url--->", url)
  const handleDelete = async () => {
    try {
      const res = await instance.delete(`/api/v1/product/delete/${productId}`, { withCredentials: true });
      if (res.data.success) {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseModal = () => {
    document.getElementById(`modal_${productId}`).close();
  };
  return (
    <section>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <span className="material-symbols-outlined absolute top-2 right-2 bg-base-100 rounded-full cursor-pointer" onClick={() => document.getElementById(`modal_${productId}`).showModal()}>
        close
      </span>
      <dialog id={`modal_${productId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{question}</h3>
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

export default Modal