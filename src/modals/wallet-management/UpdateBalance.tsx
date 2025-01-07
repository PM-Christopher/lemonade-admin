import React from 'react';
import {XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";

type UpdateBalanceInterface = {
    isOpen: boolean;
    toggle: () => void;
    updateType: string
}

const UpdateBalance: React.FC<UpdateBalanceInterface> = ({isOpen, toggle, updateType}) => {
    if (!isOpen) return null;
    const renderType = () => {
        switch (updateType) {
            case "add":
                return "Add to balance";
            case "deduct":
                return "Deduct from balance";
            default:
                return "Add to balance"
        }
    }
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
                isOpen ? "flex" : "hidden"
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6" style={{width: "480px"}}>
                <div className="flex justify-between items-center">
                    <p className={"text-[18px] font-semiBold"}>{renderType()}</p>
                    <div className="cursor-pointer" onClick={toggle}>
                        <XIcon/>
                    </div>
                </div>
                <div className={"flex flex-col"} style={{marginTop: "20px", gap: "16px"}}>
                    <div className={"flex flex-col"} style={{gap: "4px"}}>
                        <p className={"text-text-grey font-normal text-[14px]"}>Amount</p>
                        <Input className={"bg-light-grey h-[48px] rounded-[12px] py-[12px] px-[12px] border-none"}
                               placeholder={"Amount"}/>
                    </div>

                    <p className={"font-normal text-[14px]"}>Wallet balance: <span className={"font-bold text-[14px]"}>₦300,000</span></p>

                    <div className={"flex justify-between gap-[16px]"}>
                        <button
                            className={"border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"}>
                            <p className={"text-black text-[16px] font-medium"}>Cancel</p>
                        </button>
                        <button
                            className={"border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"}>
                            <p className={"text-[16px] font-medium text-white"}>Confirm</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateBalance;