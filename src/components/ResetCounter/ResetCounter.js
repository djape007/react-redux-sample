import React, { useState } from 'react';
import { restore, resetToZero, useCounter } from '../../redux/counterAsObjectWithHook';

const ResetCounter = () => {
    const counterAsObj = useCounter();
    const [selectedCounter, setSelectedCounter] = useState('');

    return (
        <>
            <h3>Select counter to reset:</h3>
            <select onChange={(e) => setSelectedCounter(e.target.value)} defaultValue={selectedCounter}>
                <option value={''} disabled>Select counter</option>
                {
                    Object.keys(counterAsObj).map(counterId => {
                        
                        return (
                            <option key={counterId} value={counterId}>{counterId}</option>
                        );
                    })
                }
            </select>

            <button onClick={() => {
                if (selectedCounter) {
                    resetToZero(selectedCounter);
                }
            }}>Reset</button>

            <br/>
            <button onClick={restore}>Initial state</button>
        </>
    );
};


export default ResetCounter;