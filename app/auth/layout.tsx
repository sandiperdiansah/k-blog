import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            as="main"
            minH="svh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 6, lg: 0 }}
        >
            <Box
                w="full"
                minW="sm"
                maxW={{ md: "sm" }}
                spaceY={6}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
