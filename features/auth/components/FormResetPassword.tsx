"use client";

import { Field, PasswordInput } from "@/components/ui";
import { Box, Button, IconButton, Input, InputGroup, Span } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

export const FormResetPassword = () => {
    return (
        <Box
            asChild
            spaceY={5}
        >
            <form>
                <Field
                    label="Password"
                    errorText="aduh error"
                >
                    <PasswordInput placeholder="Enter your password" />
                </Field>

                <Field
                    label="Confirm Password"
                    errorText="aduh error"
                >
                    <PasswordInput placeholder="Enter your password" />
                </Field>

                <Field
                    label="OTP"
                    errorText="aduh error"
                >
                    <InputGroup
                        endElement={
                            true ? (
                                <Span>12 s</Span>
                            ) : (
                                <IconButton
                                    me="-2"
                                    aspectRatio="square"
                                    size="sm"
                                    variant="ghost"
                                    height="calc(100% - {spacing.2})"
                                    aria-label="Give new otp"
                                >
                                    <FiSend />
                                </IconButton>
                            )
                        }
                    >
                        <Input placeholder="Enter otp 6 digit" />
                    </InputGroup>
                </Field>

                <Button w="full">Confirm</Button>
            </form>
        </Box>
    );
};
