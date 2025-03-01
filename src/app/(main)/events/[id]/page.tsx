import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {
    CalendarIcon,
    ChevronDown,
    ChevronRight,
    ClockIcon,
    MapIcon,
    MapPinIcon,
    MessageCircleMore,
    PinIcon
} from "lucide-react";
import {usersDetailPageViews} from "@/utils/pageViews";

const Page = ({}) => {
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}>
                    <div className={'flex justify-between items-center border-b-[1px] p-[24px]'}>
                        <p className={'text-[16px] font-semiBold'}>Event summary</p>
                        <div className={'border-[1px] border-light-grey-50 p-[10px] px-[14px] flex items-center rounded-[12px] gap-[8px]'}>
                            <p className={'text-[14px] font-medium'}>Flag event</p>
                            <ChevronDown />
                        </div>
                    </div>
                    <div className={'flex flex-col p-[24px] gap-[20px]'}>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Owner:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
                                <p className={"text-[14px] font-medium text-light-green"}>View profile</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>EV112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-light-green-70"}>Completed</p>
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
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Category:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>Culture & tourism</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Payment Settings:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>Monthly</p>
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
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Ticket Revenue:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>N300,000</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Ticket Class:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>3</p>
                        </div>
                        <div className={"flex flex-col p-[12px] rounded-[12px] gap-[8px] bg-light-grey"}>
                            <p className={'font-semiBold text-[16px]'}>Free</p>
                            <p className={'font-normal text-[12px] text-light-black'}>Give you access to front row
                                seats</p>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Price:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>-</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Ticket Stock:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>Unlimited</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Purchase Limit:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>5</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Tickets Sold:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>34</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Sales Revenue:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>-</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Check-Ins:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>20</p>
                            </div>
                        </div>
                        <div className={"flex flex-col p-[12px] rounded-[12px] gap-[8px] bg-light-grey"}>
                            <p className={'font-semiBold text-[16px]'}>Free</p>
                            <p className={'font-normal text-[12px] text-light-black'}>Give you access to front row
                                seats</p>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Price:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>-</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Ticket Stock:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>Unlimited</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Purchase Limit:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>5</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Tickets Sold:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>34</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Sales Revenue:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>-</p>
                            </div>
                            <div className={"flex gap-[24px] items-center-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Check-Ins:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>20</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"w-[780px] h-fit bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col p-[24px] gap-[16px]"}>
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

export default Page;