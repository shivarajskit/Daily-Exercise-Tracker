import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';  
import { jwtDecode } from 'jwt-decode';  
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: '',
    category: '',
  });

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id || 'user_id_placeholder'; // Replace with decoded user ID

  // Fetch today's exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axiosInstance.get(`/api/exercises`, { params: { userId } });
        setExercises(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExercises();
  }, [userId]);

  // Handle form submission
  const handleAddExercise = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/api/exercises', {
        userId,
        date: new Date(),
        exercises: [newExercise],
      });
      setExercises((prevExercises) => [...prevExercises, newExercise]);
      setNewExercise({ name: '', duration: '', category: '' }); // Reset form
    } catch (err) {
      console.error(err);
      alert('Error adding exercise. Please try again.');
    }
  };

  // Handle exercise deletion
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await axiosInstance.delete(`/api/exercises/${exerciseId}`);
      setExercises((prevExercises) => prevExercises.filter((ex) => ex._id !== exerciseId));
    } catch (err) {
      console.error(err);
      alert('Error deleting exercise. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Exercise List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Today's Exercises</h2>
          {exercises.length > 0 ? (
            <ul className="mt-4">
              {exercises.map((exercise) => (
                <li key={exercise._id} className="mb-2 flex justify-between items-center">
                  <span className="font-bold">{exercise.exercises[0]?.name}</span> - {exercise.exercises[0]?.duration} mins ({exercise.exercises[0]?.category})
                  <button
                    onClick={() => handleDeleteExercise(exercise._id)}
                    className="text-red-500 ml-4 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No exercises logged for today.</p>
          )}
        </div>

        {/* Add Exercise Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Log New Exercise</h2>
          <form onSubmit={handleAddExercise} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Exercise Name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={newExercise.duration}
              onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
              className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={newExercise.category}
              onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
              className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Exercise
            </button>
          </form>
        </div>

        {/* History Link */}
        <div>
          <button
            onClick={() => (window.location.href = '/history')}
            className="text-blue-600 underline"
          >
            View Exercise History
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
