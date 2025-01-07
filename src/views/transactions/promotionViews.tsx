import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {promotionsData, promotionsHeaders, walletData, walletHeaders} from "@/data/tableData";

function WalletViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Total Promotion Revenue"} count={300000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Promotions"} count={200}/>
            </div>
            <GlobalTable headers={promotionsHeaders} content={promotionsData}/>
        </>
    );
}

export default WalletViews;