import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {CalendarIcon, ChevronDown, ChevronRight, ClockIcon, MapPinIcon} from "lucide-react";

const PromotionDetailsPage = ({}) => {
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[588px] h-fit bg-white flex flex-col rounded-[12px] gap-[12px]"}>
                    <div className={'flex justify-between items-center border-b-[1px] p-[24px]'}>
                        <p className={'text-[16px] font-semiBold'}>Event summary</p>
                    </div>
                    <div className={'flex flex-col p-[24px] gap-[20px]'}>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Name:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>Unlocking business potentials</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Owner:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
                                <p className={"text-[14px] font-medium text-light-green"}>Open chat</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>PR112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Promotion Name:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>Instagram Feed Post</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Amount:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>N30,000</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Paid:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>23 Apr, 2024 09:45 PM</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Promotion Date:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>N/A</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Promotion Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-warning-bold"}>Pending</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center justify-between mt-[40px]"}>
                            <button
                                className={'px-[48px] py-[11px] border-[2px] rounded-[12px] border-light-grey-50 w-[299px]'}
                                type={'button'}>Mark as completed
                            </button>
                            <button
                                className={'px-[48px] py-[11px] bg-gradient-green text-white font-medium text-[16px] rounded-[12px] w-[299px] border-step-color border-[1px]'}
                                type={'button'}>Schedule
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"w-[880px] h-fit bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col p-[24px] gap-[16px]"}>
                    <div className={'w-[320px] h-[343px] bg-gray-600 rounded-[16px]'}></div>
                    <p className={"font-semiBold text-[20px]"}>Unlocking business potentials</p>
                    <div className={"flex flex-col gap-[8px]"}>
                        <div className={'flex items-center gap-[8px]'}>
                            <CalendarIcon className={"text-text-grey"}/>
                            <p className={"font-medium text-[14px] text-text-grey"}>Mon, 23 Mar - Mon 23 Mar</p>
                        </div>
                        <div className={'flex items-center gap-[8px]'}>
                            <ClockIcon className={"text-text-grey"}/>
                            <p className={"font-medium text-[14px] text-text-grey"}>04:00PM - 11:00PM</p>
                        </div>
                        <div className={'flex items-center gap-[8px]'}>
                            <MapPinIcon className={"text-text-grey"}/>
                            <p className={"font-medium text-[14px] text-text-grey"}>Lekki phase 1</p>
                        </div>
                    </div>
                    <p className={'font-semiBold text-[16px]'}>Contact Us</p>
                    <p className={'font-semiBold text-[16px]'}>About Event</p>
                    <p className={'font-normal text-[14px] text-text-grey'}>This is the content of the message for the
                        event you are seeing here</p>
                    <p className={'font-semiBold text-[16px]'}>Promotions</p>
                    <div className={'flex flex-wrap gap-[12px]'}>
                        <div
                            className={'p-[8px] rounded-[12px] border-[1px] border-light-green-tint bg-light-tint flex gap-[] w-fit items-center'}>
                            <p className={'font-medium text-[14px]'}>IG Feed</p>
                            <ChevronRight className={'text-grey-40 w-[20px]'}/>
                        </div>
                        <div
                            className={'p-[8px] rounded-[12px] border-[1px] border-light-green-tint bg-light-tint flex gap-[] w-fit items-center'}>
                            <p className={'font-medium text-[14px]'}>IG Story</p>
                            <ChevronRight className={'text-grey-40 w-[20px]'}/>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default PromotionDetailsPage;