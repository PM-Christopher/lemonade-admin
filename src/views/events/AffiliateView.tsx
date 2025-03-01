import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {affiliateMainData, affiliateMainHeaders, eventMainData, eventMainHeaders} from "@/data/tableData";

const AffiliateView = ({}) => {
    return (
        <>
            <>
                <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                    <DataCard styles={"w-full"} title={"Ticket Affiliate Earning"} count={3000000} isPrice={true}/>
                    <DataCard styles={"w-full"} title={"Total Affiliates"} count={3000} />
                </div>
                <GlobalTable headers={affiliateMainHeaders} content={affiliateMainData}/>
            </>
        </>
    );
}

export default AffiliateView;