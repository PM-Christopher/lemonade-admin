import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {affiliateMainData, affiliateMainHeaders, promotionMainData, promotionMainHeaders} from "@/data/tableData";

const PromotionView = ({}) => {
    return (
        <>
            <>
                <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                    <DataCard styles={"w-full"} title={"Promotions Revenue"} count={3000000} isPrice={true}/>
                    <DataCard styles={"w-full"} title={"Total Promotions"} count={3000} />
                    <DataCard styles={"w-full"} title={"Offered Promotions"} count={10} />
                </div>
                <GlobalTable headers={promotionMainHeaders} content={promotionMainData}/>
            </>
        </>
    );
}

export default PromotionView;