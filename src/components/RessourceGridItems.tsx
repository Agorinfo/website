"use client";
import React, {useEffect, useState} from "react";
import RessourceCard from "@/components/RessourceCard";
import getAllRessources from "@/actions/getAllRessources";
import {useQuery} from "@tanstack/react-query";
import emptyImg from "@/assets/empty-img.png";
import Loader from "@/components/Loader";
import RessourcesFilter from "@/components/RessourcesFilter";
import {motion} from "framer-motion";
import {createColorPalette} from "@/lib/createColorPalette";
import {useSearchParams} from "next/navigation";

const PAGE_SIZE = 6;

const RessourceGridItems = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const [activeCategory, setActiveCategory] = useState<string | number | null>("all");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [renderedIds, setRenderedIds] = useState<Set<number>>(new Set());
    const searchParams = useSearchParams();

    const dataCat = searchParams.get("cat");
    useEffect(() => {
        if (dataCat) {
            setActiveCategory(Number(dataCat));
            setVisibleCount(PAGE_SIZE);
            setRenderedIds(new Set());
        }
    }, [dataCat]);

    const {data, isLoading, error} = useQuery({
        queryKey: ["all-ressources"],
        queryFn: () => getAllRessources(99),
    });


    const ressources = data?.data || [];

    const filteredData =
        activeCategory === "all"
            ? ressources
            : ressources.filter(
                (item) =>
                    item.attributes.category?.data.id === activeCategory
            );

    const visibleItems = filteredData.slice(0, visibleCount);
    const canLoadMore = visibleCount < filteredData.length;

    if (isLoading) return <Loader/>;
    if (error) return <p>{error.message}</p>;


    return (
        <section id={"ressources"} className="py-12">
            <h2 className="text-h2 text-center font-bold pb-6">Nos ressources</h2>

            <RessourcesFilter
                setActiveCategory={(cat) => {
                    setActiveCategory(cat);
                    setVisibleCount(PAGE_SIZE);
                    setRenderedIds(new Set());
                }}
                activeCategory={activeCategory}
            />


                <motion.div
                    layout
                    className="grid sm:grid-cols-2 gap-6 lg:grid-cols-3 md:gap-12 xl:gap-16"
                >
                    {visibleItems.map((item: any, index: number) => {
                        const ressource = item.attributes;
                        const id = item.id;

                        const isNew = !renderedIds.has(id);

                        const color = createColorPalette(
                            ressource.category?.data.attributes.color
                        );

                        return (
                                <RessourceCard
                                    key={id}
                                    id={id}
                                    colors={color}
                                    categoryColor={ressource.category?.data.attributes.color}
                                    src={
                                        ressource.featuredImage?.data
                                            ? ressource.featuredImage.data.attributes.formats?.thumbnail
                                                ? backUrl +
                                                ressource.featuredImage.data.attributes.formats.thumbnail.url
                                                : backUrl + ressource.featuredImage.data.attributes.url
                                            : emptyImg.src
                                    }
                                    alt={
                                        ressource.featuredImage?.data?.attributes?.alternativeText || ""
                                    }
                                    url={`/ressources/${ressource.slug}`}
                                    category={ressource.category?.data.attributes.name}
                                    title={ressource.title}
                                    shortDescription={ressource.shortDescription}
                                />
                        );
                    })}
                </motion.div>

            {
                canLoadMore && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                            className="px-6 py-2 border rounded bg-accent text-white hover:opacity-90"
                        >
                            Voir plus
                        </button>
                    </div>
                )
            }
        </section>
    )
        ;
};

export default RessourceGridItems;
