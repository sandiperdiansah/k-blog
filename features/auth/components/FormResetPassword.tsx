"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "../actions";

export const FormResetPassword = ({ token }: { token: string }) => {
    const [state, action, isPending] = useActionState(resetPasswordAction, null);
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
            spaceY={4}
        >
            <form action={action}>
                <Field
                    label="Password"
                    invalid={!!state?.error?.newPassword}
                    errorText={state?.error?.newPassword?.[0]}
                >
                    <PasswordInput
                        placeholder="Enter your password"
                        name="newPassword"
                    />
                </Field>

                <Field
                    label="Confirm Password"
                    invalid={!!state?.error?.confirmPassword}
                    errorText={state?.error?.confirmPassword?.[0]}
                >
                    <PasswordInput
                        placeholder="Enter your password"
                        name="confirmPassword"
                    />
                </Field>

                <input
                    type="hidden"
                    name="token"
                    value={token}
                />

                <Button
                    w="full"
                    type="submit"
                    aria-label="Reset password"
                    loading={isPending}
                >
                    Reset Password
                </Button>
            </form>
        </Box>
    );
};
