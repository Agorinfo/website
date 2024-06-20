"use client"
import React from 'react';
import Hero from "@/components/Hero";
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";
import curve from "@/assets/center.png"

const HeroAbout = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: getAbout
    })

    if (isLoading) return <Loader/>;

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <Hero
                teaser={data.heroContent.teaser}
                content={data.heroContent.content}
                images={data.images}
                label1={data.heroContent.label1}
                url1={data.heroContent.url1}
                label2={data.heroContent.label2}
                url2={data.heroContent.url2}
            />
            <img className="!hidden lg:!grid full-width" src={curve.src} alt=""/>
        </>
    );
};

export default HeroAbout;