import { useEffect , useState } from 'react';
import call from '../assets/call.png';
import email from '../assets/email.png';
import location from '../assets/location.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';

import Aos from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    return (
        <div id='contactUs' data-aos="fade-up" className="bg-gradient-to-b from-gradient-b0e0e6 via-gradient-9cc7cd to-gradient-759599 bg-opacity-70 w-full flex-none md:flex lg:flex pt-32 p-10 justify-center">
            {/* Left Side - Contact Information */}
            <div className="flex flex-col lg:h-[545px] justify-center bg-gradient-to-r from-cyan-600 to-cyan-800 p-6 rounded-l-md">
                <div className="space-y-10 mb-12">
                    <h3 className="text-white text-[30px] font-black text-center lg:text-left">
                        Get in touch
                    </h3>
                    <div className='flex gap-x-6 w-[300px]'>
                        <img src={location} className='w-[11%] h-[11%] mt-2'></img>
                        <div>
                            <p className="text-white font-semibold">Location:</p>
                            <p className="text-white">Magway no22 .......</p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 w-[300px]'>
                        <img src={email} className='w-[11%] h-[11%] mt-2'></img>
                        <div>
                            <p className="text-white font-semibold">Email Us:</p>
                            <p className="text-white">info@example.com</p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 w-[300px]'>
                        <img src={call} className='w-[11%] h-[11%] mt-2'></img>
                        <div>
                            <p className="text-white font-semibold">Call Us:</p>
                            <p className="text-white">09-11111111</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className="border-t border-gray-300 mb-5"></div>
                    <p className='text-white font-semibold mb-5 w-[300px]' >Follow our social media</p>
                    <div className="flex gap-x-6 w-[300px]">
                        <img src={facebook} className='w-[12%] h-[12%]'></img>
                        <img src={instagram} className='w-[12%] h-[12%]'></img>
                        <img src={twitter} className='w-[12%] h-[12%]'></img>
                    </div>
                </div>
            </div>
            <div className="bg-[#FFFFFF] rounded-r-md lg:w-[500px] w-auto h-auto py-5 px-5 flex flex-col lg:flex-row items-center justify-center">
                {/* Right Side - Input Fields */}
                <div className="w-full lg:w-[400px]">
                    <h3 className="text-black text-[30px] mb-8 font-black text-center">
                        Send us a message
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* Contact Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        // onChange={handleChange}
                                        className="w-full h-[40px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                            {/* Contact Company */}
                            <div>
                                <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
                                    Company
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        // onChange={handleChange}
                                        className="w-full h-[40px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* Contact Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm/6 font-semibold text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        // onChange={handleChange}
                                        className="w-full h-[40px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                            {/* Contact Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        // onChange={handleChange}
                                        className="w-full h-[40px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Contact Subject */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                            <div>
                                <label htmlFor="subject" className="block text-sm/6 font-semibold text-gray-900">
                                    Subject
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        // onChange={handleChange}
                                        className="w-full h-[40px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Contact Message */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                            <div>
                                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="message"
                                        value={formData.message}
                                        // onChange={handleChange}
                                        className="w-full h-[60px] px-4 rounded-md bg-[#D9D9D9] text-gray-950 text-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        // onClick={handleSignup}
                        className="w-full h-[40px] rounded-lg mt-6 text-[20px] border-[3px] bg-gradient-to-r from-cyan-600 to-cyan-800 text-[#ffffff] hover:bg-[#34adb8] flex justify-center items-center">
                        Send
                    </button>

                </div>
            </div>
        </div>
    );


}

export default ContactUs;