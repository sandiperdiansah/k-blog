import { Footer } from "@/features/auth/components/Footer";
import { Header } from "@/features/auth/components/Header";
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
                as="section"
                w="full"
                minW="sm"
                maxW={{ md: "sm" }}
                spaceY={3}
            >
                <Header />
                {children}
                <Footer />
            </Box>
        </Box>
    );
};

export default Layout;
