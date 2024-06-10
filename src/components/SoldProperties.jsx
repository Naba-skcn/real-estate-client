import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UseAuth from './routes/UseAuth';

const SoldProperties = () => {
  const [sold, setSold] = useState([]);
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);
  const { user } = UseAuth();

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await axios.get(`https://real-estate-server-a12.vercel.app/sold-properties/${user.email}`);
        setSold(response.data);
      } catch (error) {
        console.error('Error fetching sold properties:', error);
      }
    };

    const fetchTotalSoldAmount = async () => {
      try {
        const response = await axios.get(`https://real-estate-server-a12.vercel.app/total-sold-amount/${user.email}`);
        setTotalSoldAmount(response.data.totalSoldAmount);
      } catch (error) {
        console.error('Error fetching total sold amount:', error);
      }
    };

    fetchSoldProperties();
    fetchTotalSoldAmount();
  }, [user]);

  return (
    <div className="container mx-auto font mt-10">
        <style>
            {`
            @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

            .font {
                font-family: 'PT Serif', serif;
            }`}
        </style>
      <h2 className="text-2xl font-bold mb-5">Sold Properties</h2>
      <div className='bg-black text-[#d2ad5f]'>Total Property Sold Amount: ${totalSoldAmount}</div>
      <div className="overflow-x-auto">
        <table className="min-w-full mt-2 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyer Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sold.map(property => (
              <tr key={property._id}>
                <td className="px-6 py-4 whitespace-nowrap">{property.propertyTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.propertyLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.buyerEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.buyerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.offerAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldProperties;
