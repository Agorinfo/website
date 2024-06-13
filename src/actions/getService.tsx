"use server"

import {notFound} from "next/navigation";

export default async function getService(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/services?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.informationCard,heroArchive.moduleList,heroArchive.background,%20reassurance.card,%20hero.images,%20hero.logo,%20step,%20stepImg,%20cta.image,%20cta.document,%20testimonial.logo,%20testimonial.avatar,%20solutionComp,%20metas.shareImage&filters%5Bslug%5D%5B%24eq%5D=${slug}`, {
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