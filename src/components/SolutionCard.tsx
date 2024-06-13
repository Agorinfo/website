import React from 'react';
import {SolutionCardType} from "@/utils/types";
import Button from "@/components/Button";

const SolutionCard = ({url, image, alt, category, solution}: SolutionCardType) => {
    return (
        <div>
            <a href={url}
               className="group mb-2 block h-96 overflow-clip rounded-lg bg-gray-100 shadow-lg lg:mb-3">
                <img
                    src={image}
                    loading="lazy" alt={alt}
                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
            </a>

            <div className="flex flex-col">
                <span className="text-grayscale-darker">{category}</span>
                <Button
                    url={url}
                    label={solution}
                   className="link"
                />
            </div>
        </div>
    );
};

export default SolutionCard;