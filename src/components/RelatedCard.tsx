"use client";
import React from 'react';
import RelatedRessourceCard from "@/components/RelatedRessourceCard";
import getRelatedRessources from "@/actions/getRelatedRessouces";
import Loader from "@/components/Loader";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";

const RelatedRessources = ({ressourceId}: {ressourceId: number}) => {
    const {data: ressources, error, isLoading} = useQuery({
        queryKey: ["related-ressources", ressourceId],
        queryFn: async () => await getRelatedRessources( ressourceId),
    });

    if (isLoading) return <Loader />

    if (error) return <p>{error?.message}</p>

    return (
        <>
            {ressources?.length > 0 &&
                <div>
                    <h3 className="text-h3 pb-12 font-bold text-center">Autres ressources</h3>
                    <div className="flex flex-col gap-12 pb-8 lg:pb-12">
                        {ressources?.map((ressource: any) => (
                            <RelatedRessourceCard
                                key={ressource.id}
                                slug={ressource.attributes.slug}
                                color={ressource.attributes.category?.data?.attributes.color}
                                thumbnail={ressource.attributes.featuredImage?.data?.attributes?.formats?.small
                                    ? ressource.attributes.featuredImage.data?.attributes.formats.small.url
                                    : ressource.attributes.featuredImage.data?.attributes.url}
                                alt={ressource.attributes.featuredImage?.data?.attributes?.alternativeText}
                                category={ressource.attributes.category?.data?.attributes.name}
                                title={ressource.attributes.title}
                                date={ressource.attributes.publishedAt}
                            />
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href={`/ressources`} className="btn btn-accent">
                            Voir plus
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};

export default RelatedRessources;