"use client"
import React, {useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {CalendarIcon, ChevronDown, SearchIcon, UploadIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {walletMgtData, walletMgtHeaders} from "@/data/tableData";
import WalletThresholdModal from "@/modals/wallet-management/WalletThresholdModal";

function WalletMgtPage({}) {
    const [editThreshold, setEditThreshold] = useState(true);

    const toggleEditThreshold = () => {
        console.log(editThreshold)
        setEditThreshold(!editThreshold);
    }
    return (
        <MainLayout >
            <section className="flex flex-col gap-[20px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>10,000 Wallets</p>
                    <div className={"flex justify-between gap-[12px]"}>
                        <div
                            className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
                            <div>
                                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"}/>
                            </div>
                            <div className="w-full">
                                <input
                                    id="search"
                                    type="text"
                                    className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                                    placeholder="Search guest name, email address"
                                />
                            </div>
                        </div>
                        <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex justify-between items-center'}>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>
                                    STATUS
                                </p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div>
                        <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex gap-2 items-center'}>
                                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"}/>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>ALL TIME</p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div>
                        <div>
                            <Button className={"flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"}>
                                <UploadIcon className={"text-white w-[15px] h-[15px]"}/>
                                <p className={"text-white font-medium text-[16px]"}>Export</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] flex flex-col "}>
                    <div className={"border-[1px] border-grey-20 rounded-[12px] flex flex-col"}>
                        <div className={"grid grid-cols-3 gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                            <DataCard title={"Wallet Revenue"} count={5000000} isPrice={true}/>
                            <DataCard title={"Total Wallets"} count={10000}/>
                            <DataCard title={"Withdrawal Threshold"} count={100000} isPrice={true} isEditable={true} handleChange={toggleEditThreshold}/>
                        </div>
                        <GlobalTable headers={walletMgtHeaders} content={walletMgtData} />
                    </div>
                </div>
            </section>
            <WalletThresholdModal isOpen={editThreshold} toggle={toggleEditThreshold} />
        </MainLayout>
    );
}

export default WalletMgtPage;