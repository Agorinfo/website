"use server"

export default async function getMenu() {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/menu?populate%5B0%5D=navItems.image,%20navItems.subNavItems`, {
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