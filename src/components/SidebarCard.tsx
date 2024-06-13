"use client"
import React, {useState} from 'react';
import Icon from "@/components/icons/Icon";

interface SidebarCardProps {
    service: string;
    active: string | undefined;
    setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SidebarCard = ({service, active, setActive}: SidebarCardProps ) => {

    let bgColor;
    let bgHover;
    let icon;
    let label;
    let borderColor;

    switch (service) {
        case "logiviande":
            bgColor = "bg-solution-logiviande"
            borderColor = "border-solution-logiviande"
            bgHover = "hover:bg-solution-logiviandeHover"
            icon = "logiviande"
            label = "Logiviande"
            break;
        case "silos":
            bgColor = "bg-solution-silos"
            borderColor = "border-solution-silos"
            bgHover = "hover:bg-solution-silosHover"
            icon = "silos"
            label = "Silos"
            break;
        case "lsa":
            bgColor = "bg-solution-lsa"
            borderColor = "border-solution-lsa"
            bgHover = "hover:bg-solution-lsaHover"
            icon = "lsa"
            label = "LSA"
            break;
        case "comptinnov":
            bgColor = "bg-solution-comptinnov"
            borderColor = "border-solution-comptinnov"
            bgHover = "hover:bg-solution-comptinnovHover"
            icon = "comptinnov"
            label = "Comptinnov"
            break;
        case "conseils":
            bgColor = "bg-featured-shadow"
            borderColor = "border-featured-shadow"
            bgHover = "hover:bg-featured"
            icon = "stepOne"
            label = "Conseils"
            break;
        case "installation":
            bgColor = "bg-accent"
            borderColor = "border-accent"
            bgHover = "hover:bg-accent-shadow"
            icon = "stepTwo"
            label = "Installation"
            break;
        case "formation":
            bgColor = "bg-featured"
            borderColor = "border-featured"
            bgHover = "hover:bg-featured-shadow"
            icon = "stepThree"
            label = "Formation"
            break;
        case "assistance":
            bgColor = "bg-accent-shadow"
            borderColor = "border-accent-shadow"
            bgHover = "hover:bg-accent"
            icon = "stepFour"
            label = "Assistance"
            break;
        default:
            break;
    }
    return (
        <button
            type={"button"}
            onClick={() => setActive(active === service ? undefined : service)}
            className={`sidebarCard min-w-[7.5rem] w-full lg:w-auto lg:min-w-[230px] ${active === service ? `border-b-4 pb-2 lg:border-b-0 lg:pb-6 lg:pr-4 lg:border-r-8 ${borderColor} bg-white text-black` : ` ${bgColor} ${bgHover}`} `}>
            <Icon name={icon!}/>
            <span className="flex-auto text-left">{label}</span>
        </button>
    );
};

export default SidebarCard;