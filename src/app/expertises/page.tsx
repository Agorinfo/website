import React from 'react';
import {QueryClient} from "@tanstack/react-query";
import getExpertise from "@/actions/getExpertise";
import HeroExpertises from "@/sections/HeroExpertises";
import SectionExpertises from "@/sections/SectionExpertises";
import type {Metadata} from "next";
import getAbout from "@/actions/getAbout";
import getGlobal from "@/actions/getGlobal";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL} = process.env;
    const about = await getExpertise();
    const global = await getGlobal();
    const metas = about.metas

    return {
        metadataBase: new URL(metas.canonicalUrl),
        title: metas.meta_title || "Agorinfo, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
        openGraph: {
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
            url: metas.canonicalUrl,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: metas.canonicalUrl,
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

const Expertises = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["expertise"],
        queryFn: () => getExpertise(),
    })

    return (
        <>
            <HeroExpertises/>
            <SectionExpertises/>
        </>
    );
};

export default Expertises;