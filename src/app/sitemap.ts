import { MetadataRoute } from 'next';
import getServices from "@/actions/getServices";
import getSolutions from "@/actions/getSolutions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000';

    // Pages statiques
    const staticPages = ['', 'qui-sommes-nous', 'mentions-legales', 'services', 'solutions'].map(
        (page) => ({
            url: `${baseUrl}/${page}`,
            lastModified: new Date().toISOString(),
        })
    );

    // Pages dynamiques (remplacez cette partie par votre logique pour récupérer les slugs)
    const serviceSlugs = await getServices();
    const solutionSlugs = await getSolutions();

    const dynamicServicePages = serviceSlugs.map((data: {attributes: {slug:string}}) => ({
        url: `${baseUrl}/services/${data.attributes.slug}`,
        lastModified: new Date().toISOString(),
    }));

    const dynamicSolutionPages = solutionSlugs.map((data: {attributes: {slug:string}}) => ({
        url: `${baseUrl}/solutions/${data.attributes.slug}`,
        lastModified: new Date().toISOString(),
    }));

    return [
        ...staticPages,
        ...dynamicServicePages,
        ...dynamicSolutionPages,
    ];
}
