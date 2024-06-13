import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(request) {
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
    const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_PROTOCOLE } = process.env;

    const formData = await request.formData()
    const name = formData.get('name');
    const firstname = formData.get('firstname');
    const company = formData.get('company');
    const email = formData.get('email');
    const tel = formData.get('tel');
    const object = formData.get('object');
    const message = formData.get('message');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: SMTP_HOST,
        // port: SMTP_PORT,
        // protocol: SMTP_PROTOCOLE,
        secure: true,
        auth: {
            user: "agorinfo@agorinfo.fr",
            pass: "6zbzV057#8Gug6t83^"
        },
    });

    try {
        const testResult = await transporter.verify();
        console.log(testResult);
    } catch (e) {
        console.error(e);
    }

    try {

        const mail = await transporter.sendMail({
            from: SMTP_EMAIL,
            to: "drfyah@gmail.com", //pour la vérification, renseigner l'email du formulaire
            replyTo: email,
            subject: `Demande en provenance de votre site, de: ${firstname} ${name} `,
            html: `
            <h1>${object}</h1>
            <p>Name : ${firstname} ${name}</p>
            <p>Entreprise : ${company}</p>
            <p>Email : ${email} </p>
            <p>Téléphone : ${tel}</p>
            <p>Message : ${message} </p>
            `,
        })

        return NextResponse.json({ message: "L'email a été envoyé avec succès" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: "L'email n'a pas pu être envoyé" })
    }
}