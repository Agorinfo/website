import {MetadataRoute} from 'next';
import getServices from "@/actions/getServices";
import getSolutions from "@/actions/getSolutions";
import getRessources from "@/actions/getRessources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000';

    // Pages statiques
    const staticPages = ['', 'qui-sommes-nous', 'mentions-legales', 'services', 'solutions', 'ressources', 'expertises'].map(
        (page) => ({
            url: `${baseUrl}/${page}`,
            lastModified: new Date().toISOString(),
        })
    );

    // Pages dynamiques (remplacez cette partie par votre logique pour récupérer les slugs)
    const serviceSlugs = await getServices();
    const solutionSlugs = await getSolutions();
    const ressourceSlugs = await getRessources();
    console.log("ressources : ",ressourceSlugs);
    const dynamicServicePages = serviceSlugs.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/services/${data.attributes.slug}`,
        lastModified: new Date().toISOString(),
    }));

    const dynamicSolutionPages = solutionSlugs.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/solutions/${data.attributes.slug}`,
        lastModified: new Date().toISOString(),
    }));

    const dynamicRessourcePages = ressourceSlugs.data.map((data: { attributes: { slug: string } }) => ({
        url: `${baseUrl}/ressources/${data.attributes.slug}`,
        lastModified: new Date().toISOString(),
    }));

    return [
        ...staticPages,
        ...dynamicServicePages,
        ...dynamicSolutionPages,
        ...dynamicRessourcePages,
    ];
}
