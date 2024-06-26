'use client'
import React, {useState} from 'react';
import {CaretUp} from "@phosphor-icons/react";
import {motion, AnimatePresence} from "framer-motion";

interface FeatureReleasedItemProps {
    title: string;
    description: string;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

const FeatureReleasedItem = ({title, description, colors}: FeatureReleasedItemProps) => {
    const beforeStyle = `
        .release:before {
            background-color: ${colors.accent};
        }
    `
    return (
        <div className="pl-[2.75rem] relative mt-4">
            <style>{beforeStyle}</style>
            <h3 className="release text-h5 font-semibold before:block before:size-3 before:rounded-full before:absolute before:-left-[0.375rem] before:top-2.5">{title}</h3>
            <p className="paragraph text-left">{description}</p>
        </div>
    );
};

interface LastFeatureReleasedProps {
    open: number | undefined;
    id: number;
    index: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    version: string;
    title: string;
    description: string;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

const LastFeatureReleased = ({
                                 open,
                                 id,
                                 index,
                                 onClick,
                                 version,
                                 title,
                                 description,
                                 colors
                             }: LastFeatureReleasedProps) => {
    const versionStyle = {
        backgroundColor: colors.muted,
        border: `1px solid ${colors.accent}`,
        color: colors.base
    }
    return (
        <button
            type="button"
            aria-expanded={index === open && true}
            aria-controls={`control-${id}-${index}`}
            id={`${id}-${index}`}
            onClick={onClick}
            className="relative pl-[2.75rem]"
        >
            <span style={versionStyle}
                  className="absolute left-[-1.75rem] top-0 w-14 inline-flex items-center justify-center py-2 rounded-lg leading-[137.5%]">{version}</span>
            <span className="flex items-center justify-between flex-auto">
                    <h3 className="text-h5 font-semibold">{title}</h3>
                    <CaretUp
                        className={`transition-rotate duration-300 ease-linear ${index === open ? "rotate-0" : "rotate-180"}`}
                        size={24}/>
                </span>
            <p className="paragraph text-left">
                {description}
            </p>
        </button>
    );
};

interface FeatureReleasedProps {
    data: {
        id: number;
        version: string;
        details: {
            title: string;
            description: string;
        }[]
    };
    index: number;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

const FeatureReleased = ({data, index, colors}: FeatureReleasedProps) => {
    const [open, setOpen] = useState<number | undefined>(0);
    return (
        <div className="pl-[1.75rem] relative flex flex-col justify-start h-fit pb-8">
            <div style={{backgroundColor: colors.muted,}} className="absolute h-full w-px left-[1.75rem] top-0"/>
            <LastFeatureReleased
                version={data.version}
                title={data.details[0].title}
                description={data.details[0].description}
                id={data.id}
                index={index}
                open={open}
                colors={colors}
                onClick={() => setOpen(open === index ? undefined : index)}
            />
            <AnimatePresence>
                {open === index &&
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {opacity: 1, height: "auto"},
                            collapsed: {opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
                        id={`control-${data.id}-${index}`}
                        role="region"
                        aria-labelledby={`${data.id}-${index}`}
                        className={index === open ? '' : 'hidden'}
                    >
                        {data.details.slice(1).map((item, index) => (
                            <FeatureReleasedItem
                                colors={colors}
                                key={index}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
}

export default FeatureReleased;
