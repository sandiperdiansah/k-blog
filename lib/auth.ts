import { UserRole } from "@/features/auth/dto";
import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { sendEmail } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "reset your password",
                text: `click link to reset password: ${url}`,
            });
        },
    },

    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: Object.values(UserRole),
                defaultValue: UserRole.USER,
                input: false,
            },
        },

        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
                await sendEmail({
                    to: user.email,
                    subject: "approve email change",
                    text: `your email has been change ${newEmail} click link to approve change: ${url}`,
                });
            },
        },
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "verify your email",
                text: `click link to verify your email: ${url}`,
            });
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
