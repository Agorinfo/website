"use client"
import React from 'react';
import Reassurance from "@/components/Reassurance";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import getGlobal from "@/actions/getGlobal";
import emptyImg from "@/assets/empty-img.png"

const ReassuranceArchiveService = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <Reassurance
            icon={data.favicon.data ? data.favicon.data.attributes.url : emptyImg.src}
            alt={data.favicon.data ? data.favicon.data.attributes.alternativeText : ""}
            text={data.archiveServices.reassuranceSolution.content}
            label={data.archiveServices.reassuranceSolution.label1}
            url={data.archiveServices.reassuranceSolution.url1}
            images={data.archiveServices.images}
            ctaTitle={data.archiveServices.cta.title}
            ctaText={data.archiveServices.cta.text}
            ctaHeadingClassName="text-accent"
            ctaButtonClassName="btn-accent"
            ctaButtonLabel={data.archiveServices.cta.labelButton}
        />
    );
};

export default ReassuranceArchiveService;