'use client'
import React from 'react';
import Icon from "@/components/icons/Icon";
import FeaturedCard from "@/components/FeaturedCard";
import curve from "@/assets/left.png"
import curveMobile from "@/assets/curve-mobile.png"
import emptyImg from '@/assets/empty-img.png'
import useScreenSize from "@/utils/useScreenSize";

interface HeroServiceProps {
    title: string;
    icon: string;
    teaser: string;
    steps: {
        id: number;
        icon: string;
        title: string;
        text: string;
        url?: string
    }[];
    heroImg: {
        attributes: {
            url: string;
            name: string;
            alternativeText: string;
        }
    }[];
    stepImg: {
        data: {
            attributes: {
                url: string;
                name: string;
                alternativeText: string;
            }
        }
    };
    logo: {
        data: {
            attributes: {
                url: string;
                name: string;
                alternativeText: string;
            }
        }
    };
}

const HeroService = ({icon, title, teaser, heroImg, steps, stepImg, logo}: HeroServiceProps) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const width = useScreenSize();
    return (
        <>
            <div className="bg-featured-shine full-width">
                <div className="lg:pt-28 pb-12 grid md:grid-cols-2 gap-8 md:gap-0 lg:flex-row justify-between">
                    <div className="bg-featured-shine">
                        <div id="service-title" className="">
                            <h1 className="text-h1 flex items-center gap-8 pb-8">
                                <Icon className="text-featured" name={icon} size={56}/>
                                {title}
                            </h1>
                            <p className="max-w-[28rem]">{teaser}</p>
                        </div>
                    </div>
                    { width === "tablet" || width === "desktop" &&
                        <div className="justify-self-end relative px-8 md:px-0">
                            <div
                                className="lg:absolute lg:right-0 p-2 rounded-lg bg-white rotate-[4deg] shadow-featuredTab size-[27rem]">
                                <img
                                    id="service-hero-img"
                                    className="object-cover object-center w-full h-full"
                                    src={heroImg ? backUrl + heroImg[0].attributes.url : emptyImg.src}
                                    alt={heroImg && heroImg[0].attributes.alternativeText ? heroImg[0].attributes.alternativeText : ""}
                                />
                                {logo.data &&
                                    <img
                                        className="w-[8rem] h-[4.2rem] rounded-lg absolute top-6 -left-4"
                                        src={logo.data ? backUrl + logo.data.attributes.url : emptyImg.src}
                                        alt={logo.data ? logo.data.attributes.alternativeText : ""}
                                    />
                                }
                            </div>
                        </div>}
                </div>
            </div>
            {width === "mobile" || width === "tablet" && <div style={{background: `url(${curveMobile.src}) no-repeat top`}}
                                                              className="full-width justify-self-end relative px-8 md:px-0">
                <div
                    className="lg:absolute lg:right-0 p-2 rounded-lg bg-white rotate-[4deg] shadow-featuredTab w-full aspect-square">
                    <img
                        id="service-hero-img"
                        className="object-cover object-center w-full h-full max-w-[27rem]"
                        src={heroImg ? backUrl + heroImg[0].attributes.url : emptyImg.src}
                        alt={heroImg && heroImg[0].attributes.alternativeText ? heroImg[0].attributes.alternativeText : ""}
                    />
                    {logo.data &&
                        <img
                            className="w-[8rem] h-[4.2rem] rounded-lg absolute top-6 -left-4"
                            src={logo.data ? backUrl + logo.data.attributes.url : emptyImg.src}
                            alt={logo.data ? logo.data.attributes.alternativeText : ""}
                        />
                    }
                </div>
            </div>}
            { width === "desktop" && <img className="full-width w-full" src={curve.src} alt=""/>}
            <div className="grid grid-cols-1 lg:grid-cols-2 py-12">
                <div id="service-steps"
                     className="relative flex flex-col gap-14 before:w-px before:h-full before:block before:bg-accent-muted before:absolute before:left-7 before:top-0 before:-z-10 lg:col-start-1 lg:col-end-6 lg:row-start-2 lg:row-end-5">
                    {steps.map(step => (
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
                <img
                    className="lg:row-start-4 lg:row-end-5 mx-auto max-w-[30.6875rem] max-h-[24rem]"
                    id={"service-steps-img"}
                    src={stepImg.data ? backUrl + stepImg.data.attributes.url : emptyImg.src}
                    alt={stepImg.data ? stepImg.data.attributes.alternativeText : ""}
                />
            </div>
        </>
    );
};

export default HeroService;