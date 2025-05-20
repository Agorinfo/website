"use client";
import React from 'react';
import ImageWithDecoration from "@/components/ImageWithDecoration";
import {useQuery} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import {useParams} from "next/navigation";
import Loader from "@/components/Loader";
import {createColorPalette} from "@/lib/createColorPalette";

const HeroRessource = () => {
    const {slug} = useParams();
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["ressource", slug],
        queryFn: () => getRessource(slug as string),
    });

    const ressource = data[0]?.attributes;

    const colors = createColorPalette(ressource?.category?.data?.attributes?.color);

    if (isLoading) return <Loader/>

    if (error) return <p>{error?.message}</p>

    return (
        <section
            className="full-width text-white"
            style={{backgroundColor: colors.shadow}}
        >
            <div className="grid md:grid-cols-2 gap-[5.729vw] xl:gap-[3.5vw] py-32">
                <div>
                    <span className={"font-bold inline-block pb-6"}>{ressource?.category?.data.attributes.name}</span>
                    <h1 className={"text-h1 font-bold pb-12"}>{ressource?.title}</h1>
                    <p>{ressource?.shortDescription}</p>
                </div>
                <ImageWithDecoration
                    src={ressource?.featuredImage?.data?.attributes?.formats?.medium?.url
                        ? backUrl + ressource?.featuredImage?.data?.attributes?.formats?.medium?.url
                        : ressource?.featuredImage?.data?.attributes?.url
                            ? backUrl + ressource?.featuredImage?.data?.attributes?.url
                            : null
                }
                    alt={ressource?.featuredImage?.data?.attributes?.alternativeText}
                    layout="square"
                    decorationPosition="squareTwo"
                    squareSize="large"
                />
            </div>
        </section>
    );
};

export default HeroRessource;