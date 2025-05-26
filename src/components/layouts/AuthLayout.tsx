import React, { useEffect, useLayoutEffect } from 'react';
import {redirect, usePathname, useRouter} from "next/navigation";
import {useAppDispatch} from "@/redux/hook";
import { useMediaQuery } from "react-responsive";
import { useCookies } from "react-cookie";
import {setIsRouting} from "@/redux/tempSlice";
import {useSelector} from "react-redux";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(["newToken", "token"]);
    const newToken = cookies.newToken;
    const token = cookies.token;

    useLayoutEffect(() => {
        // if (token) {
        //     redirect("/");
        //     return;
        // }
        if (!newToken) {
            !(
                pathname === "/signup" ||
                pathname === "/login" ||
                pathname === "/forgot-password" ||
                pathname === "/reset-password"
            ) && redirect("/login");
        }
    }, [pathname, newToken]);

    useEffect(() => {
        dispatch(setIsRouting(false));
    }, []);
    return (
        <div>
            {children}
        </div>
    );
}

export default AuthLayout;