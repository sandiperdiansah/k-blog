import { Body, Head, Html, Preview } from "@react-email/components";

export const ForgotPassword = () => {
    return (
        <Html>
            <Head />
            <Body>
                <Preview>KV-Blog Reset your password</Preview>
            </Body>
        </Html>
    );
};
