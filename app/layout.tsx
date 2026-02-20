import { GlobalLoading } from "@/components/global-loading";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "K-Blog",
        template: "K-Blog | %s",
    },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Provider>
                    {children}
                    <Toaster />
                    <GlobalLoading />
                </Provider>
            </body>
        </html>
    );
};

export default Layout;
