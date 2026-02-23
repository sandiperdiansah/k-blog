import { FormResetPassword } from "@/features/auth/components/FormResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
};

const Page = async ({ searchParams }: { searchParams: Promise<{ token: string }> }) => {
    const { token } = await searchParams;

    console.log("token", token);

    return <FormResetPassword token={token} />;
};

export default Page;
