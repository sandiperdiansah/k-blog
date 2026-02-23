"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { toaster } from "@/components/ui/toaster";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signOutAction } from "../actions";

export const ButtonSignOut = () => {
    const [state, action, isPending] = useActionState(signOutAction, undefined);
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
                router.push("/auth/sign-in");
            }, 500);

            return () => clearTimeout(redirect);
        });
    }, [state, router, setIsLoading]);

    return (
        <Box asChild>
            <form action={action}>
                <Button
                    type="submit"
                    aria-label="sign out"
                    loading={isPending}
                >
                    Sign Out
                </Button>
            </form>
        </Box>
    );
};
