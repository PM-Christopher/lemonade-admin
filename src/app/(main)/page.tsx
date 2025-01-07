"use client"
import React, {useEffect, useState} from "react"
import MainLayout from "@/components/layouts/MainLayout";
import DataCard from "@/components/global/DataCard";
import {CalendarIcon, ChevronDown} from "lucide-react";

export default function Home() {
  const data = [
    { title: "Total Users", value: 20000 ,isPrice: false },
    { title: "Total Subscription Revenue", value: 300000, isPrice: true },
    { title: "Total Tickets Revenue", value: 300000, isPrice: true },
    { title: "Total Business Boosting Revenue", value: 300000, isPrice: true },
    { title: "Total Event Promotion Revenue", value: 300000, isPrice: true },
    { title: "Total Referral Earnings", value: 300000, isPrice: true },
    { title: "Total Affiliate Earnings", value: 300000, isPrice: true },
    { title: "Total Membership Plan Users", value: 1000 ,isPrice: false },
    { title: "Total Free Plan Users", value: 1000 ,isPrice: false },
    { title: "Total Number of Referrers", value: 1000 ,isPrice: false },
    { title: "Total Number of Referrals", value: 1000 ,isPrice: false },
    { title: "Total Tribes", value: 1000 ,isPrice: false },
    { title: "Total Businesses", value: 1000 ,isPrice: false },
    { title: "Total Events", value: 1000 ,isPrice: false },
    { title: "Total Boosted Businesses", value: 1000 ,isPrice: false },
    { title: "Total Promoted Events", value: 1000 ,isPrice: false },
  ];
  return (
      <MainLayout>
        <div className="px-[40px] gap-[20px] flex flex-col">
          <div className={"flex border-[1px] border-grey-20 bg-none w-fit px-[16px] py-[10px] rounded-[12px] gap-[30px]"}>
            <div className={'flex gap-2 items-center'}>
              <CalendarIcon className={"text-text-grey"}/>
              <p className={"text-[12px] font-semiBold"}>ALL TIME</p>
            </div>
            <ChevronDown className={"text-text-grey"}/>
          </div>
          <div className={"grid grid-cols-4 gap-[20px]"}>
            {data.map((item, index) => (
                <DataCard styles={"w-[276px] h-[132px]"} isPrice={item.isPrice} key={index} title={item.title}
                          count={item.value}/>
            ))}
          </div>
        </div>
      </MainLayout>
  );
}
