import React from 'react';
import {Check} from "@phosphor-icons/react";
import Icon from "@/components/icons/Icon";
import {motion} from "framer-motion";

interface InformationCardProps {
    logo?: {
        data: {
            attributes: {
                url: string;
                alternativeText: string;
            }
        }
    }
    data: {
        id: number;
        title: string;
        text: string;
        image?: {
            data: {
                attributes: {
                    url: string;
                    alternativeText: string;
                }
            }
        }
    }
    modules: {
        id: number;
        listItem: string;
    }[];
    badge?: string;
    icon?: string;
    colors?:{
        base?: string;
        badge?: string;
    }
}

const InformationCard = ({logo, data, modules, badge, icon, colors}: InformationCardProps) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    return (
        <motion.div
            key={"card"}
            initial={{opacity: 0, y:15}}
            animate={{opacity: 1, y:0}}
            exit={{opacity: 0, y:-15}}
            transition={{duration: 0.7}}
            className="flex text-grayscale-darkest lg:h-[14.875rem] bg-white rounded-lg">
            <div className="relative w-[14.875rem] hidden lg:block">
                {data.image?.data &&
                    <img
                        className="hidden lg:block w-full h-full object-cover rounded-l-lg"
                        src={backUrl + data.image.data.attributes.url}
                        alt={data.image.data.attributes.alternativeText}
                    />
                }
                {icon &&
                    <div style={{backgroundColor: colors?.badge, color: colors?.base}} className="w-full h-full rounded-l-lg hidden lg:grid place-items-center">
                        <Icon name={icon} size={91} />
                    </div>
                }
                {logo?.data &&
                    <img
                        src={backUrl + logo.data.attributes.url}
                        alt={logo.data.attributes.alternativeText}
                        className="hidden lg:block absolute -bottom-4 left-4 w-32 h-12 rounded-lg shadow-slide object-cover"
                    />
                }
            </div>
            <div className="p-8 bg-white flex-auto rounded-lg lg:rounded-r-lg">
                {badge &&
                    <span
                        className="px-4 py-2 rounded-lg mb-4 inline-block"
                        style={{backgroundColor: colors?.badge, color: colors?.base}}
                    >
                        {badge}
                    </span>}
                <p style={{color: colors?.base}}
                   className="font-bold pb-2"
                >
                    {data.title}
                </p>
                <p className="pb-8">{data.text}</p>
                <ul className="grid lg:grid-cols-2 gap-x-6 gap-y-2">
                    {modules && modules.map((module) => (
                        <li
                            className="flex items-center gap-3"
                            key={module.id}>
                            <Check style={{color:colors?.base}} size={24}/>
                            {module.listItem}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default InformationCard;