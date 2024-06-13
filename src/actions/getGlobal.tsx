"use server"

export default async function getGlobal() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/global?populate%5B0%5D=favicon,%20logo,%20metas.shareImage,archiveSolutions.reassuranceSolution,%20archiveSolutions.cta,archiveSolutions.images,%20archiveSolutions.metas.shareImage,archiveServices.reassuranceSolution,archiveServices.cta,archiveServices.images,%20archiveServices.metas.shareImage`, {
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