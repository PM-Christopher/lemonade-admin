import React from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {walletData, walletHeaders} from "@/data/tableData";

function WalletViews({}) {
    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Wallet Revenue"} count={5000000} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Wallets"} count={10000}/>
            </div>
            <GlobalTable headers={walletHeaders} content={walletData}/>
        </>
    );
}

export default WalletViews;