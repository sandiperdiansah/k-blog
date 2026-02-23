import { FormSignUp } from "@/features/auth/components/FormSignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

const Page = () => {
    return <FormSignUp />;
};

export default Page;
