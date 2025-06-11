import React, {useEffect, useState} from 'react';
import Button, {ModalButton} from "@/components/Button";
import SidebarCard from "@/components/SidebarCard";
import Modal from "@/components/Modal";
import ContactForm from "@/components/ContactForm";
import Content from "@/components/Content";
import {HeroArchiveType} from "@/utils/types";
import InformationCard from "@/components/InformationCard";
import {createColorPalette} from "@/lib/createColorPalette";
import {AnimatePresence, motion} from "framer-motion";
import Icon from "@/components/icons/Icon";
import RelatedCard from "@/components/RelatedCard";
import {useKeenSlider} from "keen-slider/react";

const initialColors = {
    base: "#663B8E",
    hover: "#663B8E",
    muted: "#663B8E",
    accent: "#663B8E",
}

const HeroArchive = ({teaser, text, label, url, modules,}: HeroArchiveType) => {
    const [active, setActive] = useState<string | undefined>();
    const [colors, setColors] = useState<{ base: string; hover: string; accent: string; muted: string; }>(initialColors)
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const color = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.brandColor);
    const background = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.heroArchive.background.data.attributes.url);

    const [ref] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "(min-width: 400px)": {
                slides: {perView: 3, spacing: 16},
            },
            // "(min-width: 768px)": {
            //     slides: {perView: 2, spacing: 32},
            // },
            // "(min-width: 1080px)": {
            //     slides: {perView: 4, spacing: 32},
            // },
            // "(min-width: 1536px)": {
            //     slides: {perView: 3, spacing: 32},
            // },
        },
        slides: {
            perView: 1,
            spacing: 32,
        },
    })

    const bgStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), linear-gradient(257deg, ${colors.base} 0%, rgba(146, 86, 32, 0.00) 25.01%, ${colors.base} 100%), linear-gradient(0deg, ${colors.base} 0%, ${colors.base} 100%), url(${backUrl! + background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "normal, normal, multiply, luminosity, normal"
    }

    useEffect(() => {
        if (active && background && color) {
            const themeColors = createColorPalette(color[0])
            setColors(themeColors)
        }
    }, [active]);

    return (
        <AnimatePresence initial={false} mode={"wait"}>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:h-hero text-white pt-8 lg:pt-0 overflow-x-hidden">
                <motion.div
                    key={"services"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.7}}
                    style={active ? bgStyle : undefined}
                    className={`relative flex items-center justify-start ${active ? "p-4 md:p-8 lg:p-12" : "py-14 px-4 lg:pl-32 bg-accent"} w-full lg:h-[40rem] rounded-lg overflow-hidden`}
                >
                    {!active &&
                        <>
                            <img
                                className="absolute inset-0 mix-blend-multiply w-full h-full backdrop-brightness-75"
                                src="/agorinfo-filigrane-min.png"
                                srcSet="/agorinfo-filigrane-min.png 200w, /agorinfo-filigrane-max.png 400w"
                                sizes="(max-width: 600px) 200px, 50vw"
                                alt=""
                            />
                            <div className="relative z-10">
                                <p className="text-h5 font-bold">{teaser}</p>
                                <Content btn1ClassName="btn btn-accent" content={text} headingStyle={{color: "#B2DFFF"}}
                                         headingClassName="max-w-[34rem]"/>
                                <div className="flex items-center gap-3">
                                    <ModalButton label="Réserver une démo" className="btn btn-accent w-full md:w-auto">
                                        <ContactForm/>
                                    </ModalButton>
                                </div>
                            </div>
                        </>
                    }
                    {active &&
                        modules.filter(module => active === module.attributes.slug).map(item => {
                            const {heroArchive} = item.attributes;
                            return (
                                <motion.div
                                    key={"service-" + item.id}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                    className="w-full flex flex-col justify-between h-full lg:justify-center"
                                >
                                    {heroArchive.logo &&
                                        <img
                                            src={backUrl + heroArchive.logo.data.attributes.url}
                                            alt={heroArchive.logo.data.attributes.alternativeText}
                                            className="lg:hidden w-32 h-12 rounded-lg shadow-slide object-cover mb-4"
                                        />
                                    }
                                    <div className="relative z-10 w-full">
                                        <motion.p
                                            key={"teaser-" + item.id}
                                            initial={{opacity: 0, x: -10}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: 10}}
                                            transition={{duration: 0.7}}
                                            className="pb-2"
                                        >
                                            {heroArchive.teaser}
                                        </motion.p>
                                        <div className="flex items-center justify-between pb-8">
                                            <motion.h1
                                                key={"h1-" + item.id}
                                                initial={{opacity: 0, x: -10}}
                                                animate={{opacity: 1, x: 0}}
                                                exit={{opacity: 0, x: 10}}
                                                transition={{duration: 0.7, delay: 0.2}}
                                                className="text-h4 lg:text-h2"
                                            >
                                                {heroArchive.title}
                                            </motion.h1>
                                            <motion.div
                                                key={"teaser-" + item.id}
                                                initial={{opacity: 0, x: 10, y: -15}}
                                                animate={{opacity: 1, x: 0, y: 0}}
                                                exit={{opacity: 0, x: 10, y: 15}}
                                                transition={{duration: 0.7}}
                                                className="hidden lg:block"
                                            >
                                                <ModalButton label="Réserver une démo" className="btn btn-gray">
                                                    <ContactForm/>
                                                </ModalButton>
                                            </motion.div>
                                        </div>
                                        <InformationCard colors={colors} data={heroArchive.informationCard}
                                                         modules={heroArchive.moduleList} logo={heroArchive.logo}/>
                                    </div>
                                    <motion.div
                                        key={"link" + item.id}
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -10}}
                                        transition={{duration: 0.7}}
                                        className="text-right"
                                    >
                                        <a
                                            href={"solutions/" + active}
                                            className="link-normal-white pt-8 inline-flex items-center gap-2"
                                        >
                                            {heroArchive.label}
                                            <Icon name="arrowRight"/>
                                        </a>
                                    </motion.div>
                                    <motion.div
                                        key={"teaser-" + item.id}
                                        initial={{opacity: 0, x: 10, y: -15}}
                                        animate={{opacity: 1, x: 0, y: 0}}
                                        exit={{opacity: 0, x: 10, y: 15}}
                                        transition={{duration: 0.7}}
                                        className="pt-4"
                                    >
                                        <ModalButton label="Réserver une démo"
                                                     className="btn btn-gray w-full md:w-auto lg:hidden">
                                            <ContactForm/>
                                        </ModalButton>
                                    </motion.div>
                                </motion.div>
                            )
                        })
                    }
                </motion.div>
                <div className="hidden lg:grid gap-8">
                    {modules.map(item => (
                        <SidebarCard active={active} setActive={setActive} key={item.id}
                                     service={item.attributes.slug}/>
                    ))}
                </div>
                <div ref={ref} className="keen-slider !overflow-visible lg:!hidden">
                    {modules.map(item => (
                        <div key={item.id} className="keen-slider__slide !min-w-[7.5rem] rounded-2xl">
                            <SidebarCard
                                active={active}
                                setActive={setActive}
                                service={item.attributes.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AnimatePresence>
    );
};

export default HeroArchive;