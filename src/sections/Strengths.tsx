"use client"
import React from 'react';
import FeaturedCard from "@/components/FeaturedCard";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";

type StrengthsCarsType = {
    id: number,
    icon: string,
    title: string,
    text: string,
}

const Strengths = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    const {title, teaser, card} = data.strengths;

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{title}</h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">{teaser}</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16">
                    {card.map((item: StrengthsCarsType) => (
                        <FeaturedCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            text={item.text}
                            iconClassName="bg-accent"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Strengths;