"use client"
import React, {useEffect, useState} from "react";
import {Tab, TabPanel} from "@/components/Tab";
import clsx from "clsx";
import {AnimatePresence, motion} from "framer-motion";
import Loader from "@/components/Loader";
import {CaretDown} from "@phosphor-icons/react";
import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer";

interface ModuleSystemProps {
    modulesData: any;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

type ActivitiesType = {
    id: number;
    attributes: {
        name: string;
    };
}
type DetailType = {
    id: number;
    title: string;
    detail: BlocksContent;
}

type ModuleType = {
    id: number;
    attributes: {
        name: string;
    }
}
type FeatureType = {
    id: number;
    attributes: {
        name: string;
    }
}

const ModuleSystem: React.FC<ModuleSystemProps> = ({modulesData, colors}) => {
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const [hydrated, setHydrated] = useState(false);
    const [open, setOpen] = useState(false);
    const sortModules = modulesData?.sort((a: any, b: any) => a.id - b.id);
    const activeModule = modulesData[activeModuleIndex];
    const activeFeature = activeModule?.attributes.features.data[activeFeatureIndex];

    useEffect(() => {
        setHydrated(true);
    });

    useEffect(() => {
        if (activeModuleIndex < modulesData.length) {
            const features = modulesData[activeModuleIndex].attributes.features.data;
            setActiveFeatureIndex(features.length > 0 ? 0 : -1);
        }
    }, [activeModuleIndex, modulesData]);

    if (!hydrated) return <Loader/>;
    return (
        <AnimatePresence mode="wait" initial={false}>
            <div
                className="pb-6 md:pb-8 lg:pb-12"
            >
                <div className="relative flex flex-col lg:flex-row justify-center">
                    <button
                        type="button"
                        className="flex justify-between items-center bg-accent-shine border border-grayscale-lighter rounded-lg py-3 px-4 mb-4 lg:hidden text-accent"
                        onClick={() => setOpen(!open)}
                    >
                        {modulesData[activeModuleIndex]?.attributes.name}
                        <CaretDown size={16}/>
                    </button>
                    <div
                        className={`absolute bg-white top-[54px] w-fit flex flex-col lg:flex-row justify-start rounded-lg border overflow-hidden lg:static lg:mb-12 divide-x transition-all duration-300 ease-linear
                        ${open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90 lg:scale-100 lg:opacity-100 lg:visible"}`}
                        role="tablist"
                        aria-label="Liste des modules"
                    >
                        {modulesData.map((module: ModuleType, index: number) => (
                            <Tab
                                key={"module-tabs-" + module.id}
                                index={module.id}
                                className={`px-4 py-3 w-full lg:w-auto ${activeModuleIndex === index ? "text-accent bg-accent-shine" : "text-grayscale-darker"}`}
                                id={`tab-module-${module.id}`}
                                isActive={activeModuleIndex === index}
                                onClick={() => {
                                    setActiveModuleIndex(index);
                                    setOpen(false);
                                }}
                                label={module.attributes.name}
                            />
                        ))}
                    </div>
                </div>

                <TabPanel
                    id={`tabpanel-module-${activeModule?.id}`}
                    labelledby={`tab-module-${activeModule?.id}`}
                    isActive={true}
                    className="flex lg:gap-8"
                >
                    <motion.div
                        layout
                        key={`module-${activeModule?.id}`}
                        className="w-full lg:w-[28.25%]"
                        role="tablist"
                        aria-label={`Liste des fonctionnalités de ${activeModule?.attributes.name}`}
                    >
                        <motion.div
                            layout
                            initial={{opacity: 0, x: 10}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -10}}
                            transition={{duration: 0.5}}
                            className="flex flex-col gap-8"
                        >
                            {activeModule?.attributes.features.data.map((feature: FeatureType, index: number) => {
                                const innerTabStyle = {
                                    backgroundColor: activeFeatureIndex === index ? "white" : colors.base,
                                    borderRight: activeFeatureIndex === index ? `8px solid ${colors.base}` : "0 solid transparent",
                                }
                                const minusStyle = {
                                    color: colors.base,
                                }
                                return (
                                    <div key={"feature-tabs-" + feature.id}>
                                        <Tab
                                            index={feature.id}
                                            style={innerTabStyle}
                                            iconStyle={minusStyle}
                                            id={`tab-feature-${feature.id}`}
                                            isActive={activeFeatureIndex === index}
                                            onClick={() => setActiveFeatureIndex(index)}
                                            label={feature.attributes.name}
                                            className={`w-full text-left text-h5 py-6 pl-6 rounded-2xl transition-all duration-300 ease-linear ${activeFeatureIndex === index ? "text-black shadow-featuredTab pr-4" : "text-white pr-6"}`}
                                        />
                                        {activeFeatureIndex !== -1 && activeFeature && (
                                            <TabPanel
                                                id={`tabpanel-feature-mobile-${activeFeature.id}`}
                                                labelledby={`tab-feature-${activeFeature.id}`}
                                                isActive={true}
                                                className={`w-full border border-grayscale-lighter bg-grayscale-lightest rounded-2xl overflow-auto p-6 md:p-8 lg:p-12 max-h-[610px]
                                                ${activeFeatureIndex === index ? "block lg:hidden" : "hidden"}`}
                                            >
                                                {/* Détails de la fonctionnalité active */}
                                                <motion.div
                                                    layout
                                                    initial={{opacity: 0, height: 0}}
                                                    animate={{opacity: 1, height: "auto"}}
                                                    exit={{opacity: 0, height: 0}}
                                                    transition={{duration: 0.5}}
                                                    key={`tag-${activeFeature.id}`}
                                                    className="flex flex-wrap items-center gap-4 pb-8"
                                                >
                                                    <h3>{activeModule?.attributes.name}</h3>
                                                    {activeFeature.attributes.activities.data.map((activity: ActivitiesType) => (
                                                        <span
                                                            key={"activity-mobile-" + activity?.id}
                                                            style={{
                                                                backgroundColor: colors.muted,
                                                                border: `1px solid ${colors.accent}`,
                                                                color: colors.base
                                                            }}
                                                            className="px-4 py-2 rounded-lg"
                                                        >
                                                            {activity?.attributes.name}
                                                        </span>
                                                    ))}
                                                </motion.div>
                                                <motion.div
                                                    layout
                                                    initial={{opacity: 0, x: 10}}
                                                    animate={{opacity: 1, x: 0}}
                                                    exit={{opacity: 0, x: -10}}
                                                    transition={{duration: 0.5}}
                                                    key={`content-${activeFeature.id}`}
                                                    className="p-4 rounded-lg bg-white flex-auto"
                                                >
                                                    {activeFeature.attributes.details.map((detail: DetailType) => {
                                                        return (
                                                            <div
                                                                className="pb-2 pt-2 border-b border-grayscale-lighter first:pt-0 last:border-0"
                                                                key={"detail-mobile" + detail.id}>
                                                                <h3 className={clsx("text-[1rem] font-semibold", detail.detail && "pb-2")}>{detail.title}</h3>
                                                                {detail && detail.detail &&
                                                                    <BlocksRenderer
                                                                        content={typeof detail.detail === "string" ? JSON.parse(detail.detail) : detail.detail}
                                                                        blocks={{
                                                                            paragraph: ({children}) =>
                                                                                <p
                                                                                    style={{
                                                                                        borderLeft: `1px solid ${colors.accent}`,
                                                                                    }}
                                                                                    className="text-[1rem] text-grayscale-darkest pl-4 whitespace-pre-line"
                                                                                >
                                                                                    {children}
                                                                                </p>,
                                                                            list: ({children}) =>
                                                                                <ul
                                                                                    style={{
                                                                                        borderLeft: `1px solid ${colors.accent}`,
                                                                                    }}
                                                                                    className="list-disc list-inside py-4 pl-4 text-grayscale-darker whitespace-pre-line "
                                                                                >
                                                                                    {children}
                                                                                </ul>,
                                                                            "list-item": ({children}) =>
                                                                                <li>
                                                                                    {children}
                                                                                </li>,
                                                                        }}
                                                                    />
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </motion.div>
                                            </TabPanel>
                                        )}
                                    </div>
                                )
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Contenu de la fonctionnalité active */}
                    {activeFeatureIndex !== -1 && activeFeature && (
                        <TabPanel
                            id={`tabpanel-feature-${activeFeature.id}`}
                            labelledby={`tab-feature-${activeFeature.id}`}
                            isActive={true}
                            className="hidden lg:block w-full border border-grayscale-lighter bg-grayscale-lightest rounded-2xl overflow-auto p-6 md:p-8 lg:p-12 max-h-[610px]"
                        >
                            {/* Détails de la fonctionnalité active */}
                            <motion.div
                                layout
                                initial={{opacity: 0, x: 10}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -10}}
                                transition={{duration: 0.5}}
                                key={`tag-${activeFeature.id}`}
                                className="flex items-center flex-wrap gap-4 pb-8"
                            >
                                {activeFeature.attributes.activities.data.map((activity: ActivitiesType) => (
                                    <span
                                        key={"activity-" + activity?.id}
                                        style={{
                                            backgroundColor: colors.muted,
                                            border: `1px solid ${colors.accent}`,
                                            color: colors.base
                                        }}
                                        className="px-4 py-2 rounded-lg"
                                    >
                                {activity?.attributes.name}
                            </span>
                                ))}
                            </motion.div>
                            <motion.div
                                layout
                                initial={{opacity: 0, x: 10}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -10}}
                                transition={{duration: 0.5}}
                                key={`content-${activeFeature.id}`}
                                className="p-8 rounded-lg bg-white flex-auto"
                            >
                                {activeFeature.attributes.details.map((detail: DetailType) => (
                                    <div
                                        className="pb-2 pt-4 border-b border-grayscale-lighter first:pt-0 last:border-0"
                                        key={"detail-" + detail.id}>
                                        <h3 className={clsx("text-[1rem] font-semibold", detail.detail && "pb-2")}>{detail.title}</h3>
                                        {detail && detail.detail &&
                                            <BlocksRenderer
                                                content={typeof detail.detail === "string" ? JSON.parse(detail.detail) : detail.detail}
                                                blocks={{
                                                    paragraph: ({children}) =>
                                                        <p
                                                            style={{
                                                                borderLeft: `1px solid ${colors.accent}`,
                                                            }}
                                                            className="text-[1rem] text-grayscale-darkest pl-4 whitespace-pre-line"
                                                        >
                                                            {children}
                                                        </p>,
                                                    list: ({children}) =>
                                                        <ul
                                                            style={{
                                                                borderLeft: `1px solid ${colors.accent}`,
                                                            }}
                                                            className="list-disc list-inside py-4 pl-4 text-grayscale-darker whitespace-pre-line "
                                                        >
                                                            {children}
                                                        </ul>,
                                                    "list-item": ({children}) =>
                                                        <li>
                                                            {children}
                                                        </li>,
                                                }}
                                            />
                                        }
                                    </div>
                                ))}
                            </motion.div>
                        </TabPanel>
                    )}
                </TabPanel>
            </div>
        </AnimatePresence>
    );
};

export default ModuleSystem;