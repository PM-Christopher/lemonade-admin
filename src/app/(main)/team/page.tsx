import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {PlusIcon, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import DataInfoCard from "@/components/global/DataInfoCard";
import GlobalTable from "@/components/global/GlobalTable";
import {announcementData, announcementHeaders, teamData, teamHeaders} from "@/data/tableData";

function TeamMembersPage({}) {
    return (
        <MainLayout>
            <section className="flex flex-col gap-[20px] mt-[24px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>10 Team Members</p>
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
                                    placeholder="Search member, ID..."
                                />
                            </div>
                        </div>
                        <div>
                            <Button className={"flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"}>
                                <PlusIcon className={"text-white w-[15px] h-[15px]"} />
                                <p className={"text-white font-medium text-[16px]"}>Add Member</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] flex flex-col "}>
                    <div className={"border-[1px] border-grey-20 rounded-[12px] flex flex-col"}>
                        <GlobalTable headers={teamHeaders} content={teamData}/>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default TeamMembersPage;