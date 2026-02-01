import React, { useState } from 'react'
import Titlenback from '../components/titlenback'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import SendIcon from '@mui/icons-material/Send';

export default function SupportCenter() {
    const [openIndex, setOpenIndex] = useState(null);
    
    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


const faqData = [
  {
    question: "What is your return policy?",
    answer: "You can return most items within 30 days of delivery for a full refund or exchange..."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3–7 business days within Nigeria..."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently we only ship within Nigeria..."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email and SMS..."
  }
];

  return (
    <div className='support-center'>
        <Titlenback title="Support Center" />
        <div className='flex alc g-40 w-full rounded-sm bg-white p-20 terms'>
            <LibraryBooksOutlinedIcon />
            <p>Terms of Use and Privacy Policy</p>
        </div>
        <div className='flex flex-col g-40 w-full rounded-sm bg-white p-20 '>
            <p>Contact Us for Support</p>
            <div className='flex flex-col g-10'>
                <div className='flex alc justsb contact-item p-10 rounded-sm'>
                    <div className='flex alc g-40'>
                        <div className='call'>
                            <img src="/images/call.png" alt="" />
                        </div>
                        <p>Helpline</p>
                    </div>
                    <div className='btn call-btn'>
                        <p>Call Now</p>
                    </div>
                </div>
                <div className='flex alc justsb contact-item p-10 rounded-sm'>
                    <div className='flex alc g-40'>
                        <div className='whatsapp'>
                            <img src="/images/whatsapp.png" alt="" />
                        </div>
                        <p>Whatsapp Support</p>
                    </div>
                    <div className='btn send1-btn'>
                        <p>Send Now</p>
                    </div>
                </div>
                <div className='flex alc justsb contact-item p-10 rounded-sm'>
                    <div className='flex alc g-40'>
                        <div className='mail'>
                            <img src="/images/mail.png" alt="" />
                        </div>
                        <p>Gmail Support</p>
                    </div>
                    <div className='btn send2-btn'>
                        <p>Send Now</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='help flex flex-col g-20 mt-20'>
            <p>How can we help?</p>
            <form action="" className='flex w-full g-20'>
                <input type="text" placeholder='Send us a message in-app' className='w-full' />
                <div className='rounded-sm bg-white p-10 '>
                    <button  className='send-btn'>
                        <SendIcon className='white' />
                    </button>
                </div>
            </form>
        </div>
        <div className="flex flex-col g-20 mt-20">
            <p>Frequently Asked Questions</p>
            <div className="accordion flex flex-col g-10">
                {faqData.map((item, index) => (
                    <div
                    key={index}
                    className={`accordion-item ${openIndex === index ? 'active' : ''}`}
                    >
                    <button
                        className="accordion-header"
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`accordion-content-${index}`}
                    >
                        <span className="accordion-title">{item.question}</span>
                        <span className="accordion-icon">
                        {openIndex === index ? '−' : '+'}
                        </span>
                    </button>

                    <div
                        id={`accordion-content-${index}`}
                        className="accordion-content"
                        role="region"
                        aria-labelledby={`accordion-header-${index}`}
                    >
                        <div className="accordion-body">{item.answer}</div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
