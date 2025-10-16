import React from 'react';
import Loader from "@/components/Loader";
import HeroService from "@/components/HeroService";
import {CallToActionImage, CallToActionNewsletter} from "@/components/CallToAction";
import TestimonialsPage from "@/sections/TestimonialsPage";
import getService from "@/actions/getService";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";

// async function getData(slug:string) {
//     const {API_URL, API_KEY} = process.env
//     const res = await fetch(`${API_URL}/services?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.informationCard,heroArchive.moduleList,%20reassurance.card,%20hero.images,%20hero.logo,%20step,%20stepImg,%20cta.image,%20testimonial.logo,%20testimonial.avatar,%20solutionComp&filters%5Bslug%5D%5B%24eq%5D=${slug}`,{
//         cache: "no-store",
//         headers: {
//             Authorization: `Bearer ${API_KEY}`
//         }
//     });
//
//     if(!res.ok) {
//         return notFound()
//     }
//
//     return res.json().then(res => res.data);
// }

export const generateMetadata = async ({params}: {params : {slug: string}}): Promise<Metadata> => {
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const service = await getService(params.slug);
    const metas = service[0].attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/services/" + params.slug),
        title: metas.meta_title || "Agorinfo, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
        openGraph: {
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
            url: FRONT_URL + "/services/" + params.slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/services/" + params.slug,
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

const Service = async ({params}: {params : {slug: string}}) => {
    const data = await getService(params.slug);

    if(!data) return <Loader />;

    return (
        <>
            <HeroService
                title={data[0].attributes.hero.title}
                icon={data[0].attributes.hero.icon}
                teaser={data[0].attributes.hero.teaser}
                steps={data[0].attributes.step}
                heroImg={data[0].attributes.hero.images.data}
                stepImg={data[0].attributes.stepImg}
                logo={data[0].attributes.hero.logo}
            />
            {data[0].attributes.cta && <CallToActionImage
                document={data[0].attributes.cta.document?.data?.attributes.url}
                title={data[0].attributes.cta.title}
                text={data[0].attributes.cta.text}
                image={data[0].attributes.cta.image}
                color={data[0].attributes.cta.background}
                position={data[0].attributes.cta.position}
                label={data[0].attributes.cta.label}
                url={data[0].attributes.cta.url}
            />}
            {data[0].attributes.testimonial.length > 0 && <TestimonialsPage testimonials={data[0].attributes.testimonial}/>}
            <CallToActionNewsletter />
        </>
    );
};

export default Service;