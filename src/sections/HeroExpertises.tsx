"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getExpertise from "@/actions/getExpertise";
import Content from "@/components/Content";

const HeroExpertises = () => {
    const {data: expertises, error, isLoading} = useQuery({
        queryKey: ["expertise"],
        queryFn: () => getExpertise(),
    })

    if (isLoading) return <p><h1>Loading...</h1></p>

    if (error) return <p>{error.message}</p>

    return (
        <section className="full-width relative bg-featured py-28 text-white">
            <img
                className="absolute inset-0 mix-blend-multiply w-full h-full backdrop-brightness-[0.7] full-width"
                src="/agorinfo-filigrane-min.png"
                srcSet="/agorinfo-filigrane-min.png 200w, /agorinfo-filigrane-max.png 400w"
                sizes="(max-width: 600px) 200px, 50vw"
                alt=""
            />
            <div className="lg:max-w-[50%] w-full relative z-10 py-12">
                <Content
                    teaser={expertises.teaser}
                    teaserClassName={"text-white"}
                    url1={expertises.url}
                    label1={expertises.labelButton}
                    btn1ClassName={"btn btn-accent"}
                    content={typeof expertises.heroContent === "string"
                        ? JSON.parse(expertises.heroContent)
                        : expertises.heroContent}
                    headingClassName="[&>em]:text-featured-muted [&>em]:not-italic"
                />
            </div>
        </section>
    );
};

export default HeroExpertises;