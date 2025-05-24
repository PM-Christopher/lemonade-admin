import React from "react";
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {
  affiliateMainData,
  affiliateMainHeaders,
  promotionMainData,
  promotionMainHeaders,
} from "@/data/tableData";

const PromotionView = ({ pageData }: any) => {

  return (
    <>
      <>
        <div
          className={
            "flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"
          }
        >
          <DataCard
            styles={"w-full"}
            title={"Promotions Revenue"}
            count={pageData?.promotions_revenue || 0}
            isPrice={true}
          />
          <DataCard
            styles={"w-full"}
            title={"Total Promotions"}
            count={pageData?.total_promotions || 0}
          />
          <DataCard
            styles={"w-full"}
            title={"Offered Promotions"}
            count={pageData?.offered_promotions || 0}
            isLink={true}
            pageLink={"/events/add-promotions"}
          />
        </div>
        <GlobalTable
          headers={promotionMainHeaders}
          content={pageData?.history}
        />
      </>
    </>
  );
};

export default PromotionView;
