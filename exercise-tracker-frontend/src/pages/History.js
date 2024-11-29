import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axiosInstance from '../utils/axios';
import 'react-calendar/dist/Calendar.css';
import { jwtDecode } from 'jwt-decode'; 
import Navbar from '../components/Navbar';

const History = () => {
  const [date, setDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id || 'user_id_placeholder'; // Replace with decoded user ID

  // Fetch exercises for a selected date
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axiosInstance.get(`/api/exercises`, {
          params: { userId, date },
        });
        // Flatten exercises and set them
        // const allExercises = res.data.reduce((acc, record) => {
        //   return [...acc, ...record.exercises];
        // }, []);
        setExercises(res.data); // Set flattened exercises array
      } catch (err) {
        console.error(err);
      }
    };

    fetchExercises();
  }, [userId, date]);

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exercise History</h1>

      {/* Calendar */}
      <div className="mb-6">
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Exercises for Selected Date */}
      <div>
        <h2 className="text-xl font-semibold">Exercises on {date.toDateString()}</h2>
        {exercises.length > 0 ? (
          <ul className="mt-4">
            {exercises.map((exercise) => (
              <li key={exercise._id} className="mb-2">
                <span className="font-bold">{exercise.exercises[0]?.name}</span> - {exercise.exercises[0]?.duration} mins ({exercise.exercises[0]?.category})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No exercises logged for this day.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default History;