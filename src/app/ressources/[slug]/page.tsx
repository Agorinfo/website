import React from 'react';
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import HeroRessource from "@/components/HeroRessource";
import RessourceContent from "@/components/RessourceContent";

export const generateMetadata = async ({params}: { params: { slug: string } }): Promise<Metadata> => {
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const ressource = await getRessource(params.slug);
    const metas = ressource[0]?.attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/" + params.slug),
        title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Agorinfo",
        openGraph: {
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Agorinfo",
            url: FRONT_URL + "/" + params.slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/" + params.slug,
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Agorinfo",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};


const Ressource = async ({params}: { params: { slug: string } }) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["ressource", params.slug],
        queryFn: () => getRessource(params.slug),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroRessource/>
            <RessourceContent/>
        </HydrationBoundary>
    );
};

export default Ressource;