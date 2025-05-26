import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import { affiliateData, affiliateHeaders } from "@/data/tableData";
import React from "react";

const AffiliateView = ({ userData }: any) => {
  return (
    <>
      <div
        className={
          "flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"
        }
      >
        <DataCard
          styles={"w-full"}
          title={"Total Referral Earnings"}
          count={userData?.affiliates_earnings || 0}
          isPrice={true}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Number of Referrers"}
           count={userData?.total_affiliates || 0}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Number of Referrals"}
           count={userData?.affiliates_earnings || 0}
        />
      </div>
      <div className={"flex justify-between gap-[24px] w-full"}>
        <div className="flex-1">
          <GlobalTable headers={affiliateHeaders} content={affiliateData} />
        </div>
        <div className="flex flex-col border-[1px] border-yellow-accent-3 rounded-[12px] h-fit">
          <div className="w-[326px] h-[48px] bg-yellow-accent-1 rounded-tl-[12px] rounded-tr-[12px]">
            <div className="flex items-center px-[24px] py-[16px]">
              <p className="font-semibold text-[12px] text-light-black">
                Top 5 Referrers
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-yellow-accent-2 rounded-bl-[12px] rounded-br-[12px]">
            <div className="flex">
              <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                <p>Adebayo Akintoye</p>
              </div>
              <div className="w-[105px] p-[24px] px-[16px]">
                <p>3,000</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                <p>Adebayo Akintoye</p>
              </div>
              <div className="w-[105px] p-[24px] px-[16px]">
                <p>3,000</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                <p>Adebayo Akintoye</p>
              </div>
              <div className="w-[105px] p-[24px] px-[16px]">
                <p>3,000</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                <p>Adebayo Akintoye</p>
              </div>
              <div className="w-[105px] p-[24px] px-[16px]">
                <p>3,000</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                <p>Adebayo Akintoye</p>
              </div>
              <div className="w-[105px] p-[24px] px-[16px]">
                <p>3,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateView;
