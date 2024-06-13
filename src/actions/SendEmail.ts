"use server"
import {sendMail} from "@/utils/sendEmail";

const send = async (subject:any, body:any) => {
    await sendMail({
        subject: subject,
        body: body
    })
}

export default send;