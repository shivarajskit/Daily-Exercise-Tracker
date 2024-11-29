import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../utils/axios';
import { jwtDecode } from 'jwt-decode'; 
import Navbar from '../components/Navbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [chartData, setChartData] = useState({});

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id || 'user_id_placeholder'; // Replace with decoded user ID

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get(`/api/exercises`, { params: { userId } });
        const data = res.data;

        // Aggregate data by day
        const aggregated = data.reduce((acc, log) => {
          const day = new Date(log.date).toDateString();
          acc[day] = (acc[day] || 0) + log.exercises.reduce((sum, ex) => sum + parseFloat(ex.duration), 0);
          return acc;
        }, {});

        // Prepare chart data
        setChartData({
          labels: Object.keys(aggregated),
          datasets: [
            {
              label: 'Exercise Duration (mins)',
              data: Object.values(aggregated),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Weekly Analytics</h1>
        <div className="w-full md:w-1/2">
        {chartData.labels ? (
          <Bar key={JSON.stringify(chartData)} data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
