import { EmailSchema, PasswordSchema, v } from "@/lib/valibot";

export const SignUpSchema = v.object({
    name: v.pipe(
        v.string("Name must be a string"),
        v.nonEmpty("Name is required"),
        v.minLength(3, "Name must be at least 3 characters"),
    ),
    email: EmailSchema,
    password: PasswordSchema,
    role: v.nullish(v.pipe(v.string())),
});

export const SignInSchema = v.object({
    email: EmailSchema,
    password: PasswordSchema,
});
