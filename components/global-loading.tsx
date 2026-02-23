"use client";

import { Box, BoxProps, Spinner } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

export type UseGlobalLoadingProps = {
    isLoading: boolean;
    setIsLoading: (open: boolean) => void;
};

export const useGlobalLoading = create<UseGlobalLoadingProps>((set) => ({
    isLoading: false,
    setIsLoading: (open) =>
        set(() => ({
            isLoading: open,
        })),
}));

export const GlobalLoading = ({ ...props }: BoxProps) => {
    const [isLoading, setIsLoading] = useGlobalLoading(
        useShallow((state) => [state.isLoading, state.setIsLoading]),
    );

    const pathname = usePathname();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname, setIsLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <Box
            position="fixed"
            inset={0}
            bg={{ base: "whiteAlpha.700", _dark: "blackAlpha.700" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={99999}
            aria-hidden="true"
            aria-label="global loading overlay"
            {...props}
        >
            <Spinner
                size="xl"
                color="teal.600"
            />
        </Box>
    );
};
