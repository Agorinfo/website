"use client"
import React from 'react';
import FeaturedCard from "@/components/FeaturedCard";
import {useQuery} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import Loader from "@/components/Loader";

const StepAbout = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <>
            {data && data.steps &&
                <div className="pt-6 md:pt-8 lg:pt-12">
                    <div
                        className="relative flex flex-col gap-14 pb-6 md:pb-8 lg:pb-12 before:w-px before:h-full before:block before:bg-accent-muted before:absolute before:left-7 before:top-0 before:-z-10">
                        {data.steps?.map((step: any) => (
                            <FeaturedCard
                                key={step.id}
                                icon={step.icon}
                                title={step.title}
                                text={step.text}
                                link={step.url}
                                className={`${step.icon === "arrowRight" && "items-center"} ${step.icon === "arrowLeft" && "items-center"}`}
                                iconClassName={step.icon === "arrowRight" || step.icon === "arrowLeft" ? "border border-featured-muted !text-featured bg-white" : "bg-accent"}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default StepAbout;