// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4 mb-6 text-gray-700">Page Not Found</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
