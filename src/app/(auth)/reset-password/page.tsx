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

function ResetPasswordPage({}) {
    const resetPasswordSchema = yup.object({
        password: yup
            .string()
            .min(8)
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
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
                                <p className="font-ruso text-[24px] font-normal">Reset Password</p>
                                <p className="text-[14px] font-normal text-text-grey">
                                    Stronger password, stronger protection! Combine uppercase, lowercase, numbers, and
                                    symbols to protect your account.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password"
                                       className="font-sans text-text-grey font-normal text-[14px]">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="h-12 rounded-xl bg-light-grey form-font border-0"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <p className={"text-[12px] font-normal text-grey-40"}>Password must be at least 8 character long</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword"
                                       className="font-sans text-text-grey font-normal text-[14px]">Confirm password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    className="h-12 rounded-xl bg-light-grey form-font border-0"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <FormikButton loading={formik.isSubmitting} title="Save password" error={formik.isValid}
                                          classes="w-full h-[48px] rounded-[12px]"/>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </AuthLayout>
    );
}

export default ResetPasswordPage;