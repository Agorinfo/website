"use server"

export default async function getFooter() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/footer?populate%5B0%5D=logo,%20socials,footerLinks.listItem`, {
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