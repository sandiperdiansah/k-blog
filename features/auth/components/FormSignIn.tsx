"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Link } from "@/components/ui/link";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, Input, Span } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signInCredentialAction } from "../actions";

export const FormSignIn = () => {
    const [state, action, isPending] = useActionState(signInCredentialAction, undefined);
    const setIsLoading = useGlobalLoading((state) => state.setIsLoading);
    const router = useRouter();

    useEffect(() => {
        queueMicrotask(() => {
            if (state?.message) {
                toaster.info({ description: state.message });
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

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Checkbox size="sm">
                        <Span
                            fontSize="sm"
                            fontWeight="normal"
                        >
                            Remember me
                        </Span>
                    </Checkbox>

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
                    aria-label="sign in"
                >
                    Sign In
                </Button>
            </form>
        </Box>
    );
};
