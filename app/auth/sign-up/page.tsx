import { FormSignUp } from "@/features/auth/components/FormSignUp";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

const Page = () => {
    return (
        <>
            <Box spaceY={2}>
                <Heading
                    fontSize="2xl"
                    fontWeight="semibold"
                >
                    Sign Up
                </Heading>
                <Text color="fg.muted">Create your account to get started.</Text>
            </Box>

            <FormSignUp />
        </>
    );
};

export default Page;
