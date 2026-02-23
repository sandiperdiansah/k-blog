import { GlobalLoading } from "@/components/global-loading";
import { Toaster } from "@/components/ui/toaster";
import { ChakraUiProvider } from "@/providers/ChakraUiProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: process.env.NEXT_PUBLIC_APP_NAME as string,
        template: `${process.env.NEXT_PUBLIC_APP_NAME} | %s`,
    },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`${inter.className} `}>
                <TanstackQueryProvider>
                    <ChakraUiProvider>
                        {children}
                        <Toaster />
                        <GlobalLoading />
                    </ChakraUiProvider>
                </TanstackQueryProvider>
            </body>
        </html>
    );
};

export default Layout;
