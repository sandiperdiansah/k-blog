"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case "/auth/sign-in":
                return "Sign In";
            case "/auth/sign-up":
                return "Sign Up";
            case "/auth/forgot-password":
                return "Forgot Password";
            case "/auth/reset-password":
                return "Reset Password";
            default:
                return "";
        }
    };

    const getText = () => {
        switch (pathname) {
            case "/auth/sign-in":
                return "Welcome back! Please enter your details.";
            case "/auth/sign-up":
                return "Create your account to get started.";
            case "/auth/forgot-password":
                return "Enter your email to reset your password.";
            case "/auth/reset-password":
                return "Enter your new password below.";
            default:
                return "";
        }
    };

    return (
        <Box
            as="header"
            spaceY={2}
            mb={8}
        >
            <Heading
                fontSize="xl"
                fontWeight="semibold"
            >
                {getTitle()}
            </Heading>
            <Text color="fg.muted">{getText()}</Text>
        </Box>
    );
};
