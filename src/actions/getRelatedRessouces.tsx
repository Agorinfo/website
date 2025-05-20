"use server";

export default async function getRelatedRessources(categoryId: number, ressourceId: number) {
    const { API_URL, API_KEY } = process.env;

    const res = await fetch(
        `${API_URL}/ressources?populate=*&filters[category][id][$eq]=${categoryId}&filters[id][$ne]=${ressourceId}&pagination[pageSize]=3`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json().then(res => res.data);
}