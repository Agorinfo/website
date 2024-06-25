import nodemailer from 'nodemailer';

export async function sendMail({subject, body}: {
    subject: string,
    body: string
}) {
    const {SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, EMAIL, SMTP_HOST,SMTP_PORT,} = process.env;
    console.log("Test JCH", SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, EMAIL, SMTP_HOST, SMTP_PORT);
    const transport = nodemailer.createTransport({
        host: "mail.agorinfo.fr",
        port: 465,
        secure: true,
        auth: {
            user: "no-reply@agorinfo.fr",
            pass: "6zbzV057#8Gug6t83^",
        },
    });
    console.log("transport", transport);
    try {
        const testResult = await transport.verify();
        console.log(testResult);
    } catch (e) {
        console.error(e);
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: FROM_EMAIL,
            to: EMAIL,
            subject,
            html: body
        })
        console.log(sendResult);
    } catch (e) {
        console.error(e)
    }
}