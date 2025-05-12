"use client"
import React from 'react';
import Curve from "@/components/Curve";
import Content from "@/components/Content";
import {SupportType} from "@/utils/types";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import emptyImg from "@/assets/empty-img.png"

const Support = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    const {image} = data.support;
    const {content, teaser, label1, url1, label2, url2} = data.support.content;

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <>
            <Curve/>
            <section className="full-width bg-map pb-12">
                <div className="grid md:grid-cols-2 gap-[5.729vw] xl:gap-[3.5vw]">
                    <img
                        className="w-full h-full object-contain"
                        src={image.data ? backUrl + image.data.attributes.url : emptyImg.src}
                        alt={image.data ? image.data.attributes.alternativeText : ""}
                    />
                    <Content
                        teaser={teaser}
                        content={content}
                        label1={label1}
                        label2={label2}
                        url1={url1}
                        url2={url2}
                        headingClassName="[&>em]:text-featured [&>em]:not-italic"
                    />
                </div>
            </section>
        </>
    );
};

export default Support;