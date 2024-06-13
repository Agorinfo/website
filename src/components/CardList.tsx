import React from 'react';
import {CardListType} from "@/utils/types";

const CardList = ({label, color}: CardListType) => {

    let bgColor;

    switch (color) {
        case "bleu foncé":
            bgColor = "bg-featured-shadow";
            break
        case "violet":
            bgColor = "bg-accent";
            break
        case "bleu":
            bgColor = "bg-featured";
            break
        default:
            break
    }

    return (
        <span className={`w-full text-white font-bold text-h5 p-8 inline-block rounded-lg ${bgColor}`}>
            {label}
        </span>
    );
};

export default CardList;