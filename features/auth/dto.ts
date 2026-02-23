import { EmailSchema, PasswordSchema, v } from "@/lib/valibot";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

export const SignUpSchema = v.object({
    name: v.pipe(
        v.string("Name must be a string"),
        v.nonEmpty("Name is required"),
        v.minLength(3, "Name must be at least 3 characters"),
    ),
    email: EmailSchema,
    password: PasswordSchema,
    role: v.nullish(v.enum(UserRole)),
});

export const SignInSchema = v.object({
    email: EmailSchema,
    password: PasswordSchema,
});

export const EmailVerifiedSchema = v.object({
    email: EmailSchema,
});

export const ForgotPassworSchema = v.object({
    email: EmailSchema,
});

export const ResetPasswordSchema = v.pipe(
    v.object({
        newPassword: PasswordSchema,
        confirmPassword: PasswordSchema,
        token: v.string(),
    }),
    v.forward(
        v.partialCheck(
            [["newPassword"], ["confirmPassword"]],
            (input) => input.newPassword === input.confirmPassword,
            "password do not match",
        ),
        ["confirmPassword"],
    ),
);

export const ChangeEmailSchema = v.object({
    newEmail: EmailSchema,
});

export const ChangePasswordSchema = v.pipe(
    v.object({
        currentPassword: PasswordSchema,
        newPassword: PasswordSchema,
        confirmPassword: PasswordSchema,
    }),
    v.forward(
        v.partialCheck(
            [["newPassword"], ["confirmPassword"]],
            (input) => input.newPassword === input.confirmPassword,
            "password do not match",
        ),
        ["confirmPassword"],
    ),
);
