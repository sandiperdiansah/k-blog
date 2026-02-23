import { Resend } from "resend";

type SendEmailProps = {
    to: string;
    subject: string;
    text: string;
};

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.RESEND_SENDER_FROM as string,
        to,
        subject,
        text,
    });
};
