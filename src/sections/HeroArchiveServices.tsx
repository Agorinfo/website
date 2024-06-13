"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getGlobal from "@/actions/getGlobal";
import Loader from "@/components/Loader";
import getServices from "@/actions/getServices";
import HeroArchiveService from "@/components/HeroArchiveService";

const HeroArchiveServices = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });

    const global = useQuery({
        queryKey: ["global"],
        queryFn: getGlobal,
    })

    if(isLoading || global.isLoading) return  <Loader />

    if(error || global.error) return <p>{error?.message || global.error?.message}</p>

    return (
        <HeroArchiveService
            teaser={global.data.archiveServices.teaser}
            text={global.data.archiveServices.text}
            label={global.data.archiveServices.label}
            url={global.data.archiveServices.url}
            modules={data}
        />
    );
};

export default HeroArchiveServices;