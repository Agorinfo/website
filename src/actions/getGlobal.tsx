"use server"

export default async function getGlobal() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/global?populate%5B0%5D=favicon,logo,metas.shareImage,archiveSolutions.reassuranceSolution,archiveSolutions.cta,archiveSolutions.images,archiveSolutions.metas.shareImage,archiveServices.reassuranceSolution,archiveServices.cta,archiveServices.images,archiveServices.metas.shareImage,archiveRessources.image, archiveRessources.metas,archiveRessources.cta,addressComp`, {
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