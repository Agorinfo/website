"use client"
import React from 'react';
import {CallToActionImage} from "@/components/CallToAction";
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";

const CtaAbout = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <>
            {
                data.cta &&
                <CallToActionImage
                    document={data.cta.document?.data?.attributes.url}
                    title={data.cta.title}
                    text={data.cta.text}
                    image={data.cta.image}
                    color={data.cta.background}
                    position={data.cta.position}
                    label={data.cta.label}
                    url={data.cta.url}
                />
            }
        </>
    );
};

export default CtaAbout;