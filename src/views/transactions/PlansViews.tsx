import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {planData, planHeaders} from "@/data/tableData";

function PlansViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Subscription Revenue"} count={300000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Subscribers"} count={200}/>
                <DataCard styles={"w-full"} title={"Churn Rate"} count={10} isPercentage={true}/>
            </div>
            <GlobalTable headers={planHeaders} content={planData}/>
        </>
    );
}

export default PlansViews;