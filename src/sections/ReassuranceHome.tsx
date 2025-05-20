"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import getGlobal from "@/actions/getGlobal";
import Reassurance from "@/components/Reassurance";
import emptyImg from "@/assets/empty-img.png"

const ReassuranceHome = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });
    const global = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    });

    const {text, label, url, images, callToAction} = data.reassurance;
    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <Reassurance
            icon={global.data.favicon.data ? global.data.favicon.data.attributes.url : emptyImg.src}
            alt={global.data.favicon.data ? global.data.favicon.data.attributes.alternativeText : ""}
            text={text}
            images={images}
            label={label}
            url={url}
            ctaTitle={callToAction.title}
            ctaText={callToAction.text}
            ctaButtonLabel={callToAction.labelButton}
            ctaHeadingClassName="text-accent"
            ctaButtonClassName="btn-accent"
        />
    );
};

export default ReassuranceHome;