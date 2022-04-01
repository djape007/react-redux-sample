import React from 'react';
import { useCounter, increment } from '../../redux/counterAsObjectWithHook';

const DisplayCounter = () => {

    const counterAsObj = useCounter();

    const displaySingleCounter = (counterId, counterValue) => {
        return <p>
                <button onClick={() => increment(counterId)}>( + )</button>
                ID: {counterId} | {counterValue}
            </p>
    };

    return (
        <>
            <h3>All counters:</h3>
            <ul>
            {
                Object.keys(counterAsObj).map(counterId => {
                    return (
                        <li key={counterId}>
                            {displaySingleCounter(counterId, counterAsObj[counterId])}
                        </li>
                    );
                })
            }
            </ul>
        </>
    );
};


export default DisplayCounter;