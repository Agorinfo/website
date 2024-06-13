import React from 'react';
import FeaturedCard from "@/components/FeaturedCard";

interface ReassuranceSolutionProps {
    data: {
        title: string;
        card: {
            id: number;
            title: string;
            text: string;
            icon: string;
        }[];
    }
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

const ReassuranceSolution = ({data, colors}: ReassuranceSolutionProps) => {
    return (
        <div className="py-12">
            <h2 className="text-h3 font-bold text-center pb-12">{data.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                {data.card.map((card) => (
                    <FeaturedCard
                        key={card.id}
                        colors={colors}
                        title={card.title}
                        text={card.text}
                        icon={card.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReassuranceSolution;