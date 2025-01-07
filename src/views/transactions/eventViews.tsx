import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {walletData, walletHeaders} from "@/data/tableData";

function EventViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Total Ticket Revenue"} count={200000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Tickets Sold"} count={30000}/>
                <DataCard styles={"w-full"} title={"Total Events"} count={200}/>
            </div>
            <GlobalTable headers={walletHeaders} content={walletData}/>
        </>
    );
}

export default EventViews;