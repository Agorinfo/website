import React from 'react';
import emptyImg from "@/assets/empty-img.png";
import Link from "next/link";
import {createColorPalette} from "@/lib/createColorPalette";

type RelatedRessourceCardType = {
    thumbnail: string;
    alt: string;
    category: string;
    title: string;
    date: string;
    color: string;
    slug: string;
}

const RelatedRessourceCard = ({thumbnail, alt, category, title, date, color, slug }: RelatedRessourceCardType) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;

    const colors = createColorPalette(color);

    return (
        <Link
            href={`/ressources/${slug}`}
            className="grid grid-cols-3 gap-4 rounded-2xl overflow-hidden border-2"
            style={{borderColor: colors.base}}
        >
            <img
                className="w-full h-full object-cover"
                src={thumbnail ? backUrl + thumbnail : emptyImg.src}
                alt={alt}
            />
            <div className="col-span-2 p-4">
                <span
                    className="inline-block text-white px-2 py-1 rounded-lg mb-6"
                    style={{backgroundColor: color}}
                >
                    {category}
                </span>
                <h3 className="text-h5 font-bold pb-4">{title}</h3>
                <p>{date}</p>
            </div>
        </Link>
    );
};

export default RelatedRessourceCard;