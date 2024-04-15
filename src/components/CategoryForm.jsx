import React from 'react'

const CategoryForm = () => {
    return (
        <section className="container pt-[58px]">

            <form action="" className='grid gap-5 glass py-10 px-5 rounded-lg sm:w-[50vw] lg:w-[40vw]'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow" placeholder="Daisy" />
                    </label>
                </div>
                <div>
                        <input type="file" className="file-input file-input-bordered w-full" />
                  
                </div>
                <button className="btn btn-accent">Add</button>
            </form>
        </section>
    )
}

export default CategoryForm