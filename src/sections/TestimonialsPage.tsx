"use client"
import React from 'react';
import TestimonialSlide from "@/components/TestimonialSlide";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import {TestimonialFetchType} from "@/utils/types";

const TestimonialsPage = ({testimonials}:TestimonialFetchType) => {

    return (
        <section>
           <TestimonialSlide testimonials={testimonials}/>
        </section>
    );
};

export default TestimonialsPage;