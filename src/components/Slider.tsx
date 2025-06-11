'use client'
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react";
import clsx from "clsx";
import Icon from "@/components/icons/Icon";
import emptyImg from "@/assets/empty-img.png";

type ImageType = {
    url: string;
    alternativeText: string;
    formats?: {
        small?: { url: string };
    };
};

type Props = {
    images: { attributes: ImageType }[];
    logo?: {
        data: { attributes: { url: string; alternativeText: string } };
    };
    layout?: "square" | "landscape";
};

const rotations = ["4deg", "-2deg", "2deg"];
const backUrl = process.env.NEXT_PUBLIC_BACK_URL!;

const decorativeMotion = {
    initial: {x: -10, rotate: -2},
    animate: {x: 0, rotate: 0},
    transition: {duration: 0.6, ease: "easeOut"},
};

const transforms = {
    square: {
        poligon: [
            "top-[2%] left-[33%] lg:top-[18%] lg:left-[22%]",
            "top-[60%] left-[55%] lg:top-[42%] lg:left-[33%]",
            "top-[2%] left-[2%] lg:top-[18%] lg:left-[10%]"
        ],
        triangle: [
            "top-[68%] left-[83%] lg:top-[60%] lg:left-[72%]",
            "top-[17%] left-[-4%] lg:top-[30%] lg:left-[3%]",
            "top-[40%] left-[2%] lg:top-[45%] lg:left-[8%]"
        ],
    },
    landscape: {
        poligon: [
            "top-[2%] left-[2%] md:top-[-4%] md:left-[2%] lg:top-[-3%] lg:left-[9%]",
            "top-[50%] left-[-6%] md:top-[38%] md:left-[-4%] lg:top-[32%] lg:left-[0%]",
            "top-[2%] left-[2%] md:top-[-5%] md:left-[3%] lg:top-[-6%] lg:left-[9%]"
        ],
        triangle: [
            "top-[52%] left-[85%] md:top-[52%] md:left-[88%] lg:top-[50%] lg:left-[80%]",
            "top-[17%] left-[82%] md:top-[16%] md:left-[83%] lg:top-[16%] lg:left-[76%]",
            "top-[40%] left-[2%] md:top-[45%] md:left-[5%] lg:top-[45%] lg:left-[8%]"
        ],
    },
};

export default function Slider({images, logo, layout = "square"}: Props) {
    const [index, setIndex] = useState(0);
    const currentImage = images?.[index]?.attributes;

    const isLandscape = layout === "landscape";

    const handlePrev = () => index > 0 && setIndex(index - 1);
    const handleNext = () => index < images.length - 1 && setIndex(index + 1);

    const baseRotation = rotations[index % 3];
    const triangleTransform = transforms[layout].triangle[index % 3];
    const poligonTransform = transforms[layout].poligon[index % 3];

    return (
        <div className="relative flex justify-center items-center w-full px-4 sm:px-10 py-8">
            <div
                className={clsx(
                    "relative shadow-slide rounded-xl transition-all duration-700 ease-out z-10",
                    isLandscape
                        ? "max-w-[36rem] w-full aspect-[4/3] md:aspect-[3/2]"
                        : "max-w-[28rem] w-full aspect-square"
                )}
                style={{transform: `rotate(${baseRotation})`}}
            >
                {logo && (
                    <div className="absolute top-6 left-4 w-24 h-10 z-20">
                        <img
                            src={backUrl + logo.data.attributes.url}
                            alt={logo.data.attributes.alternativeText}
                            className="w-full h-full object-contain bg-white"
                        />
                    </div>
                )}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        className="relative z-10 bg-white w-full h-full p-3 rounded-xl"
                        initial={{opacity: 0.3}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.6}}
                    >
                        <img
                            key={currentImage?.url || "empty"}

                            src={
                                currentImage
                                    ? currentImage.formats?.small
                                        ? backUrl + currentImage.formats.small.url
                                        : backUrl + currentImage.url
                                    : emptyImg.src
                            }
                            alt={currentImage?.alternativeText || ""}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            <span
                className={`absolute z-[5] left-1/2 top-0 w-[169px] md:w-[339px] transition-all duration-700 ease-linear ${poligonTransform}`}
            >
              <Icon name="poligonTransparent" className="w-full h-auto"/>
            </span>
            <span
                className={`absolute z-10 transition-all w-[55px] md:w-[80px] lg:w-[110px] duration-700 ease-linear ${triangleTransform}`}
            >
              <Icon name="triangle" className="w-full h-full"/>
            </span>

            {/* Nav Buttons */}
            <button
                onClick={handlePrev}
                className={clsx(
                    "absolute top-1/2 left-2 -translate-y-1/2 z-20 text-featured-muted",
                    index === 0 && "opacity-0 pointer-events-none"
                )}
                aria-label="Previous slide"
            >
                <ArrowLeft size={40}/>
            </button>
            <button
                onClick={handleNext}
                className={clsx(
                    "absolute top-1/2 right-2 -translate-y-1/2 z-20 text-featured-muted",
                    index === images?.length - 1 && "opacity-0 pointer-events-none",
                    images === null && "opacity-0 pointer-events-none",
                    images?.length < 2 && "opacity-0 pointer-events-none"
                )}
                aria-label="Next slide"
            >
                <ArrowRight size={40}/>
            </button>
        </div>
    );
}
