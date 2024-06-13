import React from 'react';
import {notFound} from "next/navigation";
import HeroPage from "@/components/HeroPage";
import {createColorPalette} from "@/lib/createColorPalette";
import {CallToActionNewsletter, CallToActionPage} from "@/components/CallToAction";
import SolutionFeatures from "@/sections/SolutionFeatures";
import FeaturesReleased from "@/sections/FeaturesReleased";
import ReassuranceSolution from "@/sections/ReassuranceSolution";
import RelatedServices from "@/sections/RelatedServices";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import getSolution from "@/actions/getSolution";

 async function getData(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/solutions?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.background,heroArchive.moduleList,%20reassurance.card,%20HeroPage.images,%20HeroPage.logo,%20HeroPage.content,%20cta,%20FeaturesReleased.details,%20featuresReleasedImg,%20newsletter,features,modules.features.activities,modules.features.details,%20modules.features.activities,%20solutionComp&filters%5Bslug%5D%5B%24eq%5D=${slug}`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        return notFound()
    }

    return res.json().then(res => res.data);
}

export const generateMetadata = async ({params}: {params : {slug: string}}): Promise<Metadata> => {
    const {BACK_URL} = process.env;
    const solution = await getSolution(params.slug)
    const global = await getGlobal();
    const metas = solution[0].attributes.metas

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

const Solution = async ({params}: {params : {slug: string}}) => {
    const data = await getData(params.slug);
    const colors = createColorPalette(data[0].attributes.brandColor);

    return (
        <>
            <HeroPage
                images={data[0].attributes.HeroPage.images}
                teaser={data[0].attributes.HeroPage.content.teaser}
                content={data[0].attributes.HeroPage.content.content}
                label1={data[0].attributes.HeroPage.content.label1}
                url1={data[0].attributes.HeroPage.content.url1}
                label2={data[0].attributes.HeroPage.content.label2}
                url2={data[0].attributes.HeroPage.content.url2}
                background={data[0].attributes.brandImg.data.attributes}
                colors={colors}
            />
            <CallToActionPage
                title={data[0].attributes.cta.title}
                text={data[0].attributes.cta.text}
                buttonClassName="text-white outline-none ring-accent-muted focus-visible:ring"
                colors={colors}
            />
            <SolutionFeatures
                icon={data[0].attributes.icon}
                title={data[0].attributes.featureTitle}
                teaser={data[0].attributes.featureTeaser}
                dataModules={data[0].attributes.modules.data}
                colors={colors}
            />
            <FeaturesReleased
                data={data[0].attributes.FeaturesReleased}
                image={data[0].attributes.featuresReleasedImg}
                colors={colors}
            />
            <ReassuranceSolution data={data[0].attributes.reassurance} colors={colors} />
            <RelatedServices title="En complément" solutions={data[0].attributes.solutionComp.map((solution: any) => solution.solution)} />
            <CallToActionNewsletter />
        </>
    );
};

export default Solution;