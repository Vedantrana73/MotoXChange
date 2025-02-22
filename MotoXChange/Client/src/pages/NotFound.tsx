import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";

const NotFound: React.FC = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Card className="shadow-2xl rounded-2xl max-w-md text-center p-8">
                <CardContent>
                    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                        Oops! The page you are looking for does not exist.
                    </p>
                    <Button asChild className="px-6 py-2 text-lg font-medium">
                        <Link to="/login">Go to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;
