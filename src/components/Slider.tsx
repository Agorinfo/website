'use client'
import React, {useState} from 'react';
import "keen-slider/keen-slider.min.css"
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react";
import Icon from "@/components/icons/Icon";
import emptyImg from "@/assets/empty-img.png"
import clsx from "clsx";
import {AnimatePresence, motion} from "framer-motion";


type ImagesTypes = {
    images: {
        attributes: {
            url: string;
            alternativeText: string;
            formats: {
                small: {
                    url: string;
                }
            }
        }
    }[],
    logo?: {
        data: {
            attributes: {
                url: string,
                alternativeText: string
            }
        }
    },

}

const transforms = {
    poligon: [
        "translate(-38%, -14%",
        "translate(-25%, 58%)",
        "translate(-67%, -11%)",
    ],
    triangle: [
        "translate(300%, -160%)",
        "translate(-70%, -380%)",
        "translate(-35%, -265%)",
    ],
};


const Slider = ({images, logo}: ImagesTypes) => {
    const [index, setIndex] = useState(0)
    const rotation = ["4deg", "-2deg", "2deg"];
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const next = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    }

    const rotationStyle = {
        transform: `rotate(${rotation[index % rotation.length]})`
    };

    const transformStyle = {
        transform: transforms.triangle[index % 3],
    };

    const transformPoligon = {
        transform: transforms.poligon[index % 3],
    };

    return (
        <AnimatePresence initial={false}>
            <div className="relative flex justify-center items-center w-full px-14">
                <div
                    className="relative max-w-[27rem] w-full lg:w-[28.125vw] aspect-square transition-all duration-700 ease-out z-10 bg-white rounded-lg"
                    style={rotationStyle}>
                    {images ?
                        <div
                            className="w-full h-full relative z-10"
                        >
                            {logo &&
                                <div
                                    className="absolute top-8 -left-4 w-32 h-12 rounded-lg"
                                    style={rotationStyle}
                                >
                                    <img
                                        className="w-full h-full object-contain"
                                        src={logo ? backUrl! + logo.data.attributes.url : emptyImg.src}
                                        alt={logo ? logo.data.attributes.alternativeText : ""}
                                    />
                                </div>
                            }
                            <div

                                className="relative z-10 bg-white p-3 max-w-[27rem] w-full lg:w-[28.125vw] aspect-square shadow-slide rounded-lg">
                                <motion.img
                                    key={"image-" + index}
                                    initial={{opacity: 0.5}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.7}}
                                    className="w-full h-full object-cover"
                                    src={images ? images[index].attributes.formats ? backUrl + images[index].attributes.formats.small.url : backUrl + images[index].attributes.url : emptyImg.src}
                                    alt={images ? images[index].attributes.alternativeText : ""}/>
                            </div>
                            <span
                                style={transformPoligon}
                                className="absolute -z-10 inline-block top-0 left-1/2 transition-all duration-700 ease-linear w-[50vw] sm:w-[20vw]"
                            >
                                    <Icon className="w-full h-full sm:w-auto sm:h-auto"
                                          name={'poligonTransparent'}/>
                                </span>
                            <span
                                style={transformStyle}
                                className="hidden md:inline-block absolute z-10 transition-all duration-700 ease-linear w-[4.5em] lg:w-[7em] "
                            >
                                <Icon className="w-full h-full" name={'triangle'}/>
                            </span>
                        </div>
                        :
                        <div
                            className="relative z-10 bg-white p-3 max-w-[27rem] w-full lg:w-[28.125vw] aspect-square shadow-slide rounded-lg">
                            <img className="w-full h-full object-cover" src={emptyImg.src} alt=""/>
                        </div>
                    }
                </div>
                <button
                    type="button"
                    aria-label={"prev slide"}
                    className={clsx("absolute top-1/2 left-0 -translate-y-1/2 z-40 size-12 text-featured-muted",
                        index === 0 && "hidden",
                        !images && "hidden"
                    )}
                    onClick={prev}
                >
                    <ArrowLeft size={48}/>
                </button>
                <button
                    type="button"
                    aria-label={"next slide"}
                    className={clsx("absolute top-1/2 right-0 -translate-y-1/2 z-40 size-12 text-featured-muted",
                        index === images?.length - 1 && "hidden",
                        !images && "hidden"
                    )}
                    onClick={next}><ArrowRight size={48}/>
                </button>
            </div>
        </AnimatePresence>
    )
        ;
};

export default Slider;

const transformsLandscape = {
    poligon: [
        "translate(-100%, -14%",
        "translate(100%, 50%)",
        "translate(0%, 40%)",
    ],
    triangle: [
        "translate(470%, -180%)",
        "translate(-70%, -330%)",
        "translate(-60%, -265%)",
    ],
};

export const SliderLandscape = ({images}: ImagesTypes) => {
    const [index, setIndex] = useState(0)
    const rotation = ["4deg", "-2deg", "2deg"];
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const next = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    }


    const rotationStyle = {
        transform: `rotate(${rotation[index % rotation.length]})`
    };

    const transformStyle = {
        transform: transformsLandscape.triangle[index % 3],
    };

    const transformPoligon = {
        transform: transformsLandscape.poligon[index % 3],
    };

    return (
        <AnimatePresence initial={false}>
            <div className="relative flex justify-center items-center w-full px-14 pt-8">
                <div
                    className="relative max-w-[34rem] w-full lg:w-[36.259vw] max-h-[27rem] aspect-[4/3] md:aspect-[3/2] transition-all rounded-[1rem] duration-700 ease-out z-10 bg-white"
                    style={rotationStyle}>
                    {images ? images.map((item, idx: number) => (
                            <div
                                key={idx}
                                className="w-full h-full absolute top-0"
                            >
                                <div
                                    className="relative z-10 bg-white p-3 max-w-[34rem] w-full lg:w-[36.259vw] max-h-[27rem] aspect-[4/3] md:aspect-[3/2] rounded-[1rem]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.attributes.formats && item.attributes.formats.small ? backUrl + item.attributes.formats.small.url : backUrl + item.attributes.url}
                                        alt={item.attributes.alternativeText ? item.attributes.alternativeText : ""}
                                    />
                                </div>
                                <span
                                    style={transformPoligon}
                                    className="absolute -z-10 inline-block top-0 left-1/2 transition-all duration-700 ease-linear w-[40vw] sm:w-[20vw]"
                                >
                                    <Icon className="w-full h-full sm:w-auto sm:h-auto"
                                          name={'poligon'}/>
                                </span>
                                <span
                                    style={transformStyle}
                                    className="hidden md:block absolute z-10 transition-all duration-700 ease-linear w-[4.5em] lg:w-[6.8125rem] lg:h-[5.9375rem]"
                                >
                                    <Icon className="w-full h-full" name={'triangle'}/>
                                </span>
                            </div>
                        ))
                        :
                        <div
                            className="relative z-10 bg-white p-3 max-w-[34rem] w-full lg:w-[36.259vw] max-h-[27rem] aspect-[4/3] md:aspect-[3/2] shadow-slide rounded-lg">
                            <img className="w-full h-full object-cover" src={emptyImg.src} alt=""/>
                        </div>
                    }
                </div>
                <button
                    type="button"
                    aria-label={"prev slide"}
                    className={clsx("absolute top-1/2 left-0 -translate-y-1/2 z-40 size-12 text-featured-muted",
                        index === 0 && "hidden",
                        !images && "hidden"
                    )}
                    onClick={prev}
                >
                    <ArrowLeft size={48}/>
                </button>
                <button
                    type="button"
                    aria-label={"next slide"}
                    className={clsx("absolute top-1/2 right-0 -translate-y-1/2 z-40 size-12 text-featured-muted",
                        index === images?.length - 1 && "hidden",
                        !images && "hidden"
                    )}
                    onClick={next}><ArrowRight size={48}/>
                </button>
            </div>
        </AnimatePresence>
    );
};
