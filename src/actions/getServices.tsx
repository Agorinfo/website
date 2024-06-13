"use server"

export default async function getServices() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/services?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.informationCard,heroArchive.moduleList,heroArchive.background,%20reassurance.card,%20hero.images,%20hero.logo,%20step,%20stepImg,%20cta.image,%20testimonial.logo,%20testimonial.avatar,%20solutionComp,%20metas.shareImage`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json().then(res => res.data);
}