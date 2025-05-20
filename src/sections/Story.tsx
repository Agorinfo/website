"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";
import StoryCard from "@/components/StoryCard";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css"

type StoryCardType = {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const Story = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout()
    })

    const {story} = data;

    const [ref] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "(min-width: 400px)": {
                slides: {perView: 2, spacing: 16},
            },
            "(min-width: 768px)": {
                slides: {perView: 3, spacing: 32},
            },
            "(min-width: 1080px)": {
                slides: {perView: 4, spacing: 32},
            },
            "(min-width: 1536px)": {
                slides: {perView: 3, spacing: 32},
            },
        },
        slides: {
            perView: 1,
            spacing: 32,
        },
    })

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <>
            {story &&
                <div className="py-20">
                    <h2 className="text-h3 text-center font-bold">{story.title}</h2>
                    <div ref={ref} className="keen-slider py-12 !overflow-visible">
                        {story.storyCard.map((story: StoryCardType) => (
                            <div key={story.id} className="keen-slider__slide shadow-storyCard rounded-2xl">
                                <StoryCard
                                    icon={story.icon}
                                    title={story.title}
                                    description={story.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default Story;