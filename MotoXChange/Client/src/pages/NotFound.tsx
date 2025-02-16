import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <Card className="shadow-xl rounded-xl max-w-md text-center p-8">
                <CardContent>
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-muted-foreground mb-6">Oops! The page you are looking for does not exist.</p>
                    <Button asChild>
                        <Link to="/login">Go to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;
