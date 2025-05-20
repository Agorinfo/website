"use client"
import React from 'react';
import TestimonialSlide from "@/components/TestimonialSlide";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import getAbout from "@/actions/getAbout";

const Testimonials = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>

    return (
        <>
            {data.testimonials.length ?
                <section>
                    <TestimonialSlide testimonials={data.testimonials}/>
                </section>
                : null
            }
        </>
    );
};

export default Testimonials;