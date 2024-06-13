import React from 'react';
import CountUp from "react-countup";

interface CounterUpProps {
    number: number;
    expertise: string;
}

const CounterUp = ({number, expertise}: CounterUpProps) => {
    return (
        <div className="flex flex-col items-center justify-center px-8">
            <span className="font-bold text-h3"><CountUp duration={1.5} end={number} /></span>
            <span>{expertise}</span>
        </div>
    );
};

export default CounterUp;