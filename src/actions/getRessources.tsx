export default async function getRessources(page = 1, pageSize = 6) {
    const { API_URL, API_KEY } = process.env;

    const res = await fetch(
        `${API_URL}/ressources?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
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

    return res.json(); // Retourne un objet { data, meta }
}