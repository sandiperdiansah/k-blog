import { FormForgotPassword } from "@/features/auth/components/FormForgotPassword";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
};

const Page = () => {
    return (
        <>
            <Box spaceY={2}>
                <Heading
                    fontSize="2xl"
                    fontWeight="semibold"
                >
                    Forgot Password
                </Heading>
                <Text color="fg.muted">Enter your email to reset your password.</Text>
            </Box>

            <FormForgotPassword />
        </>
    );
};

export default Page;
