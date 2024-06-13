"use client"
import Icon from "@/components/icons/Icon";
import ModuleSystem from "@/components/TabSystem";
import React from "react";

interface SolutionFeatureProps {
    icon: string;
    title: string;
    teaser: string;
    dataModules: [];
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    };

}

const SolutionFeatures = ({icon, title, teaser, dataModules, colors}: SolutionFeatureProps) => {
    return (
        <div id="features">
            <div className="flex flex-col gap-6 justify-center items-center pb-6 md:pb-8 lg:pb-12">
                <span style={{color: colors.base}}>
                    <Icon name={icon} size={40}/>
                </span>
                <h2 className="text-h3 font-bold">{title}</h2>
                <p className="paragraph">{teaser}</p>
            </div>
            <ModuleSystem modulesData={dataModules} colors={colors} />
        </div>
    );
};

export default SolutionFeatures;