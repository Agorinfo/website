"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import RelatedCard from "@/components/RelatedCard";
import Loader from "@/components/Loader";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import getSolutions from "@/actions/getSolutions";

type RelatedCardType = {
    id: number;
    attributes: {
        icon: string;
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

const SolutionList = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["solutions"],
        queryFn: getSolutions,
    })

    const [ref] = useKeenSlider<HTMLDivElement>({
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
        <div ref={ref} className="keen-slider !overflow-visible">
            {data.map((item: RelatedCardType) => (
                <div key={item.id} className="keen-slider__slide py-12">
                    <RelatedCard
                        icon={item.attributes.icon}
                        title={item.attributes.name}
                        text={item.attributes.shortDescription}
                        listItems={item.attributes.heroArchive.moduleList}
                        label={"Voir les fonctionnalités"}
                        url={`/solutions/${item.attributes.slug}`}
                        className="h-full"
                    />
                </div>
            ))}
        </div>
    );
};

export default SolutionList;