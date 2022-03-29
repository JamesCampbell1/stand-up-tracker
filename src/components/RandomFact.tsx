import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export const RandomFact = () => {
    const { isLoading, response } = useFetch('https://uselessfacts.jsph.pl/random.json?language=en');

    if (isLoading) {
        return null;
    } else {
        return (
            <div className="random-fact-container">
                <strong>💡 Random Fact: </strong>
                <span>{response.text}</span>
            </div>
        );
    }
};