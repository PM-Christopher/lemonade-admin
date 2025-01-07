"use client"
import React, {useState} from 'react';
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import OtpInput from 'react-otp-input';
import {FormikButton} from "@/components/global/FormikButton";
import AuthLayout from "@/components/layouts/AuthLayout";
import * as yup from "yup";
import {useFormik} from "formik";

function ForgotPasswordPage({}) {
    const forgotPasswordSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
        },
    })

    const [otp, setOtp] = useState(formik.values.code);
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
                                <p className="font-ruso text-[24px] font-normal">Verification Code</p>
                                <p className="text-[14px] font-normal text-text-grey">
                                    Enter the 4-digit code sent adminlogin@admin.com to reset your password.
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <OtpInput
                                    value={formik.values.code}
                                    onChange={(e) => {
                                        setOtp(e)
                                        formik.setFieldValue('code', e)
                                    }}
                                    numInputs={4}
                                    renderSeparator={<span> </span>}
                                    renderInput={(props) => <input {...props} />}
                                    containerStyle="gap-2"
                                    inputStyle={{
                                        width: "48px",
                                        height: "48px",
                                        background: "#F9FAFA",
                                        borderRadius: "12px"
                                    }}
                                />
                            </div>
                            <p className="text-[16px] font-medium text-light-green text-center">Resend in 60 secs</p>
                            <FormikButton loading={formik.isSubmitting} title="Verify" error={formik.isValid}
                                          classes="w-full h-[48px] rounded-[12px]"/>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </AuthLayout>
    );
}

export default ForgotPasswordPage;