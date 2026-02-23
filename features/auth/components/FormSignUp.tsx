"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signUpCredentialAction } from "../actions";

export const FormSignUp = () => {
    const [state, action, isPending] = useActionState(signUpCredentialAction, null);
    const setIsLoading = useGlobalLoading((state) => state.setIsLoading);
    const router = useRouter();

    useEffect(() => {
        queueMicrotask(() => {
            if (state?.message) {
                toaster.create({ type: "info", description: state.message });
            }

            if (!state?.success) {
                return;
            }

            setIsLoading(true);

            const redirect = setTimeout(() => {
                router.push("/");
            }, 500);

            return () => clearTimeout(redirect);
        });
    }, [state, router, setIsLoading]);

    return (
        <Box
            asChild
            spaceY={4}
        >
            <form action={action}>
                <Field
                    label="Name"
                    invalid={!!state?.error?.name}
                    errorText={state?.error?.name?.[0]}
                >
                    <Input
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="on"
                    />
                </Field>

                <Field
                    label="Email"
                    invalid={!!state?.error?.email}
                    errorText={state?.error?.email?.[0]}
                >
                    <Input
                        name="email"
                        placeholder="Enter your email"
                        autoComplete="on"
                    />
                </Field>

                <Field
                    label="Password"
                    invalid={!!state?.error?.password}
                    errorText={state?.error?.password?.[0]}
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
                    aria-label="sign up"
                >
                    Sign Up
                </Button>
            </form>
        </Box>
    );
};
