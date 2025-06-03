"use client"
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import getServices from "@/actions/getServices";
import RelatedCard from "@/components/RelatedCard";
import Loader from "@/components/Loader";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import clsx from "clsx";
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react";

type RelatedCardType = {
    id: number;
    attributes: {
        hero: {
            icon: string;
        }
        name: string;
        shortDescription: string;
        heroArchive: {
            moduleList: []
        }
        slug: string;
        label: string;
        url: string;
    }
}

const ServiceList = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const {data, error, isLoading} = useQuery({
        queryKey: ["services"],
        queryFn: () => getServices(),
    })

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
        <div ref={ref} className="relative keen-slider !overflow-visible">
            {data.map((item: RelatedCardType) => (
                <div key={item.id} className="keen-slider__slide py-12">
                    <RelatedCard
                        icon={item.attributes.hero?.icon}
                        title={item.attributes.name}
                        text={item.attributes.shortDescription}
                        listItems={item.attributes.heroArchive?.moduleList}
                        label={"Voir les différentes étapes"}
                        url={`/services/${item.attributes.slug}`}
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
    );
};

export default ServiceList;