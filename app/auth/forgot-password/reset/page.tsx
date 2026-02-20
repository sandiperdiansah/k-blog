import { FormResetPassword } from "@/features/auth/components/FormResetPassword";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
};

const Page = () => {
    const p = true;

    return (
        <>
            <Box spaceY={2}>
                <Heading
                    fontSize="2xl"
                    fontWeight="semibold"
                >
                    Reset Password
                </Heading>
                <Text color="fg.muted">Enter your new password and OTP code.</Text>
            </Box>

            <FormResetPassword />
        </>
    );
};

export default Page;
