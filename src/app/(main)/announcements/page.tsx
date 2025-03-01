import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {CalendarIcon, ChevronDown, PlusIcon, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import GlobalTable from "@/components/global/GlobalTable";
import {announcementData, announcementHeaders, reportData, reportHeaders} from "@/data/tableData";
import DataCard from "@/components/global/DataCard";
import DataInfoCard from "@/components/global/DataInfoCard";

const Page = ({}) => {
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
                        <GlobalTable headers={announcementHeaders} content={announcementData}/>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Page;