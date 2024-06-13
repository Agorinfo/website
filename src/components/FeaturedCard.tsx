"use client"
import React from 'react';
import IconCard from "@/components/icons/IconCard";
import {FeaturedCardType} from "@/utils/types";
import clsx from "clsx";
import Link from "next/link";

const FeaturedCard = ({icon, title, text, colors, iconClassName, className, link}: FeaturedCardType) => {
    return (
        <div className={clsx("flex gap-4 md:gap-6", className)}>
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                {!link ?
                    <IconCard
                        colors={colors}
                        icon={icon}
                        size="medium"
                        className={iconClassName}
                    />
                    :
                    <Link href={link}>
                        <IconCard
                            colors={colors}
                            icon={icon}
                            size="medium"
                            className={iconClassName}
                        />
                    </Link>
                }
            </div>
            <div>
                {!link ?
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">{title}</h3>
                    :
                    <Link href={link} className="mb-2 text-lg font-semibold md:text-xl">{title}</Link>
                }
                <p className="mb-2">{text}</p>
            </div>
        </div>
    );
};

export default FeaturedCard;