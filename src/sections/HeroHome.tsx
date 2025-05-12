"use client"
import React from 'react';
import Slider from "@/components/Slider";
import Content from "@/components/Content";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

const HeroHome = () => {
    const{data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    const { images } = data.hero;
    const {teaser, content, label1, url1, label2, url2} = data.hero.content;

    if(isLoading) return  <Loader />

    if(error) return <p>{error.message}</p>

    return (
        <Hero
            images={images}
            teaser={teaser}
            content={content}
            label1={label1}
            url1={url1}
            label2={label2}
            url2={url2}
        />
    );
};

export default HeroHome;