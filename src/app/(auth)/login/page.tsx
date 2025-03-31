'use client'
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FormikButton} from "@/components/global/FormikButton";
import {useFormik} from "formik";
import * as yup from "yup";
import {login} from "@/features/authentication/authApi";
import {useAppDispatch} from "@/redux/hook";
import {useCookies} from "react-cookie";

function LoginPage({}) {
    const router  = useRouter()
    const dispatch = useAppDispatch();
    const [cookie, setCookie] = useCookies(["token", "newToken"]);


    const loginSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8)
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            await login({...values}, dispatch, router, setCookie)
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
                    <form onSubmit={formik.handleSubmit}>
                        <Card className="p-[24px] w-full tablet:w-[480px] rounded-[16px] shadow-sm border-none">
                            <CardContent className="grid gap-[24px] tablet:gap-[40px]">
                                <div>
                                    <p className="font-ruso text-[24px] font-normal">Login</p>
                                    <p className="text-[14px] font-normal text-text-grey">Login with your email address and password.</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-sans text-text-grey font-normal text-[14px]">Email address</Label>
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
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="font-sans text-text-grey font-normal text-[14px]">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="h-12 rounded-xl bg-light-grey form-font border-0"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <p className="text-[16px] font-medium text-light-green underline">Forgot password</p>
                                <FormikButton loading={formik.isSubmitting} title="Login" error={formik.isValid} classes="w-full h-[48px] rounded-[12px]"/>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </section>
        </AuthLayout>
    );
}

export default LoginPage;