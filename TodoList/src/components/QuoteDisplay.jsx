import React, { useEffect, useState } from 'react';
import axios from 'axios';


function QuoteDisplay() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                    headers: {
                        'X-Api-Key': 'WZaw2lYr3sr7/q/pjzXqhw==VR8iovkem2TSyEJT',
                    },
                });
                setQuote(response.data[0].quote);
                setAuthor(response.data[0].author)
            } catch (error) {
                console.log('Error');
            }
        };

        // Fetch the quote initially
        fetchQuote();

        // Set up the interval to fetch new quotes every 20 seconds
        const intervalId = setInterval(() => {
            fetchQuote();
        }, 20000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="h-28 font-semibold text-xl text-center font-playwright px-2">
                {quote && <div className='flex flex-col justify-center items-center w-full h-full'>
                    <div>{quote}</div>
                    {author && <div><span>~</span> <span>{author}</span></div>}
                </div> || (
                        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                            <div className="skeleton h-5 w-3/4"></div>
                            <div className="skeleton h-5 w-3/4"></div>
                            <div className="skeleton h-5 w-3/4"></div>
                        </div>
                    )}
            </div>

           
        </div>
    );
}

export default QuoteDisplay;
