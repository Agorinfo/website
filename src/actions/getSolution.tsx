"use server"

import {notFound} from "next/navigation";

export default async function getSolution(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/solutions?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.background,heroArchive.moduleList,%20reassurance.card,%20HeroPage.images,%20HeroPage.logo,%20HeroPage.content,%20cta,%20FeaturesReleased.details,%20featuresReleasedImg,%20newsletter,features,modules.features.activities,modules.features.details,%20modules.features.activities,%20solutionComp,%20metas.shareImage&filters%5Bslug%5D%5B%24eq%5D=${slug}`, {
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