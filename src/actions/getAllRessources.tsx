"use server";
export default async function getAllRessources(pageSize: number = 99) {
    const { API_URL, API_KEY } = process.env;

    let page = 1;
    let totalPages = 1;
    let allData: any[] = [];

    do {
        const res = await fetch(
            `${API_URL}/ressources?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        if (!res.ok) throw new Error("Failed to fetch resources");

        const json = await res.json();
        const { data, meta } = json;

        allData = [...allData, ...data];
        totalPages = meta.pagination.pageCount;
        page++;
    } while (page <= totalPages);

    return {
        data: allData,
        meta: {
            total: allData.length,
            pageCount: totalPages,
        },
    };
}
