import HeroHome from "@/sections/HeroHome";
import SolutionsUsers from "@/sections/SolutionsUsers";
import Testimonials from "@/sections/Testimonials";
import Solution from "@/sections/Solutions";
import ReassuranceHome from "@/sections/ReassuranceHome";
import Strengths from "@/sections/Strengths";
import Support from "@/sections/Support";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import CtaHome from "@/sections/CtaHome";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL} = process.env;
    const global = await getGlobal();
    const metas = global.metas

    return {
        metadataBase: new URL(global?.canonical_url),
        title: metas.meta_title || "Massalikulu'lum | Formateur en langue arabe",
        description: metas?.meta_description || "L'institut Massalikul'ulum offre des cours d'arabe de haute qualité à différents niveaux, ainsi que des cours d'apprentissage du Coran ",
        openGraph: {
            title: metas?.meta_title || "Massalikulu'lum | Formateur en langue arabe",
            siteName: metas?.meta_title || "Massalikulu'lum | Formateur en langue arabe",
            description: metas?.meta_description || "L'institut Massalikul'ulum offre des cours d'arabe de haute qualité à différents niveaux, ainsi que des cours d'apprentissage du Coran ",
            url: global?.canonical_url,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: global?.canonical_url,
            title: metas?.meta_title || "Massalikulu'lum | Formateur en langue arabe",
            description: metas?.meta_description || "L'institut Massalikul'ulum offre des cours d'arabe de haute qualité à différents niveaux, ainsi que des cours d'apprentissage du Coran ",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

export default async function Home() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroHome/>
            <SolutionsUsers />
            <Testimonials />
            <Solution />
            <ReassuranceHome />
            <Strengths />
            <Support />
            <CtaHome />
            </HydrationBoundary>
        </>
    );
}
