"use client"
import React from 'react';
import SolutionCard from "@/components/SolutionCard";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import emptyImg from "@/assets/empty-img.png"

type SolutionCardType = {
    id: number
    url: string,
    image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    }
    title: string,
    label: string,
}
const Solutions = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <>
            {
                data.solutions &&
                <section className="bg-white py-6 sm:py-8 lg:py-28">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{data.solutions.title}</h2>

                            <Button
                                label="Tout voir"
                                url={data.solutions.collectionsLink}
                                className="btn btn-white-gray"
                            />
                        </div>

                        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                            {data.solutions.card.map((item: SolutionCardType) => (
                                <SolutionCard
                                    key={item.id}
                                    url={item.url}
                                    image={item.image.data ? backUrl + item.image.data.attributes.url : emptyImg.src}
                                    alt={item.image.data ? item.image.data.attributes.alternativeText : ""}
                                    category={item.title}
                                    solution={item.label}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default Solutions;