"use client"
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import TestimonialCard from "@/components/TestimonialCard";
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react";
import {TestimonialFetchType, TestimonialType} from "@/utils/types";
import emptyImg from "@/assets/empty-img.png"

const TestimonialSlide = ({testimonials}: TestimonialFetchType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <>
            <div className="relative flex overflow-clip px-12">
                <div ref={sliderRef} className="keen-slider">
                    {testimonials.map(item => (
                        <div key={item.id} className="keen-slider__slide">
                            <TestimonialCard
                                logo={item.logo.data ? backUrl + item.logo.data.attributes.url : emptyImg.src}
                                alt={item.logo.data ? item.logo.data.attributes.alternativeText : ""}
                                testimonial={item.testimonial}
                                firstname={item.firstname}
                                name={item.name}
                                company={item.company}
                                job={item.job}
                                avatar={item.avatar.data? backUrl + item.avatar.data.attributes.url : emptyImg.src}
                                avatarAlt={item.avatar.data? item.avatar.data.attributes.alternativeText : ""}
                            />
                        </div>
                    ))}
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <ArrowLeft
                            className="absolute top-1/2 left-0 -translate-y-1/2 z-40 size-12 text-featured"
                            size={48}
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                        />
                        <ArrowRight
                            className="absolute top-1/2 right-0 -translate-y-1/2 z-40 size-12 text-featured"
                            size={48}
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                        />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="flex justify-center items-center gap-1">
                    {[
                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"inline-flex justify-center items-center rounded-full p-2 transition-background duration-500" + (currentSlide === idx ? " bg-accent-shine" : "")}
                            >
                                <span className={"size-2 rounded-full bg-accent"}></span>
                            </button>
                        )
                    })}
                </div>
            )}
        </>
    )
};

export default TestimonialSlide;

