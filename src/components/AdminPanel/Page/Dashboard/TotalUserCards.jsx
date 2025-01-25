import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import downArrow from '../../../../assets/downArrow.png'; // Assuming this path is correct

const TotalUserCards = () => {
  const [userData, setUserData] = useState({ totalUsers: 0, percentageChange: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/userStats'); // Adjust the endpoint
        const { totalUsers, percentageChange } = response.data; // Adjust fields according to your API response
        setUserData({ totalUsers, percentageChange });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const formatNumber = (number) => {
    return number >= 1000 ? (number / 1000).toFixed(2) + ' K' : number;
  };

  return (
    <div className='rounded-lg border w-72 h-20 mt-3 shadow-md'>
      <div className='flex justify-center items-center pt-3 p-2'>
        <div>
          <p className='font-bold text-2xl'>{formatNumber(userData.totalUsers)}</p>
          <div className='flex'>
            <p>Total Users</p>
            <p
              className={`pl-1.5 ${
                userData.percentageChange < 0 ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {userData.percentageChange} %
            </p>
          </div>
        </div>
        <div className='pl-8'>
          <img className='w-12' src={downArrow} alt='Trend Arrow' />
        </div>
      </div>
    </div>
  );
};

export default TotalUserCards;
