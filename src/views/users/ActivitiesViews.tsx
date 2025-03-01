import React from 'react';
import {CalendarIcon, ChevronDown} from "lucide-react";

function ActivitiesViews({}) {
    return (
        <>
            <div className={"flex flex-col py-[20px]"}>
                <div className={"px-[24px] py-[16px]"}>
                    <div
                        className={"flex border-[1px] border-grey-20 w-[193px] h-[40px] rounded-[12px] justify-between items-center bg-light-grey px-[16px] py-[10px]"}>
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
        </>
    );
}

export default ActivitiesViews;