import React from 'react';
import { setCounter, getCounter } from '../../redux/counterAsObjectWithHook';

const AddCounter = () => {

    const nextCounterId = () => 'counter' + (Object.keys(getCounter()).length + 1);

    return (
        <>
            <button onClick={() => { setCounter(nextCounterId(), 0) }}>Add counter to counter obj</button>
        </>
    );
};


export default AddCounter;