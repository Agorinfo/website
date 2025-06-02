import React, {useState} from 'react';
import Button, {ModalButton} from "@/components/Button";
import SidebarCard from "@/components/SidebarCard";
import Modal from "@/components/Modal";
import ContactForm from "@/components/ContactForm";
import Content from "@/components/Content";
import {HeroArchiveServiceType} from "@/utils/types";
import InformationCard from "@/components/InformationCard";
import {AnimatePresence, motion} from "framer-motion";
import Icon from "@/components/icons/Icon";
import {useKeenSlider} from "keen-slider/react";

const HeroArchiveService = ({teaser, text, label, url, modules,}: HeroArchiveServiceType) => {
    const [active, setActive] = useState<string | undefined>();
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    const background = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.heroArchive.background.data.attributes.url);
    const color = modules.filter(module => active === module.attributes.slug).map(item => item.attributes.brandColor);

    const [ref] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "(min-width: 400px)": {
                slides: {perView: 3, spacing: 8},
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
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), linear-gradient(257deg, ${color[0]} 0%, rgba(146, 86, 32, 0.00) 25.01%, ${color[0]} 100%), linear-gradient(0deg, ${color[0]} 0%, ${color[0]} 100%), url(${backUrl! + background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "normal, normal, multiply, luminosity, normal"
    }

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
                    className={`relative flex items-center justify-start ${active ? "p-4 md:p-8 lg:p-12" : "py-14 px-4 lg:pl-32 bg-accent"} w-full h-[40rem] rounded-lg overflow-hidden`}
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
                                    className="w-full"
                                >
                                    <motion.div
                                        key={"icon-" + item.id}
                                        initial={{opacity: 0, x: -10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: 10}}
                                        transition={{duration: 0.7}}
                                        className="lg:hidden pb-8">
                                        <Icon name={heroArchive.icon!} size={48}/>
                                    </motion.div>
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
                                                className="text-h4 lg:text-h2 font-bold"
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
                                        <InformationCard
                                            colors={{
                                                base: item.attributes.brandColor,
                                                badge: item.attributes.badgeColor
                                            }}
                                            badge={heroArchive.badge}
                                            icon={heroArchive.icon}
                                            data={heroArchive.informationCard}
                                            modules={heroArchive.moduleList}
                                            logo={heroArchive.logo}
                                        />
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
                                            href={"services/" + active}
                                            className="link-normal-white pt-8 inline-flex items-center gap-2"
                                        >
                                            {label}
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
                                        <ModalButton label="Réserver une démo" className="btn btn-gray w-full lg:hidden">
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

export default HeroArchiveService;