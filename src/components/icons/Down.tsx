import React from 'react';

const Down = ({className}: {className?:string}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
            <path d="M1.5 1L5.5 5L9.5 1" stroke="#0057B4" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default Down;