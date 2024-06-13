import React from 'react';
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import getRgpd from "@/actions/getRgpd";
import RichText from "@/components/RichText";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL} = process.env;
    const rgpd = await getRgpd();
    const global = await getGlobal();
    const metas = rgpd.metas

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

const Rgpd = async () => {
    const rgpd = await getRgpd();

    return (
        <div className="py-8 md:py-12 text-sm">
            <RichText content={rgpd.content} />
            <div className="border">
                <div className="hidden md:flex divide-x md:justify-between md:items-center md:py-2 md:border-b">
                    <span className="inline-block pl-4 font-semibold">
                        Type de Données
                    </span>
                    <div className="divide-x">
                        <span className="inline-block w-[170px] text-center font-semibold">Données des salariés</span>
                        <span className="inline-block w-[170px] text-center font-semibold">Données des tiers</span>
                    </div>
                </div>

                {rgpd.tableData.map((item:any) => (
                    <div className="border-b" key={item.id}>
                        <div className="divide-x flex flex-col md:flex-row justify-between md:items-center py-2">
                            <span className='inline-block pl-4'>{item.type}</span>
                            <div className="divide-x flex items-center justify-center md:justify-normal">
                                <span className="inline-block w-[170px] text-center"><span className="md:hidden text-sm">Employés : </span>{item.employeeData ? "✔️" : "❌"}</span>
                                <span className="inline-block w-[170px] text-center"><span className="md:hidden text-sm">Tiers : </span>{item.thirdPartyData ? "️✔️" : "❌"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rgpd;