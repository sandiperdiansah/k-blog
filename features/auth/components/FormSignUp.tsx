"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Field, Link, PasswordInput, toaster } from "@/components/ui";
import { signUpAction } from "@/features/auth/auth.action";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const FormSignUp = () => {
    const [state, formAction, isPending] = useActionState(signUpAction, undefined);
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
                router.push("/auth/sign-in");
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
                    label="Name"
                    invalid={!!state?.error?.nested?.name}
                    errorText={state?.error?.nested?.name?.[0]}
                >
                    <Input
                        name="name"
                        placeholder="Enter your name"
                    />
                </Field>

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

                <Button
                    type="submit"
                    w="full"
                    loading={isPending}
                    aria-label="Sign Up"
                >
                    Sign Up
                </Button>

                <Text textAlign="center">
                    Already have an account?{" "}
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
