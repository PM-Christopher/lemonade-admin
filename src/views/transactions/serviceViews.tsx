import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {servicesData, servicesHeaders} from "@/data/tableData";

function ServicesViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Amount in Escrow"} count={300000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Pending Services"} count={200}/>
            </div>
            <GlobalTable headers={servicesHeaders} content={servicesData}/>
        </>
    );
}

export default ServicesViews;