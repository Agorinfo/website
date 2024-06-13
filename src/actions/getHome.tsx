"use server"

export default async function getHome() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/accueil?populate%5B0%5D=hero.content,%20hero.images,%20solutionUsers.listCard.item,%20testimonials.logo,%20testimonials.avatar,%20solutions.card.image,%20reassurance.images,%20reassurance.callToAction,%20strengths.card,%20support.content,%20support.image,%20callToAction.image`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json().then(res => res.data.attributes);
}