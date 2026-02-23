"use server";

import {
    ChangeEmailSchema,
    ChangePasswordSchema,
    EmailVerifiedSchema,
    ForgotPassworSchema,
    ResetPasswordSchema,
    SignInSchema,
    SignUpSchema,
} from "@/features/auth/dto";
import { auth } from "@/lib/auth";
import { v } from "@/lib/valibot";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// sign up
export const signUpCredentialAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(SignUpSchema, Object.fromEntries(formData.entries()));

    if (!payload.success) {
        return {
            success: false,
            message: "validation error",
            error: v.flatten<typeof SignUpSchema>(payload.issues).nested,
        };
    }

    try {
        await auth.api.signUpEmail({
            body: payload.output,
        });

        return { success: true, message: "sign up successful" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// sign in
export const signInCredentialAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(SignInSchema, Object.fromEntries(formData.entries()));

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof SignInSchema>(payload.issues).nested,
        };
    }
    try {
        await auth.api.signInEmail({
            body: payload.output,
        });

        return { success: true, message: "sign in successful" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// sign in with google
export const signInWithGoogleAction = async () => {
    let redirectUrl: string | null = null;

    try {
        const response = await auth.api.signInSocial({
            headers: await headers(),
            body: {
                provider: "google",
                callbackURL: "/",
            },
        });

        if (response.url) {
            redirectUrl = response.url;
        }
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }

    if (redirectUrl) {
        return redirect(redirectUrl);
    }
};

// sign out
export const signOutAction = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// email verified
export const emailVerifiedAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(
        EmailVerifiedSchema,
        Object.fromEntries(formData.entries()),
    );

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof EmailVerifiedSchema>(payload.issues).nested,
        };
    }

    try {
        const response = await auth.api.sendVerificationEmail({
            body: payload.output,
        });

        if (!response.status) {
            return {
                success: false,
                message: "failed to send verification",
            };
        }

        return { success: true, message: "verification email send" };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// forgot password
export const forgotPasswordAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(
        ForgotPassworSchema,
        Object.fromEntries(formData.entries()),
    );

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof ForgotPassworSchema>(payload.issues).nested,
        };
    }

    try {
        await auth.api.requestPasswordReset({
            body: {
                ...payload.output,
                redirectTo: "/auth/reset-password",
            },
        });

        return {
            success: true,
            message: "if the email exists, a password reset link has been sent.",
        };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// reset password
export const resetPasswordAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(
        ResetPasswordSchema,
        Object.fromEntries(formData.entries()),
    );

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof ResetPasswordSchema>(payload.issues).nested,
        };
    }

    try {
        await auth.api.resetPassword({
            body: {
                newPassword: payload.output.newPassword,
                token: payload.output.token,
            },
        });

        return {
            success: true,
            message: "reset password successful",
        };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// change email
export const changeEmailAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(
        ChangeEmailSchema,
        Object.fromEntries(formData.entries()),
    );

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof ChangeEmailSchema>(payload.issues).nested,
        };
    }

    try {
        await auth.api.changeEmail({
            headers: await headers(),
            body: payload.output,
        });

        return {
            success: true,
            message: "change email successful",
        };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};

// change password
export const ChangePasswordAction = async (_prev: unknown, formData: FormData) => {
    const payload = v.safeParse(
        ChangePasswordSchema,
        Object.fromEntries(formData.entries()),
    );

    if (!payload.success) {
        return {
            success: false,
            error: v.flatten<typeof ChangePasswordSchema>(payload.issues).nested,
        };
    }

    try {
        await auth.api.changePassword({
            headers: await headers(),
            body: {
                currentPassword: payload.output.currentPassword,
                newPassword: payload.output.newPassword,
                revokeOtherSessions: true,
            },
        });

        return {
            success: true,
            message: "change password successful",
        };
    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body?.message,
            };
        }

        throw error;
    }
};
