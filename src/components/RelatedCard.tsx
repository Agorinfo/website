"use client"
import React from 'react';
import Button from "@/components/Button";
import Icon from "@/components/icons/Icon";
import {RelatedCardType} from "@/utils/types";
import {Check} from "@phosphor-icons/react";
import clsx from "clsx";

const RelatedCard = ({icon, title, text, listItems, label, url, className}: RelatedCardType) => {

    return (
        <div className={clsx("relative px-4 pb-4 pt-6 border border-grayscale-lighter rounded-lg flex flex-col gap-4", className)}>
            <span
                className="size-12 rounded-xl bg-accent-muted text-accent inline-flex justify-center items-center absolute top-[-0.625rem] left-4">
                <Icon
                    size={24}
                    name={icon}
                />
            </span>
            <h3 className="text-center text-featured text-h4 font-bold">{title}</h3>
            <p className="paragraph max-w-[18rem] mx-auto text-center pb-8">{text}</p>
            {listItems &&
                <ul>
                    {listItems.map(item => (
                        <li key={item.id} className="flex items-center gap-2 text-grayscale-darkest "><Check
                            className="text-accent" size={24}/>{item.listItem}</li>
                    ))}
                </ul>}
            <Button
                label={label}
                url={url}
                className="btn btn-accent mt-auto"
            />
        </div>
    );
};

export default RelatedCard;