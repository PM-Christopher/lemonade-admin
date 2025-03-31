'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {PlusIcon, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import { announcementHeaders} from "@/data/tableData";
import DataInfoCard from "@/components/global/DataInfoCard";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {capitalizeWords} from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import {getAnnouncementData} from "@/features/announcements/announcements.slice";

const Page = ({}) => {
    const router = useRouter()
    // State for current page and items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const dispatch = useDispatch<AppDispatch>();

    const { authToken } = useSelector((state: RootState) => state.auth)
    const { announcementData } = useSelector((state: RootState) => state.announcement) as {announcementData: any}

    // Calculate total pages based on the data length and perPage value
    const totalPages = Math.ceil(announcementData?.announcements?.length / perPage);

    // Determine the start and end indices for slicing the data array
    const startIndex = (currentPage - 1) * perPage;
    const paginatedData = announcementData?.announcements?.slice(startIndex, startIndex + perPage)

    useEffect(() => {
        if (authToken) {
            dispatch(getAnnouncementData({token: authToken}))
        }
    }, [])
    return (
        <MainLayout>
            <section className="flex flex-col gap-[20px] mt-[24px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>30 Announcements</p>
                    <div className={"flex justify-between gap-[12px]"}>
                        <div
                            className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
                            <div>
                                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"}/>
                            </div>
                            <div className="w-full">
                                <input
                                    id="search"
                                    type="text"
                                    className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                                    placeholder="Search announcement, ID..."
                                />
                            </div>
                        </div>
                        <div>
                            <Button className={"flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"}>
                                <PlusIcon className={"text-white w-[15px] h-[15px]"} />
                                <p className={"text-white font-medium text-[16px]"}>New Announcement</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] flex flex-col "}>
                    <div className={"border-[1px] border-grey-20 rounded-[12px] flex flex-col"}>
                        <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                            <DataInfoCard styles={"w-full"} title={"Terms & Conditions"} isEditable={true}/>
                            <DataInfoCard styles={"w-full"} title={"Privacy policy"} isEditable={true}/>
                            <DataInfoCard styles={"w-full"} title={"Community guidelines"} isEditable={true} />
                        </div>
                        <div className="bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                <tr className="bg-mid-grey">
                                    {announcementHeaders.map((header, idx) => (
                                        <th
                                            className="p-4 text-left text-[12px] text-text-grey font-semiBold"
                                            key={idx}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    paginatedData && paginatedData.length > 0 ? paginatedData.map((row:any, index: any) => (
                                        <tr key={index} className="border-b border-grey-20 h-[72px] cursor-pointer" onClick={() => router.push(`/announcements/${row.id}`)}>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {row.id}
                                            </td>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {row.title}
                                            </td>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {row.created_by?.name}
                                            </td>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {row.created_at}
                                            </td>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {row.scheduled_date}
                                            </td>
                                            <td className={'p-4 font-medium text-sm font-sans'}>
                                                {capitalizeWords(row.status)}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={announcementHeaders.length} className="p-4 text-center text-sm text-gray-500">
                                                No data available
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <PaginationComp
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                perPage={perPage}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Page;