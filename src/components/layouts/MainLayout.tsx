"use client"
import {ReactNode, useEffect} from "react";
import SideNav from "@/components/global/SideNav";
import TopNav from "@/components/global/TopNav";
import {useAppDispatch} from "@/redux/hook";
import {redirect, useRouter} from "next/navigation";
import {useCookies} from "react-cookie";
import {setIsRouting} from "@/redux/tempSlice";
import {resetAuth} from "@/features/authentication/authSlice";

interface DashboardLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: DashboardLayoutProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies([
        "token",
        "adminAuthToken",
    ]);
    const token = cookies.token;

    useEffect(() => {
        dispatch(setIsRouting(false));
    }, []);

    useEffect(() => {
        if (!token) {
            router.push("/login");
            removeCookie("token");
            dispatch(resetAuth());
        }
    }, [token]);
    if (!token) {
        removeCookie("token");
        dispatch(resetAuth());
        redirect("/login");
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <SideNav />

            {/* Main Content */}
            <main className="flex-1 bg-light-grey">
                <TopNav />

                {/* Content */}
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
