"use client";

import { Link } from "@/components/ui/link";
import { Box, Button, HStack, Icon, Separator, Span } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogleAction } from "../actions";

export const Footer = () => {
    const [_, formAction, isPending] = useActionState(signInWithGoogleAction, null);
    const pathname = usePathname();

    const getRedirectText = () => {
        switch (pathname) {
            case "/auth/sign-in":
                return "Don't have an account?";
            case "/auth/sign-up":
                return "Already have an account?";
            case "/auth/forgot-password":
                return "Remember your account?";
            case "/auth/reset-password":
                return "Remember your account?";
            default:
                return "";
        }
    };

    const getRedirectLink = () => {
        switch (pathname) {
            case "/auth/sign-in":
                return "/auth/sign-up";
            case "/auth/sign-up":
                return "/auth/sign-in";
            case "/auth/forgot-password":
                return "/auth/sign-in";
            case "/auth/reset-password":
                return "/auth/sign-in";
            default:
                return "";
        }
    };

    const getRedirectLabel = () => {
        switch (pathname) {
            case "/auth/sign-in":
                return "Sign Up";
            case "/auth/sign-up":
                return "Sign In";
            case "/auth/forgot-password":
                return "Sign In";
            case "/auth/reset-password":
                return "Sign In";
            default:
                return "";
        }
    };

    return (
        <Box
            as="footer"
            spaceY={4}
        >
            {pathname !== "/auth/forgot-password" &&
                pathname !== "/auth/reset-password" && (
                    <HStack>
                        <Separator flex="1" />
                        <Span
                            flexShrink="0"
                            color="fg.muted"
                            fontSize="sm"
                        >
                            OR
                        </Span>
                        <Separator flex="1" />
                    </HStack>
                )}

            <Box spaceY={4}>
                {/* google button */}
                {pathname !== "/auth/forgot-password" &&
                    pathname !== "/auth/reset-password" && (
                        <form action={formAction}>
                            <Button
                                w="full"
                                variant="surface"
                                type="submit"
                                aria-label="sign in with google"
                                loading={isPending}
                            >
                                <Icon size="lg">
                                    <FcGoogle />
                                </Icon>{" "}
                                Continue with google
                            </Button>
                        </form>
                    )}

                {/* redirect link */}
                <Box
                    textAlign="center"
                    fontSize="sm"
                >
                    {getRedirectText()}{" "}
                    <Link
                        href={getRedirectLink()}
                        fontWeight="semibold"
                        textUnderlineOffset={4}
                        _hover={{ textDecor: "underline" }}
                    >
                        {getRedirectLabel()}
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};
