"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import DataCard from "@/components/global/DataCard";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { getMetrics } from "@/features/dashboard/dashboard.slice";
import { RootState, AppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { metrics } = useSelector((state: RootState) => state.dashboard);

  console.log({ metrics });

  useEffect(() => {
    if (authToken) {
      dispatch(getMetrics({ token: authToken }));
    }
  }, []);

  const data = [
    { title: "Total Users", value: metrics?.total_users || 0, isPrice: false },
    {
      title: "Total Subscription Revenue",
      value: metrics?.total_users || 0,
      isPrice: true,
    },
    {
      title: "Total Tickets Revenue",
      value: metrics?.total_tickets_revenue || 0,
      isPrice: true,
    },
    {
      title: "Total Business Boosting Revenue",
      value: metrics?.total_business_boosting_revenue || 0,
      isPrice: true,
    },
    {
      title: "Total Event Promotion Revenue",
      value: metrics?.total_event_promotion_revenue || 0,
      isPrice: true,
    },
    {
      title: "Total Referral Earnings",
      value: metrics?.total_referral_earnings || 0,
      isPrice: true,
    },
    {
      title: "Total Affiliate Earnings",
      value: metrics?.total_affiliate_earnings || 0,
      isPrice: true,
    },
    {
      title: "Total Membership Plan Users",
      value: metrics?.total_membership_plan_users || 0,
      isPrice: false,
    },
    {
      title: "Total Free Plan Users",
      value: metrics?.total_free_plan_users || 0,
      isPrice: false,
    },
    {
      title: "Total Number of Referrers",
      value: metrics?.total_number_of_referrers || 0,
      isPrice: false,
    },
    {
      title: "Total Number of Referrals",
      value: metrics?.total_number_of_referrals || 0,
      isPrice: false,
    },
    { title: "Total Tribes", value: metrics?.total_tribes || 0, isPrice: false },
    {
      title: "Total Businesses",
      value: metrics?.total_business || 0,
      isPrice: false,
    },
    { title: "Total Events", value: metrics?.total_events || 0, isPrice: false },
    {
      title: "Total Boosted Businesses",
      value: metrics?.total_boosted_business || 0,
      isPrice: false,
    },
    {
      title: "Total Promoted Events",
      value: metrics?.total_promoted_events || 0,
      isPrice: false,
    },
  ];

  return (
    <MainLayout>
      <div className="px-[40px] gap-[20px] flex flex-col mt-[20px]">
        <div
          className={
            "flex border-[1px] border-grey-20 bg-none w-fit px-[16px] py-[10px] rounded-[12px] gap-[30px]"
          }
        >
          <div className={"flex gap-2 items-center"}>
            <CalendarIcon className={"text-text-grey"} />
            <p className={"text-[12px] font-semiBold"}>ALL TIME</p>
          </div>
          <ChevronDown className={"text-text-grey"} />
        </div>
        <div className={"grid grid-cols-4 gap-[20px]"}>
          {data.map((item, index) => (
            <DataCard
              styles={"w-[276px] h-[132px]"}
              isPrice={item.isPrice}
              key={index}
              title={item.title}
              count={item.value}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
