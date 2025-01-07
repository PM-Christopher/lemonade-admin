import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {boostingData, boostingHeaders} from "@/data/tableData";

function BoostingViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Boosting Revenue"} count={3000000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Boosted Businesses"} count={10000}/>
            </div>
            <GlobalTable headers={boostingHeaders} content={boostingData}/>
        </>
    );
}

export default BoostingViews;