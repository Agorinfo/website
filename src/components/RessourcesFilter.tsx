"use client"
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import getCategories from "@/actions/getCategories";
import Loader from "@/components/Loader";
import {createColorPalette} from "@/lib/createColorPalette";

type RessourcesFilterProps = {
    activeCategory: string | number | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<string | number | null>>;
};


const RessourcesFilter = ({setActiveCategory, activeCategory}: RessourcesFilterProps) => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    if (isLoading) return <p><Loader/></p>
    if (error) return <p>{error.message}</p>

    return (
        <div className="flex justify-center items-center gap-2 pb-12">
            {data.map((item: any) => {
                const colors = createColorPalette(item.attributes.color);
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveCategory(item.id !== activeCategory ? item.id : "all")}
                        style={{borderColor: colors.base, color: activeCategory === item.id ? "white" : item.attributes.color, backgroundColor: activeCategory === item.id ? item.attributes.color : ""}}
                        className="inline-block px-3 py-1.5 rounded-lg border"
                    >
                        {item.attributes.name}
                    </button>
                )
            })}
        </div>
    );
};

export default RessourcesFilter;