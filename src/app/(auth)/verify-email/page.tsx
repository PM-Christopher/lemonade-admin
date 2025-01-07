"use client"
import React from 'react';
import * as yup from "yup";
import {useFormik} from "formik";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FormikButton} from "@/components/global/FormikButton";
import AuthLayout from "@/components/layouts/AuthLayout";

function VerifyEmailPage({}) {
    const verifyEmailSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: verifyEmailSchema,
        onSubmit: async (values) => {
        },
    })
    return (
        <AuthLayout>
            <section className="bg-light-grey min-h-screen h-full overflow-hidden">
                <div className="flex flex-wrap items-center justify-between p-2 px-10">
                    <div>
                        <Image src={"/images/logo.png"} alt="logo" width={127} height={56}/>
                    </div>
                </div>
                <div
                    className="flex flex-col mt-24 items-center tablet:items-start justify-center gap-16 tablet:px-4 tablet:flex-row">
                    <Card className="p-[24px] w-full tablet:w-[480px] rounded-[16px] shadow-sm border-none">
                        <CardContent className="grid gap-[24px] tablet:gap-[40px]">
                            <div>
                                <p className="font-ruso text-[24px] font-normal">Forgot password</p>
                                <p className="text-[14px] font-normal text-text-grey">
                                    Enter your email address and a 4-digit code will be sent to reset your password.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-sans text-text-grey font-normal text-[14px]">Email
                                    address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g. Janedoe@example.com"
                                    className="h-12 rounded-xl bg-light-grey form-font border-0"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <FormikButton loading={formik.isSubmitting} title="Verify" error={formik.isValid}
                                          classes="w-full h-[48px] rounded-[12px]"/>
                            <p className="text-[16px] font-medium text-light-green underline text-center">Login</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </AuthLayout>
    );
}

export default VerifyEmailPage;