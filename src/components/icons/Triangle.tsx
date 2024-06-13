import React from 'react';

const Triangle = ({className}: {className?: string}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="110" height="95" fill="none" viewBox="0 0 110 95">
            <path fill="#0057B4" d="M55.33 95L.83 0h109l-54.5 95z"></path>
        </svg>
    );
};

export default Triangle;