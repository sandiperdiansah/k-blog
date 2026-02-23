import * as v from "valibot";

export const EmailSchema = v.pipe(
    v.string("Email must be a string"),
    v.nonEmpty("Email is required"),
    v.email("Invalid email format"),
    v.endsWith("@gmail.com", "Email must use @gmail.com"),
);

export const PasswordSchema = v.pipe(
    v.string("Password must be a string"),
    v.nonEmpty("Password is required"),
    v.minLength(6, "Password must be at least 6 characters"),
);

export { v };
