import { FormForgotPassword } from "@/features/auth/components/FormForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
};

const Page = () => {
    return <FormForgotPassword />;
};

export default Page;
