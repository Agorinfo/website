import React from 'react';
import {NavCardType} from "@/utils/types";
import Link from "next/link";
import IconCard from "@/components/icons/IconCard";

const NavCard = ({icon, title, description, url, setIsOpen, setOpenSubNav}: NavCardType) => {
    return (
        <Link onClick={() => {
            setIsOpen(false);
            setOpenSubNav(undefined);
        }} href={url} className="flex gap-4">
           <div className="w-12">
               <IconCard icon={icon} size={"small"} className="bg-accent" />
           </div>
            <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-greyscale-darker">{description}</p>
            </div>
        </Link>
    );
};

export default NavCard;