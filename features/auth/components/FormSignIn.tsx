"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Field } from "@/components/ui/field";
import { Link } from "@/components/ui/link";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { signInAction } from "@/features/auth/auth.action";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const FormSignIn = () => {
    const [state, formAction, isPending] = useActionState(signInAction, null);
    const setIsLoading = useGlobalLoading((state) => state.setIsLoading);
    const router = useRouter();

    useEffect(() => {
        if (!state?.message) return;

        queueMicrotask(() => {
            toaster.info({ description: state.message });

            if (state.code === "AUTH_ERROR") {
                return;
            }

            setIsLoading(true);

            const redirect = setTimeout(() => {
                router.push("/dashboard");
            }, 500);

            return () => clearTimeout(redirect);
        });
    }, [state, router, setIsLoading]);

    return (
        <Box
            asChild
            spaceY={5}
        >
            <form action={formAction}>
                <Field
                    label="Email"
                    invalid={!!state?.error?.nested?.email}
                    errorText={state?.error?.nested?.email?.[0]}
                >
                    <Input
                        name="email"
                        placeholder="Enter your email"
                    />
                </Field>

                <Field
                    label="Password"
                    invalid={!!state?.error?.nested?.password}
                    errorText={state?.error?.nested?.password?.[0]}
                >
                    <PasswordInput
                        name="password"
                        placeholder="Enter your password"
                    />
                </Field>

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                >
                    <Link
                        href="/auth/forgot-password"
                        fontSize="sm"
                        _hover={{ textDecor: "underline" }}
                        textUnderlineOffset={4}
                    >
                        Forgot password?
                    </Link>
                </Box>

                <Button
                    type="submit"
                    w="full"
                    loading={isPending}
                    aria-label="Sign In"
                >
                    Sign In
                </Button>

                <Text textAlign="center">
                    Don’t have an account?{" "}
                    <Link
                        href="/auth/sign-up"
                        fontWeight="semibold"
                        textUnderlineOffset={4}
                        _hover={{ textDecor: "underline" }}
                    >
                        Sign Up
                    </Link>
                </Text>
            </form>
        </Box>
    );
};
