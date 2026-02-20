import { FormSignIn } from "@/features/auth/components/FormSignIn";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
};

const Page = () => {
    return (
        <>
            <Box spaceY={2}>
                <Heading
                    fontSize="2xl"
                    fontWeight="semibold"
                >
                    Sign In
                </Heading>
                <Text color="fg.muted">Please enter your details to sign in.</Text>
            </Box>

            <FormSignIn />
        </>
    );
};

export default Page;
