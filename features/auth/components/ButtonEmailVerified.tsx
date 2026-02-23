"use client";

import { toaster } from "@/components/ui/toaster";
import { Button } from "@chakra-ui/react";
import { useActionState, useEffect } from "react";
import { emailVerifiedAction } from "../actions";

export const ButtonEmailVerified = ({ email }: { email: string }) => {
    const [state, action, isPending] = useActionState(emailVerifiedAction, null);

    useEffect(() => {
        queueMicrotask(() => {
            if (state?.message) {
                toaster.create({ type: "info", description: state.message });
            }
        });
    }, [state]);

    return (
        <form action={action}>
            <input
                type="hidden"
                name="email"
                value={email}
            />
            <Button
                type="submit"
                loading={isPending}
            >
                Send Link
            </Button>
        </form>
    );
};
