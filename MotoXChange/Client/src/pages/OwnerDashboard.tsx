import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../components/ui/button.tsx';

function OwnerDashboard() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all queries
    const fetchQueries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/query/fetch');
            setQueries(response.data); // Store all queries
        } catch (error) {
            toast.error('Failed to fetch queries');
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    // Handle resolving a query
    const handleResolve = async (id: String) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/query/${id}/resolve`);
            toast.success('Query resolved successfully');
            fetchQueries(); // Refresh queries
        } catch (error) {
            toast.error('Error resolving query');
        } finally {
            setLoading(false);
        }
    };

    // Segregate queries based on status
    const pendingQueries = queries.filter(query => query.status === 'pending');
    const resolvedQueries = queries.filter(query => query.status === 'resolved');

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Owner Dashboard</h1>

            {/* Pending Queries Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Pending Queries</h2>
                {pendingQueries.length === 0 ? (
                    <p className="text-gray-500">No pending queries.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingQueries.map((query) => (
                            <div key={query._id} className="p-4 border rounded-lg shadow">
                                <p><strong>Name:</strong> {query.name}</p>
                                <p><strong>Email:</strong> {query.email}</p>
                                <p><strong>Message:</strong> {query.message}</p>
                                <Button 
                                    onClick={() => handleResolve(query._id)} 
                                    disabled={loading} 
                                    className="mt-2 bg-green-500 hover:bg-green-600"
                                >
                                    {loading ? 'Resolving...' : 'Resolve'}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Resolved Queries Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Resolved Queries</h2>
                {resolvedQueries.length === 0 ? (
                    <p className="text-gray-500">No resolved queries.</p>
                ) : (
                    <div className="space-y-4">
                        {resolvedQueries.map((query) => (
                            <div key={query._id} className="p-4 border rounded-lg shadow bg-gray-100">
                                <p><strong>Name:</strong> {query.name}</p>
                                <p><strong>Email:</strong> {query.email}</p>
                                <p><strong>Message:</strong> {query.message}</p>
                                <p className="text-green-600"><strong>Status:</strong> Resolved</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default OwnerDashboard;
