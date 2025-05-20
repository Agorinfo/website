"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getServices from "@/actions/getServices";
import RelatedCard from "@/components/RelatedCard";
import Loader from "@/components/Loader";
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

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
    const {data, error, isLoading} = useQuery({
        queryKey: ["services"],
        queryFn: () => getServices(),
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
        <div ref={ref} className="keen-slider !overflow-visible">
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
        </div>
    );
};

export default ServiceList;