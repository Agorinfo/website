import React from 'react';
import Icon from "@/components/icons/Icon";

interface StoryCardProps {
    icon: string;
    title: string;
    description: string;
}

const StoryCard = ({icon, title, description}: StoryCardProps) => {
    return (
        <div className="h-[22.3rem] flex flex-col">
            <div className="py-9 grid place-items-center bg-accent-shine">
                <Icon name={icon}/>
            </div>
            <div className="p-4">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default StoryCard;