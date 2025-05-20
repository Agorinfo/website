"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import emptyImg from "@/assets/empty-img.png"

const CtaHome = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    const {title, text, label, url, image} = data.callToAction;

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <section className="py-6 sm:py-8 lg:py-12 text-white">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 w-full rounded-lg overflow-hidden md:h-80">
                <div className="flex flex-col items-start p-8 lg:col-span-2 bg-featured-shadow">
                    <h3 className="text-h3 font-bold pb-4">{title}</h3>
                    <p className="pb-8">{text}</p>
                    <Button
                        className="btn btn-white mt-auto"
                        label={label}
                        url={url}
                    />
                </div>
                <div className="lg:col-span-3 h-48 sm:h-auto md:h-80 w-full object-cover">
                    <img className="h-full w-full object-cover object-center" src={image.data ? backUrl + image.data.attributes.url : emptyImg.src}
                         alt={image.data ? image.data.attributes.alternativeText : ""}/>
                </div>
            </div>
        </section>
    );
};

export default CtaHome;