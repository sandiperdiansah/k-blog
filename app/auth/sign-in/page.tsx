import { FormSignIn } from "@/features/auth/components/FormSignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
};

const Page = () => {
    return <FormSignIn />;
};

export default Page;
