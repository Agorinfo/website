"use server"

export default async function getRgpd() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/rgpd?populate[0]=metas.shareImage,tableData`, {
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