import React from 'react';
import faq from "../data/faqData.js"

const Accordion = () => {
    return (
        <div className='grid gap-5'>
            {faq?.map((item) => (
                <div key={item.id} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    {item.question}
                </div>
                <div className="collapse-content">
                    <p>{item.answer}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Accordion