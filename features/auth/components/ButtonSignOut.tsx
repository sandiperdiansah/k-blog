"use client";

import { useGlobalLoading } from "@/components/global-loading";
import { signOutAction } from "@/features/auth/auth.action";
import { useActionState, useEffect } from "react";

export const ButtonSignOut = () => {
    const [_, formAction, isPending] = useActionState(signOutAction, null);
    const setIsLoading = useGlobalLoading((state) => state.setIsLoading);

    useEffect(() => {
        if (isPending) {
            setIsLoading(isPending);
        }
    }, [isPending, setIsLoading]);

    return (
        <form
            action={formAction}
            style={{ width: "100%", cursor: "pointer" }}
        >
            <button
                style={{ outline: "none", cursor: "pointer" }}
                type="submit"
                aria-label="Sign Out"
            >
                Sign Out
            </button>
        </form>
    );
};
