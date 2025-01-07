import React from 'react';
import {pageLinks} from "@/utils/pageLinks";
import Image from "next/image";

function SideNav({}) {
    return (
        <aside className="flex flex-col gap-[20px] w-64 bg-gray-20 p-4 border-r-[1px] border-r-grey-20 bg-white">
            <div className="text-2xl font-bold mb-8">
                <Image src={"/images/logo.png"} alt="logo" width={127} height={56}/>
            </div>
            <nav>
                <ul className="space-y-[8px]">
                    {pageLinks.map((item) => (
                        <li key={item}>
                            <a href="#" className="w-[192px] block text-text-grey py-[10px] px-[12px] rounded-[12px] text-[14px] font-normal hover:bg-link-color font-sans">{item}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto pt-[16px] pb-[16px] border-t-[1px] border-t-grey-20">
                <a href="#" className="w-[192px] block text-text-grey py-[10px] px-[12px] rounded-[12px] text-[14px] font-normal hover:bg-link-color font-sans">Profile</a>
                <a href="#" className="block py-[10px] px-[12px] text-red-1 rounded-[12px] text-[14px] font-normal font-sans hover:bg-red-1 hover:text-white">Logout</a>
            </div>
        </aside>
    );
}

export default SideNav;