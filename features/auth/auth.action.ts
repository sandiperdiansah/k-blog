"use server";

import { SignInSchema, SignUpSchema } from "@/features/auth/auth.dto";
import { auth, getSession } from "@/lib/auth";
import { v } from "@/lib/valibot";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (prev: unknown, formData: FormData) => {
    const payload = v.safeParse(SignUpSchema, Object.fromEntries(formData.entries()));

    if (!payload.success) {
        return {
            code: "VALIDATION_ERROR",
            error: v.flatten<typeof SignUpSchema>(payload.issues),
        };
    }
    try {
        await auth.api.signUpEmail({
            body: {
                ...payload.output,
                role: "admin",
            },
        });

        return { message: "Sign Up Successful" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                code: "AUTH_ERROR",
                message: error.body?.message,
            };
        }

        return {
            code: "SERVER_ERROR",
            message: "Failed to sign up",
            error,
        };
    }
};

export const signInAction = async (prev: unknown, formData: FormData) => {
    const payload = v.safeParse(SignInSchema, Object.fromEntries(formData.entries()));

    if (!payload.success) {
        return {
            code: "VALIDATION_ERROR",
            error: v.flatten<typeof SignInSchema>(payload.issues),
        };
    }
    try {
        await auth.api.signInEmail({
            body: payload.output,
        });

        return { message: "Sign In Successful" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                code: "AUTH_ERROR",
                message: error.body?.message,
            };
        }

        return {
            code: "SERVER_ERROR",
            message: "Failed to sign in",
            error,
        };
    }
};

export const signOutAction = async () => {
    const session = await getSession();
    if (!session) return;

    try {
        await auth.api.signOut({
            headers: await headers(),
        });

        redirect("/auth/sign-in");
    } catch (error) {
        return {
            code: "SERVER_ERROR",
            message: "Failed to sign out",
            error,
        };
    }
};
