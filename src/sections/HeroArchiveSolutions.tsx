"use client"
import React from 'react';
import HeroArchive from "@/components/HeroArchive";
import {useQuery} from "@tanstack/react-query";
import getSolutions from "@/actions/getSolutions";
import getGlobal from "@/actions/getGlobal";
import Loader from "@/components/Loader";

const HeroArchiveSolutions = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["solutions"],
        queryFn: () => getSolutions(),
    })

    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    if(isLoading || global.isLoading) return  <Loader />

    if(error || global.error) return <p>{error?.message || global.error?.message}</p>

    return (
        <HeroArchive
            teaser={global.data.archiveSolutions.teaser}
            text={global.data.archiveSolutions.text}
            label={global.data.archiveSolutions.label}
            url={global.data.archiveSolutions.url}
            modules={data}
        />
    );
};

export default HeroArchiveSolutions;