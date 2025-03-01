"use client"
import React, {useState} from 'react';
import AffiliateView from "@/views/events/AffiliateView";
import { CalendarIcon, ChevronDown, SearchIcon } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { eventViews } from "@/utils/pageViews";
import EventView from "@/views/events/EventView";
import PromotionView from "@/views/tribes/PromotionView";

const EventsPage = () => {
    const [menuOption, setMenuOption] = useState("events");

    const switchOption = (option: string) => {
        setMenuOption(option)
    }

    const renderViews = () => {
        switch (menuOption) {
            case "events":
                return <EventView />
            case "affiliates":
                return <AffiliateView />
            case "promotions":
                return <PromotionView />
            default:
                return <></>
        }
    }
    return (
        <MainLayout>
            <section className="flex flex-col gap-[20px] mt-[24px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>300 Events</p>
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
                                    placeholder="Search event, ID..."
                                />
                            </div>
                        </div>
                        <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex justify-between items-center'}>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>
                                    STATUS
                                </p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div>
                        <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex gap-2 items-center'}>
                                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"}/>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>ALL TIME</p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] flex flex-col "}>
                    <div className={"border-[1px] border-grey-20 rounded-[12px] flex flex-col"}>
                        <div className={"px-[12px] pt-[8px] w-fit"}>
                            <div className={"flex gap-6 bg-mid-grey p-[4px] items-center rounded-[12px]"}>
                                {
                                    eventViews.map((item, index) => (
                                        <div
                                            className={`px-[8px] p-[4px] cursor-pointer ${menuOption === item.key && "bg-white rounded-[10px]"}`}
                                            onClick={() => switchOption(item.key)}
                                            key={index}
                                        >
                                            <p className={`font-sans leading-[24px] ${menuOption === item.key ? "font-semibold text-[16px]" : "font-semi-normal text-[16px] text-text-grey"}`}>{item.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {renderViews()}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
export default EventsPage;