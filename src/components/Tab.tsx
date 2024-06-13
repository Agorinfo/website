import React, {useState} from 'react';
import {motion} from "framer-motion";
import icon from "@/components/icons/Icon";
import {MinusCircle, PlusCircle} from "@phosphor-icons/react";
import clsx from "clsx";

interface TabProps {
    id: string;
    isActive: boolean;
    onClick: () => void;
    label: string;
    index: number;
    className: string;
    style?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
}


interface TabPanelProps {
    id: string;
    labelledby: string;
    isActive: boolean;
    children: React.ReactNode;
    className?: string;
}

interface TabListProps {
    tabs: { attributes: { name: string }; content: React.ReactNode }[];
    activeTab: number;
    setActiveTab: (index: number) => void;
}

export const Tab = ({id, label,isActive, onClick, index, className, style, iconStyle}: TabProps) => {
    return (
        <div role="tablist" aria-labelledby="Modules" >
                <button
                    style={style}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${index}`}
                    id={id}
                    key={index}
                    onClick={onClick}
                    tabIndex={isActive ? 0 : -1}
                    className={clsx("inline-flex items-center justify-between", className)}
                >
                    <span className="flex-auto inline-block truncate">{label}</span>
                    {isActive ?
                        <span className="inline-block size-8 lg:hidden">
                            <MinusCircle
                                style={iconStyle}
                                weight="fill"
                                size={32}
                            />
                        </span>
                        :
                        <span className="inline-block size-8 lg:hidden">
                            <PlusCircle
                            weight="fill"
                                size={32}
                            />
                        </span>
                    }
                </button>
        </div>
    );
};

export const TabPanel: React.FC<TabPanelProps> = ({ id, isActive, children,labelledby, className }) => {
    return (
        <motion.div
            layout
            role="tabpanel"
            id={id}
            aria-labelledby={labelledby}
            hidden={!isActive}
            className={className}
        >
            {children}
        </motion.div>
    );
};
