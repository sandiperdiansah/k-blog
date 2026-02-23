import { Box, BoxProps } from "@chakra-ui/react";
import NextImage from "next/image";

export const Image = ({
    src,
    alt,
    ...props
}: Omit<BoxProps, "asChild"> & {
    src: string;
    alt: string;
}) => {
    return (
        <Box
            position="relative"
            overflow="hidden"
            flexShrink={0}
            {...props}
        >
            <NextImage
                src={src}
                alt={alt}
                priority
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
            />
        </Box>
    );
};
