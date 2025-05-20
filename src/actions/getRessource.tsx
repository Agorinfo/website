"use server"

import {notFound} from "next/navigation";

export default async function getRessource(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/ressources?populate=*&filters[slug][$eq]=${slug}`, {
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