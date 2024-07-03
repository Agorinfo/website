"use client"
import React from 'react';
import Slider from "@/components/Slider";
import Content from "@/components/Content";
import {HeroHomeType} from "@/utils/types";
import emptyImg from "@/assets/empty-img.png";
import useScreenSize from "@/utils/useScreenSize";
import curve from "@/assets/about-curve-mobile.png";
import curveTablet from "@/assets/about-curve-tablet.png";

const Hero = ({images, teaser, content, label1, url1, label2, url2}: HeroHomeType) => {
    const screen = useScreenSize();

    return (
        <>
            <div className="bg-featured-shine full-width h-hero">
                <section
                    className="mt-8 pb-6 sm:pb-20 lg:pb-12 lg:h-hero grid lg:grid-cols-2 gap-16 md:gap-[1.729vw] lg:flex-row">
                    <Content
                        teaser={teaser}
                        content={content}
                        label1={label1}
                        label2={label2}
                        url1={url1}
                        url2={url2}
                        headingClassName="[&>em]:text-featured [&>em]:not-italic"
                        btn1ClassName="btn-accent"
                    />
                    {images && images.data.length ?
                        screen === "desktop" && <Slider images={images.data}/>
                        :
                        screen === "desktop" &&
                        <div className="relative flex justify-center items-center w-full px-14">
                            <div
                                className="relative max-w-[27rem] w-full lg:w-[28.125vw] aspect-square transition-all duration-700 ease-out z-10 bg-white rounded-lg rotate-[4deg]">
                                <div className="w-full h-full relative z-10">
                                    <div
                                        className="relative z-10 bg-white p-3 max-w-[27rem] w-full lg:w-[28.125vw] aspect-square shadow-slide rounded-lg">
                                        <img className="w-full h-full object-cover" src={emptyImg.src} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </div>
            {images && images.data ?
                screen === "mobile" &&
                <div style={{background: `url(${curve.src}) no-repeat`}} className="full-width">
                    <Slider images={images.data}/>
                </div>
                :
                screen === "tablet" &&
                <div style={{background: `url(${curveTablet.src}) no-repeat`}} className="full-width">
                    <div className="relative flex justify-center items-center w-full px-14">
                        <div
                            className="relative max-w-[27rem] w-full lg:w-[28.125vw] aspect-square transition-all duration-700 ease-out z-10 bg-white rounded-lg rotate-[4deg]">
                            <div className="w-full h-full relative z-10">
                                <div
                                    className="relative z-10 bg-white p-3 max-w-[27rem] w-full lg:w-[28.125vw] aspect-square shadow-slide rounded-lg">
                                    <img className="w-full h-full object-cover" src={emptyImg.src} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    );
};

export default Hero;