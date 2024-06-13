import React from 'react';
import type {Metadata} from "next";
import getLegalNotices from "@/actions/getLegalNotices";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";

export const generateMetadata = async (): Promise<Metadata> => {
    const legal = await getLegalNotices();
    const global = await getGlobal();
    const metas = await legal.metas;
    const {BACK_URL} = process.env;

    return {
        metadataBase: new URL(metas?.canonicalUrl),
        title: metas.meta_title || "Agorinfo, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
        openGraph: {
            title: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Agorinfo, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : logiviande, SILOS , LSA et Comptinnov. Découvrez nos services, conseils, formations pour votre solution logiciele de gestion.",
            url: metas?.canonicalUrl,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: metas?.canonicalUrl,
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

const MentionsLegales = async () => {
    const legal = await getLegalNotices();
    return (
        <div className="py-8 md:py-12">
            <RichText content={legal.content} />
        </div>
    );
};

export default MentionsLegales;