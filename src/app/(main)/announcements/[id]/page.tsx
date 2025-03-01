import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";

function AnnouncementDetailsPage({}) {
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}>
                    <div className={'flex flex-col p-[24px] gap-[20px]'}>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Owner:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>Funmilayo Johnson</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Announcement ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>AN112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Created:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>24 Apr, 2024 09:45 PM</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-light-green-70"}>Sent</p>
                        </div>
                    </div>
                </div>
                <div className={"w-[780px] h-fit bg-white rounded-[12px] flex flex-col gap-[16px]"}>
                    <div className={'p-[24px] border-b-[1px] flex justify-between  items-center'}>
                        <p className={'font-semiBold text-[16px]'}>Announcement</p>
                        <div className={'p-[10px] px-[14px] border-[1px] border-light-grey-50 rounded-[12px] cursor-pointer'}>
                            <p className={'font-medium text-[14px]'}>Edit draft</p>
                        </div>
                    </div>
                    <div className={'p-[24px]'}></div>
                </div>
            </section>
        </MainLayout>
    );
}

export default AnnouncementDetailsPage;