import React from 'react';
import Icon from "@/components/icons/Icon";
import clsx from "clsx";
import {IconCardType} from "@/utils/types";

const IconCard = ({icon, className, size, colors}: IconCardType) => {

    return (
        <span
            style={colors && {backgroundColor: colors.base}}
            className={clsx(
            "text-white rounded-xl grid place-content-center shadow-lg",
            size === "small" && "size-12",
            size === "medium" && "size-14",
            className
        )}
        >
            <Icon name={icon} size={size === "small" ? 24 : 32}/>
        </span>
    );
};

export default IconCard;