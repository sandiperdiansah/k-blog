"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Field } from "@/components/ui/field";
import { Box, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "../actions";

export const FormForgotPassword = () => {
    const [state, action, isPending] = useActionState(forgotPasswordAction, null);
    const setIsLoading = useGlobalLoading((state) => state.setIsLoading);
    const router = useRouter();

    useEffect(() => {
        if (!state?.success) return;

        setIsLoading(true);
        const redirect = setTimeout(() => {
            router.push("/auth/sign-in");
        }, 500);

        return () => clearTimeout(redirect);
    }, [state, setIsLoading, router]);

    return (
        <Box
            asChild
            spaceY={5}
        >
            <form action={action}>
                <Field
                    label="Email"
                    invalid={!!state?.error?.email}
                    errorText={state?.error?.email?.[0]}
                >
                    <Input
                        placeholder="Enter your email"
                        autoComplete="on"
                        name="email"
                    />
                </Field>

                <Button
                    w="full"
                    type="submit"
                    aria-label="Send password reset link"
                    loading={isPending}
                >
                    Send Reset Link
                </Button>
            </form>
        </Box>
    );
};
