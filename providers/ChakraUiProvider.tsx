"use client";

import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "@/components/ui/color-mode";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraUiProvider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
