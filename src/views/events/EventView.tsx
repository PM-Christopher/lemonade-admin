import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {eventMainData, eventMainHeaders} from "@/data/tableData";

const EventView = ({}) => {
    return (
        <>
            <>
                <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                    <DataCard styles={"w-full"} title={"Ticket Commission"} count={3000000} isPrice={true}/>
                    <DataCard styles={"w-full"} title={"Commission Percentage"} isPercentage={true} count={0.1} isEditable={true}/>
                    <DataCard styles={"w-full"} title={"Total Events"} count={200} />
                </div>
                <GlobalTable headers={eventMainHeaders} content={eventMainData}/>
            </>
        </>
    );
}

export default EventView;