'use client'
import React from 'react';
import {pageLinks} from "@/utils/pageLinks";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import { useAppDispatch } from '@/redux/hook';
import { logout } from '@/features/authentication/authSlice';
import { useSelector } from 'react-redux';
import { updateToastifyReducer } from '@/redux/toastifySlice';

function SideNav({}) {
    const pathname = usePathname();
    const profileActive = pathname === "/profile" || (pathname.startsWith("/profile"));
    const dispatch = useAppDispatch()
    const { user, authToken: token } = useSelector((state: any) => state.auth)
    const router = useRouter()
    const handleLogout =()=>{

        dispatch(logout({token})).then(res => {
            if (res.payload.status) {
                dispatch(
                    updateToastifyReducer({
                        show: true,
                        message: `Logged out`,
                        type: "success",
                    })
                );
                // redirect user to login
                router.push("/login")
            } else {
                dispatch(
                    updateToastifyReducer({
                        show: true,
                        message: res.payload.message || `Something went wrong`,
                        type: "error",
                    })
                );
            }
        })

    }
    return (
        <aside className="flex flex-col gap-[20px] w-64 bg-gray-20 p-4 border-r-[1px] border-r-grey-20 bg-white">
            <div className="text-2xl font-bold mb-8">
                <Image src={"/images/logo.png"} alt="logo" width={127} height={56}/>
            </div>
            <nav>
                <ul className="space-y-[8px]">
                    {pageLinks.map((item) => {
                        const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));

                        return (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    className={`w-[192px] block  py-[10px] px-[12px] rounded-[12px] text-[14px] font-normal font-sans hover:bg-link-color hover:text-black-light hover:font-semiBold ${
                                        isActive ? "bg-link-color font-semiBold text-black" : "text-text-grey"
                                    }`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-auto pt-[16px] pb-[16px] border-t-[1px] border-t-grey-20">
                <a href={'/profile'} className={`w-[192px] block  py-[10px] px-[12px] rounded-[12px] text-[14px] font-normal font-sans hover:bg-link-color hover:text-black-light hover:font-semiBold ${
                    profileActive ? "bg-link-color font-semiBold text-black" : "text-text-grey"
                }`}>Profile</a>
                <div onClick={()=>{
                    handleLogout()
                }} className="block py-[10px] px-[12px] text-red-1 rounded-[12px] text-[14px] font-normal font-sans hover:bg-red-1 hover:text-white">Logout</div>
            </div>
        </aside>
    );
}

export default SideNav;