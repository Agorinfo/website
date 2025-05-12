"use client"
import React from 'react';
import TestimonialSlide from "@/components/TestimonialSlide";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";

const Testimonials = () => {
    const{data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });

    if(isLoading) return  <Loader />

    if(error) return <p>{error.message}</p>

    return (
        <section>
           <TestimonialSlide testimonials={data.testimonials}/>
        </section>
    );
};

export default Testimonials;