"use client"
import {ReactNode, useEffect} from "react";
import SideNav from "@/components/global/SideNav";
import TopNav from "@/components/global/TopNav";
import {useAppDispatch} from "@/redux/hook";
import {redirect, useRouter} from "next/navigation";
import {useCookies} from "react-cookie";
import {setIsRouting} from "@/redux/tempSlice";
import {resetAuth} from "@/features/authentication/authSlice";
import { useMediaQuery } from "react-responsive";
import BottomNav from "../global/BottomNav";

interface DashboardLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: DashboardLayoutProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
        const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
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
            {/* Sidebar (only visible on non-mobile) */}
            {!isMobile && <SideNav />}

            {/* Main Content */}
            <main className={`flex-1 bg-light-grey min-h-screen ${isMobile ? 'flex flex-col' : ''}`}>
                <TopNav />

                {/* Content (ensure it takes available height) */}
                <div className="flex-grow overflow-auto">
                    {children}
                </div>

                {/* Bottom Nav (only visible on mobile and make it scrollable) */}
                {isMobile && (
                    <div className="overflow-x-auto whitespace-nowrap">
                        <BottomNav />
                    </div>
                )}
            </main>
        </div>



//  <div className="bg-light_grey pb-10 min-h-screen h-full overflow-hidden w-full">
//             <TopNav/>
//             {children}
//             {/* {
//                 isMobile && (
//                     <BottomNav />
//                 )
//             } */}
//         </div>
    );
};

export default MainLayout;
