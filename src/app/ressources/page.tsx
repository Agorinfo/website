import React from 'react';
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import HeroRessources from "@/components/HeroRessources";
import RessourceGridItems from "@/components/RessourceGridItems";
import getCategories from "@/actions/getCategories";
import getFaq from "@/actions/getFaq";
import SectionFaq from "@/components/SectionFaq";
import getAllRessources from "@/actions/getAllRessources";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const metas = global.archiveServices.metas

    return {
        metadataBase: new URL(FRONT_URL + "/services"),
        title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
        openGraph: {
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            url: FRONT_URL + "/services",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/services",
            title: metas?.meta_title || "Wenegoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Wenegoce",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

const Ressources = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["ressources"],
        queryFn: () => getAllRessources(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["faq"],
        queryFn: () => getFaq(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroRessources/>
            <RessourceGridItems/>
            <SectionFaq />
        </HydrationBoundary>
    );
};

export default Ressources;