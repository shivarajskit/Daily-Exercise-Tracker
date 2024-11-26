import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Daily Exercise Tracker</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gray-200 text-blue-600 px-4 py-2 rounded hover:bg-white"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-100">
        <div className="container mx-auto flex space-x-6 py-3 px-6">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate('/analytics')}
          >
            Analytics
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate('/history')}
          >
            History
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-12 px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Daily Exercise Tracker
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Track your daily exercises, analyze your progress, and stay healthy!
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gray-200 text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        <div className="container mx-auto py-6 px-6">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Daily Exercise Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
