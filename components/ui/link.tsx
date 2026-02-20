import { Box, BoxProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { forwardRef } from "react";

export const Link = forwardRef<HTMLElement, Omit<BoxProps, "asChild"> & { href: string }>(
    (props, ref) => {
        const { href, children, ...rest } = props;

        return (
            <Box
                ref={ref}
                asChild
                {...rest}
            >
                <NextLink href={href}>{children}</NextLink>
            </Box>
        );
    },
);

Link.displayName = "Link";
