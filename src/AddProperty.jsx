import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import UseAuth from './components/routes/UseAuth';
import axios from 'axios';

const AddProperty = () => {
    const { user } = UseAuth();

    const handleAddProperty = async (event) => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const location = form.location.value;
        const description = form.description.value;
        const price = form.price.value;
        const propertyImage = form.propertyImage.files[0];
        const verificationStatus = 'Pending'; 
        const agentName = user ? user.displayName : '';
        const agentEmail = user ? user.email : '';
        const agentImage = user ? user.photoURL : '';
        
        const formData = new FormData();
        formData.append('image', propertyImage); 

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            const imageUrl = response.data.data.url; 

            const propertyData = {
                property_title: title,
                property_location: location,
                description: description,
                price_range: price,
                verification_status: verificationStatus,
                agent_name: agentName,
                agent_email: agentEmail,
                property_image: imageUrl, 
                agent_image: agentImage
            };

            const res = await fetch('https://real-estate-server-a12.vercel.app/property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(propertyData)
            });

            const data = await res.json();

            if (data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Property added successfully',
                    icon: 'success',
                    confirmButtonText: 'Great'
                });
                form.reset();
            }
        } catch (error) {
            console.error('Error adding property:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add property',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className='container  font mx-auto'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h1 className="text-3xl font-semibold mb-4 text-black text-center">Add Property</h1>
            <section className="p-6 bg-center bg-cover  bg-[url('https://images.unsplash.com/photo-1695278255455-9afc87008775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  dark:text-gray-900">
                <form onSubmit={handleAddProperty} noValidate="" action="" className="container flex flex-col mx-auto bg-opacity-30 backdrop-blur-lg p-8 space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2  text-[#d2ad5f] col-span-full lg:col-span-1">
                            <p className="font-medium text-2xl">Property Information</p>
                            <p className="text-1xl">Add your property details here.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <label htmlFor="property_title" className="text-sm  text-[#d2ad5f]">Property Title</label>
                                <input id="property_title" name='title' type="text" placeholder="Property Title" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="location" className="text-sm  text-[#d2ad5f]">Property Location</label>
                                <input id="location" name='location' type="text" placeholder="Property Location" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full  text-[#d2ad5f]">
                                <label htmlFor="property_image" className="text-sm  text-[#d2ad5f]">Property Image</label>
                                <input id="property_image" name='propertyImage' type="file" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm  text-[#d2ad5f]">Description</label>
                                <textarea id="description" name='description' placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required ></textarea>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="price" className="text-sm  text-[#d2ad5f]">Price Range</label>
                                <input id="price" name='price' type="text" placeholder="Price Range" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="agent_name" className="text-sm  text-[#d2ad5f]">Agent Name</label>
                                <input id="agent_name" name='agentName' type="text" readOnly value={user ? user.displayName : ''} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="agent_email" className="text-sm  text-[#d2ad5f]">Agent Email</label>
                                <input id="agent_email" name='agentEmail' type="email" readOnly value={user ? user.email : ''} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" required />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="agent_image" className="text-sm  text-[#d2ad5f]">Agent Image</label>
                                <input id="agent_image" name='agentImage' type="url" value={user ? user.photoURL : ''} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" readOnly/>
                            </div>
                            <div className="col-span-full">
                                <button type="submit" className="btn btn-block text-[#d2ad5f] rounded-md bg-black border-white">Add Property</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default AddProperty;
