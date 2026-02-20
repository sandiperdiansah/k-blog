"use client";

import { Field, Link } from "@/components/ui";
import { Box, Button, Input, Text } from "@chakra-ui/react";

export const FormForgotPassword = () => {
    return (
        <Box
            asChild
            spaceY={5}
        >
            <form>
                <Field
                    label="Email"
                    errorText="aduh error"
                >
                    <Input placeholder="Enter your email" />
                </Field>

                <Button w="full">Confirm</Button>

                <Text textAlign="center">
                    Remember your account?{" "}
                    <Link
                        href="/auth/sign-in"
                        fontWeight="semibold"
                        textUnderlineOffset={4}
                        _hover={{ textDecor: "underline" }}
                    >
                        Sign In
                    </Link>
                </Text>
            </form>
        </Box>
    );
};
