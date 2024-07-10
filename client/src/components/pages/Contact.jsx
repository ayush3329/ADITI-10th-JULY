import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import signu from "../../assets/images/signup.gif";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    email: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <>
      
      <div className="min-h-auto  flex items-center justify-center bg-[url('./assets/images/hero-bg.png')] bg-center bg-cover w-full">
        <div className="mt-14  max-w-md w-full shadow-lg rounded-lg p-8 border-y-2   border-blue-800 bg-[url('./assets/images/hero-bg.png')] ">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
              <input className="w-full px-3 py-2 border rounded-md" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
              <input className="w-full px-3 py-2 border rounded-md" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="message">Message</label>
              <textarea className="w-full px-3 py-2 border rounded-md" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
