"use client"
import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";
import CountUp from "react-countup";
import ScrollTrigger from '@/utils/useScrollTrigger';

type ExpertiseType = {
    id: number;
    number: number;
    expertise: string;
}

const Expertises = () => {
    const [counterStart, setCounterStart] = useState(false)
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    })

    if (isLoading) return <Loader/>;

    if (error) return <p>{error.message}</p>;

    // @ts-ignore
    return (
        <section className="pb-6 md:pb-8 lg:pb-12">
            <h2 className="text-h3 font-bold text-center pb-6">{data.expertises.title}</h2>
            <p className="text-center paragraph max-w-[49rem] mx-auto pb-12 whitespace-pre-line">{data.expertises.description}</p>
            <ScrollTrigger onEnter={() => setCounterStart(true)}>
            <div className="bg-accent rounded-lg grid grid-cols-2 lg:grid-cols-4 w-fit mx-auto gap-8 p-8 text-white">
                {data.expertises.counter.map((item: ExpertiseType) => (
                    <div className="flex flex-col items-center justify-center px-8 text-center" key={item.id}>
                        <span className="font-bold text-h3">{counterStart && <CountUp start={0} duration={1.5} end={item.number}/>}</span>
                        <span>{item.expertise}</span>
                    </div>
                ))}
            </div>
            </ScrollTrigger>
        </section>
    );
};

export default Expertises;