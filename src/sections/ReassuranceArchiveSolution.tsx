"use client"
import React from 'react';
import Reassurance from "@/components/Reassurance";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import getGlobal from "@/actions/getGlobal";
import emptyImg from "@/assets/empty-img.png"

const ReassuranceArchiveSolution = () => {
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
            text={data.archiveSolutions.reassuranceSolution.content}
            label={data.archiveSolutions.reassuranceSolution.label1}
            url={data.archiveSolutions.reassuranceSolution.url1}
            images={data.archiveSolutions.images}
            ctaTitle={data.archiveSolutions.cta.title}
            ctaText={data.archiveSolutions.cta.text}
            ctaHeadingClassName="text-accent"
            ctaButtonClassName="btn-accent"
            ctaButtonLabel={data.archiveServices.cta.labelButton}
        />
    );
};

export default ReassuranceArchiveSolution;