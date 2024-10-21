import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-6xl font-bold">404 - Not Found</h1>
            <p className="text-2xl mt-4">Oops! The page you are looking for does not exist.</p>
            <Link to="/auth/login" className="mt-6 text-blue-500 hover:underline">
                Go back
            </Link>
        </div>
    );
};

export default NotFound;
