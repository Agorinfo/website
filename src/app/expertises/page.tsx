import React from 'react';
import {QueryClient} from "@tanstack/react-query";
import getExpertise from "@/actions/getExpertise";
import HeroExpertises from "@/sections/HeroExpertises";
import SectionExpertises from "@/sections/SectionExpertises";
import {ArrowLeft} from "@phosphor-icons/react";

const Expertises = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["expertise"],
        queryFn: () => getExpertise(),
    })

    return (
        <>
            <HeroExpertises/>
            <SectionExpertises/>
        </>
    );
};

export default Expertises;