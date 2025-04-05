"use client"
import React from 'react';
import ContactUs from './ContactUs';
import Image from 'next/image'; // Import the Image component
import { useEffect } from 'react';


function LandingPage() {

  useEffect(() => {
    async function fetchData() {

    }
    fetchData();
  }, []);


  return (
    <div className="bg-black-100 min-h-screen">
      <header className="bg-black shadow-md">
        <div className="container mx-auto py-6 px-4 flex items-center"> {/* Use flexbox for layout */}
          {/* Add the logo */}
          <Image
            src="/innovatexp_color_no_bg.svg" // Path to your logo in the public folder
            alt="InnovateXP Limited Logo"
            width={50} // Adjust width as needed
            height={50} // Adjust height as needed
            className="mr-4" // Add some margin to the right
          />
          <div>
            <h1 className="text-2xl font-bold text-white-800">InnovateXP Limited</h1>
            <p className="text-gray-600">Cutting-edge software solutions and expert IT consulting services.</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
      <section
          className="mb-12 text-center rounded-lg shadow-lg overflow-hidden" 
          style={{ backgroundImage: 'url(/4307506.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <div className="bg-black bg-opacity-60 text-white p-8 flex flex-col items-center"> 
              <div className="md:w-3/4 lg:w-1/2"> 
                <h2 className="text-4xl font-bold mb-4">Transform Your Business with InnovateXP</h2>
                <p className="text-lg mb-6">
                  Leverage our expertise in software development and IT consulting to achieve your goals. Let&apos;s build the future together.
                </p>
                <a href="#contact-us" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 inline-block">Contact Us</a>
              </div>
            </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white-800 mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Web Development Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">Web Development</h3>
            <p className="text-violet-200">Custom web applications tailored to your business needs.</p>
          </div>

          {/* Mobile App Development Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">Mobile App Development</h3>
            <p className="text-violet-200">Native and cross-platform mobile apps for iOS and Android.</p>
          </div>

          {/* Cloud Computing Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">Cloud Computing</h3>
            <p className="text-violet-200">Scalable and secure cloud solutions for your infrastructure.</p>
          </div>

          {/* Data Analytics Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">Data Analytics</h3>
            <p className="text-violet-200">Data-driven insights to improve your business performance.</p>
          </div>
        </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white-800 mb-4">About Us</h2>
          <p className="text-white-700 leading-relaxed">
            InnovateXP Limited is dedicated to empowering businesses through technology. We combine technical expertise with a deep understanding of business challenges to deliver innovative solutions that drive growth and efficiency.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-white-800 mb-4">Contact Us</h2>
          <ContactUs />
        </section>
      </main>
      <footer id="contact-us" className="bg-black-200 py-4 text-center">
        <p className="text-white-600">© 2025 InnovateXP Limited. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;