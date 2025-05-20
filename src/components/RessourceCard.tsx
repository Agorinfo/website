"use client";
import React from 'react';
import emptyImg from "@/assets/empty-img.png"
import Link from "next/link";
import clsx from "clsx";
import {AnimatePresence, motion} from "framer-motion";

type RessourceCardProps = {
    id: number;
    src: string;
    alt: string;
    url: string;
    category: string;
    title: string;
    shortDescription: string;
    categoryColor: string;
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
        shadow: string;
        border: string;
    }
}

const RessourceCard = ({id, src, alt, url, category, title, shortDescription, colors, categoryColor}: RessourceCardProps) => {
    const [hover, setHover] = React.useState(false);
    return (
        <AnimatePresence mode={"popLayout"}>
        <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={id}
            className={clsx("rounded-lg bg-white border-2 overflow-hidden flex flex-col")}
             style={{borderColor: colors.border}}
        >
            <img className="h-[12rem] w-full object-cover" src={src ? src : emptyImg.src} alt={alt ? alt : ""}/>
            <div className="flex flex-col items-start justify-between flex-auto p-4">
                <span
                    className={clsx("inline-block px-3 py-1.5 text-white rounded-lg mb-2")}
                    style={{backgroundColor: categoryColor}}
                >
                    {category}
                </span>
                <h3 className="text-titleCard pb-2 font font-bold">{title}</h3>
                <p className="text-grayscale-darker mb-4 text-ellipsis line-clamp-6">{shortDescription}</p>
                <Link
                    href={url}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className={clsx("btn w-full border")}
                    style={{borderColor: hover ? colors.base : "#E7E7E7", color: hover ? colors.hover : colors.border}}
                >
                    {category === "article" ? "Lire l'article" : "Lire le témoignage"}
                </Link>
            </div>
        </motion.div>
        </AnimatePresence>
    );
};

export default RessourceCard;