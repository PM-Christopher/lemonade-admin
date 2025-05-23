'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {usersDetailPageViews} from "@/utils/pageViews";
import {CalendarIcon, ChevronDown} from "lucide-react";
import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getAnnouncementDetail} from "@/features/announcements/announcements.slice";
import {getTeamDetail} from "@/features/team/team.slice";
import {capitalizeSpecial, capitalizeWords} from "@/utils/helper";

function Page() {
    const currentPage: number = 1;
    const totalPages: number = 10;
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { authToken } = useSelector((state: RootState) => state.auth)
    const id = params.id ? (Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id)) : undefined;
    const { loading, team } = useSelector((state: RootState) => state.team) as { team: any, loading: boolean };
    
    // Add hydration protection
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Set hydrated state after component mounts
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (id && authToken && isHydrated) {
            dispatch(getTeamDetail({token: authToken, id}))
        }
    }, [id, authToken, isHydrated, dispatch])

    // Don't render dynamic content until hydrated
    if (!isHydrated) {
        return (
            <MainLayout>
                <section className={"p-[20px] flex justify-between"}>
                    <div className={"w-[588px] h-fit bg-white flex flex-col rounded-[12px] gap-[12px]"}>
                        <div className={'flex flex-col'}>
                            <div className={'flex flex-col p-[24px] gap-[20px]'}>
                                <div className={'w-[64px] h-[64px] bg-mid-grey rounded-full'}></div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>Full Name:</p>
                                    </div>
                                    <p className={"text-[14px] font-medium"}>Loading...</p>
                                </div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>User ID:</p>
                                    </div>
                                    <p className={"text-[14px] font-medium"}>Loading...</p>
                                </div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                                    </div>
                                    <p className={"text-[14px] font-medium text-light-green-70"}>Loading...</p>
                                </div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>Role:</p>
                                    </div>
                                    <div className={"flex gap-[4px]"}>
                                        <p className={"text-[14px] font-medium"}>Loading...</p>
                                    </div>
                                </div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>Email Address:</p>
                                    </div>
                                    <div className={"flex gap-[4px]"}>
                                        <p className={"text-[14px] font-medium"}>Loading...</p>
                                    </div>
                                </div>
                                <div className={"flex gap-[24px] items-center"}>
                                    <div className={"w-[115px]"}>
                                        <p className={"text-text-grey text-[12px] font-medium"}>Date Created:</p>
                                    </div>
                                    <p className={"text-[14px] font-medium"}>Loading...</p>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center justify-between p-[24px] mt-[20px] border-t-[1px] border-t-grey-20"}>
                                <button
                                    className={'px-[48px] py-[11px] border-[1px] rounded-[12px] border-light-grey-50 w-full font-sans font-medium text-[14px]'}
                                    type={'button'}>Update password
                                </button>
                                <button
                                    className={'px-[48px] py-[11px] border-[1px] rounded-[12px] border-light-grey-50 w-full text-red-1 font-sans font-medium text-[14px]'}
                                    type={'button'}>Remove member
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <div className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"} style={{ width: "908px" }}>
                            <div className="flex justify-between mt-[10px] border-b-[1px] border-b-grey-20 p-[24px]">
                                <p className={'font-semiBold text-[16px]'}>Activity Logs</p>
                            </div>
                            <div className={"flex flex-col py-[20px]"}>
                                <div className={"px-[24px] py-[16px]"}>
                                    <div className={"flex border-[1px] border-grey-20 w-[203px] h-[40px] rounded-[12px] justify-between items-center bg-light-grey px-[16px] py-[10px] cursor-pointer"}>
                                        <div className={'flex justify-between items-center'}>
                                            <div className={"flex gap-[8px] items-center text-text-grey"}>
                                                <CalendarIcon className={"w-[15px]"}/>
                                                <p className={"text-[12px] font-semiBold text-text-grey"}>
                                                    ALL TIME
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronDown className={"text-text-grey w-[20px]"}/>
                                    </div>
                                </div>
                                <div className="pt-[16px] pb-[24px]">
                                    <div className={"flex flex-col"}>
                                        <div className="flex justify-between px-[24px] py-[16px]">
                                            <p className={"font-medium text-[14px] text-light-black"}>Loading...</p>
                                            <p className={'text-text-grey font-normal text-[14px]'}>Loading...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"h-[62px] bg-mid-grey rounded-br-[12px] rounded-bl-[12px]"} style={{ width: "908px" }}>
                            <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
                                <button
                                    disabled={currentPage === 1}
                                    className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${page === currentPage ? "bg-light-white text-text-grey" : "text-gray-500"}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    disabled={currentPage === totalPages}
                                    className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    console.log({team})
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[588px] h-fit bg-white flex flex-col rounded-[12px] gap-[12px]"}>
                    <div className={'flex flex-col'}>
                        <div className={'flex flex-col p-[24px] gap-[20px]'}>
                            <div className={'w-[64px] h-[64px] bg-mid-grey rounded-full'}></div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Full Name:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>{team?.name || 'N/A'}</p>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>User ID:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>LN112332</p>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                                </div>
                                <p className={"text-[14px] font-medium text-light-green-70"}>
                                    {team?.status ? capitalizeWords(team.status) : 'N/A'}
                                </p>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Role:</p>
                                </div>
                                <div className={"flex gap-[4px]"}>
                                    <p className={"text-[14px] font-medium"}>
                                        {team?.role ? capitalizeSpecial(team.role) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Email Address:</p>
                                </div>
                                <div className={"flex gap-[4px]"}>
                                    <p className={"text-[14px] font-medium"}>{team?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Date Created:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>{team?.created_at || 'N/A'}</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center justify-between p-[24px] mt-[20px] border-t-[1px] border-t-grey-20"}>
                            <button
                                className={'px-[48px] py-[11px] border-[1px] rounded-[12px] border-light-grey-50 w-full font-sans font-medium text-[14px]'}
                                type={'button'}>Update password
                            </button>
                            <button
                                className={'px-[48px] py-[11px] border-[1px] rounded-[12px] border-light-grey-50 w-full text-red-1 font-sans font-medium text-[14px]'}
                                type={'button'}>Remove member
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"} style={{ width: "908px" }}>
                        <div className="flex justify-between mt-[10px] border-b-[1px] border-b-grey-20 p-[24px]">
                            <p className={'font-semiBold text-[16px]'}>Activity Logs</p>
                        </div>
                        <div className={"flex flex-col py-[20px]"}>
                            <div className={"px-[24px] py-[16px]"}>
                                <div className={"flex border-[1px] border-grey-20 w-[203px] h-[40px] rounded-[12px] justify-between items-center bg-light-grey px-[16px] py-[10px] cursor-pointer"}>
                                    <div className={'flex justify-between items-center'}>
                                        <div className={"flex gap-[8px] items-center text-text-grey"}>
                                            <CalendarIcon className={"w-[15px]"}/>
                                            <p className={"text-[12px] font-semiBold text-text-grey"}>
                                                ALL TIME
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronDown className={"text-text-grey w-[20px]"}/>
                                </div>
                            </div>

                            <div className="pt-[16px] pb-[24px]">
                                <div className={"flex flex-col"}>
                                    <div className="flex justify-between px-[24px] py-[16px]">
                                        <p className={"font-medium text-[14px] text-light-black"}>Joined Lemonade Network</p>
                                        <p className={'text-text-grey font-normal text-[14px]'}>Mon, 23 Mar, 2024 05:00PM</p>
                                    </div>
                                    <div className="flex justify-between px-[24px] py-[16px]">
                                        <p className={"font-medium text-[14px] text-light-black"}>Created a 'Nigeria start-ups' Tribe</p>
                                        <p className={'text-text-grey font-normal text-[14px]'}>Mon, 23 Mar, 2024 05:00PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"h-[62px] bg-mid-grey rounded-br-[12px] rounded-bl-[12px]"} style={{ width: "908px" }}>
                        <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
                            <button
                                disabled={currentPage === 1}
                                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${page === currentPage ? "bg-light-white text-text-grey" : "text-gray-500"}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Page;