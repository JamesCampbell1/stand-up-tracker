import React, { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState<any>(null);

    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setResponse(json);
            console.log(json);
            
            setIsLoading(false);
        }
        doFetch();
    }, []);

    return {
        isLoading,
        response
    }
};