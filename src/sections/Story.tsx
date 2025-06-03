"use client"
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";
import StoryCard from "@/components/StoryCard";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css"
import clsx from "clsx";
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react";

type StoryCardType = {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const Story = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout()
    })

    const {story} = data;

    const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        breakpoints: {
            "(min-width: 400px)": {
                slides: {perView: 1, spacing: 16},
            },
            "(min-width: 768px)": {
                slides: {perView: 2, spacing: 32},
            },
            "(min-width: 1080px)": {
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
                        {loaded && instanceRef.current && (
                            <>
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    disabled={currentSlide === 0}
                                    className={clsx(
                                        "absolute top-1/2 left-1 -translate-y-1/2 z-20 text-featured-muted disabled:opacity-0 disabled:pointer-events-none"
                                    )}
                                    aria-label="Previous slide"
                                >
                                    <ArrowLeft size={40}/>
                                </button>
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    disabled={
                                        currentSlide ===
                                        instanceRef.current.track.details.slides.length - 1
                                    }
                                    className={clsx(
                                        "absolute top-1/2 right-1 -translate-y-1/2 z-20 text-featured-muted", "disabled:opacity-0 disabled:pointer-events-none"
                                    )}
                                    aria-label="Next slide"
                                >
                                    <ArrowRight size={40}/>
                                </button>

                                <ArrowRight

                                />
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default Story;