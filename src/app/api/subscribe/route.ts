import { NextResponse } from "next/server"


export async function POST(
    request: Request,
) {
    const {PIPEDRIVE_API_KEY,PIPEDRIVE_API_URL, PERSON_ID } = process.env;

    if (request.method === 'POST') {
        const {email} = await request.json();
        const data = {
            title: email,
            person_id: parseInt(PERSON_ID!)
        };
        console.log(request);
        try {
            const response = await fetch(`${PIPEDRIVE_API_URL}?api_token=${PIPEDRIVE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) // Structurez votre payload selon l'API de Pipedrive
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return NextResponse.json({message:'Success', data: result}, {status: 200});
        } catch (error) {
            return NextResponse.json({ message: 'Failed to subscribe' });
        }
    } else {
        return NextResponse.json({ message: '`Method ${request.method} Not Allowed`' }, {status: 405});
    }
}