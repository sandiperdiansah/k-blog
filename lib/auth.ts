import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: true,
            },
        },
    },
    trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
        .split(",")
        .filter(Boolean),
    plugins: [nextCookies()],
});

export const getSession = async () => {
    return auth.api.getSession({
        headers: await headers(),
    });
};
