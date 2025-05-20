import React from 'react';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import HeroAbout from "@/sections/HeroAbout";
import Expertises from "@/sections/Expertises";
import Story from "@/sections/Story";
import TestimonialsAbout from "@/sections/TestimonialsAbout";
import {CallToActionNewsletter} from "@/components/CallToAction";
import Strengths from "@/sections/Strengths";
import getHome from "@/actions/getHome";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import TeamsDescription from "@/sections/TeamsDescription";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL} = process.env;
    const about = await getAbout();
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

const About = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroAbout />
            <Expertises />
            <TeamsDescription />
            <Story />
            <TestimonialsAbout />
            <Strengths />
            <CallToActionNewsletter />
        </HydrationBoundary>
    );
};

export default About;