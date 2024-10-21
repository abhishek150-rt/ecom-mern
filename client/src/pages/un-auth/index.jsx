import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/shopping/home");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-6xl font-bold">403 - Unauthorized</h1>
            <p className="text-2xl mt-4">You do not have permission to access this page.</p>
            <div className="mt-6">
                <Button
                    onClick={handleBack}
                    className="mr-4  hover:underline"
                >
                    Go Back
                </Button>

            </div>
        </div>
    );
};

export default Unauthorized;
