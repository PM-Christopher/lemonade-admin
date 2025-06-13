import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {CalendarIcon, CopyIcon, DotIcon, MapPinIcon} from "lucide-react";

const AffiliateDetailsPage = ({}) => {
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between gap-[2px]"}>
                <div className={"w-[400px] h-fit bg-white flex flex-col rounded-[12px] p-[24px] gap-[12px]"}>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Affiliate Name:</p>
                        </div>
                        <div className={"flex gap-[4px]"}>
                            <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
                        </div>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Affiliate ID:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>AF112332</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Date Joined:</p>
                        </div>
                        <div className={"flex gap-[4px]"}>
                            <p className={"text-[14px] font-medium"}>24 Apr, 2024 09:45 PM</p>
                        </div>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>No of Programs:</p>
                        </div>
                        <p className={"text-[14px] font-medium text-light-green-70"}>Completed</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Total Tickets Sold:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>4</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Total Revenue:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>N30,000</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Account Number:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>0923432934</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Account Holder:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>Funmilayo Johnson</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Bank Name:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>GTB</p>
                    </div>
                    <p className={'font-medium text-[14px] text-light-green'}>View transaction history</p>
                </div>
                <div className={"w-[780px] h-fit bg-white rounded-[12px] flex flex-col gap-[16px]"}>
                    <div className={'p-[24px] border-b-[1px]'}>
                        <p className={'font-semiBold text-[16px]'}>Programs</p>
                    </div>
                    <div className={'flex flex-col p-[24px]'}>
                        <div className={'flex flex-col p-[8px] rounded-[12px] gap-[8px] bg-light-grey'}>
                            <div className={'flex gap-[12px] px-[16px] p-[8px] bg-green-tint items-center'}>
                                <div className={'w-[96px] h-[96px] bg-gray-600 rounded-[8px]'}></div>
                                <div className={'flex flex-col gap-[4px]'}>
                                    <p className={'font-semiBold text-[18px]'}>Halloween party</p>
                                    <div className={'flex items-center gap-[4px]'}>
                                        <CalendarIcon className={'text-text-grey w-[14px]'}/>
                                        <p className={'text-[16px] font-normal text-text-grey'}>Mon, 23 Mar</p>
                                        <DotIcon className={'text-text-grey w-[12px]'}/>
                                        <p className={'text-[16px] font-normal text-text-grey'}>4PM - 6PM</p>
                                    </div>
                                    <div className={'flex items-center gap-[4px]'}>
                                        <MapPinIcon className={'text-text-grey w-[14px]'}/>
                                        <p className={'text-[16px] font-normal text-text-grey'}>Lekki phase 1</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={'flex justify-between items-center rounded-[12px] gap-[8px] p-[8px] bg-grey-20'}>
                                <p className={'text-text-grey font-medium text-[12px]'}>Affiliate link: <span
                                    className={'font-medium text-light-black'}>https://www.lemonade.com/event_channel/referral_ID</span>
                                </p>
                                <div className={'flex items-center gap-[4px]'}>
                                    <p className={'text-grey-30'}>|</p>
                                    <CopyIcon className={'text-grey-40 w-[14px]'}/>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Total Commission:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>N300,000</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Total Tickets Sold:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>300</p>
                            </div>
                            <div className={'flex justify-between gap-[4px]'}>
                                <div
                                    className={'flex flex-col bg-white border-[1px] border-grey-20 gap-[8px] rounded-[8px] p-[12px] w-full h-[103px]'}>
                                    <p className={'font-semiBold text-[14px]'}>Free Tickets</p>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Sold:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>30</p>
                                    </div>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Commission:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>N2,000</p>
                                    </div>
                                </div>
                                <div
                                    className={'flex flex-col bg-white border-[1px] border-grey-20 gap-[8px] rounded-[8px] p-[12px] w-full h-[103px]'}>
                                    <p className={'font-semiBold text-[14px]'}>Free Tickets</p>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Sold:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>30</p>
                                    </div>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Commission:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>N2,000</p>
                                    </div>
                                </div>
                                <div
                                    className={'flex flex-col bg-white border-[1px] border-grey-20 gap-[8px] rounded-[8px] p-[12px] w-full h-[103px]'}>
                                    <p className={'font-semiBold text-[14px]'}>Free Tickets</p>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Sold:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>30</p>
                                    </div>
                                    <div className={"flex gap-[24px] items-center-center"}>
                                        <div className={"w-[115px]"}>
                                            <p className={"text-text-grey text-[12px] font-medium"}>Commission:</p>
                                        </div>
                                        <p className={"text-[14px] font-medium"}>N2,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default AffiliateDetailsPage;