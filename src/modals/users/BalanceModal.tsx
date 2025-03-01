import React from 'react';
import {XIcon} from "lucide-react";

interface BalanceModalProps {
    isOpen: boolean;
    toggle: () => void;
}

const BalanceModal:  React.FC<BalanceModalProps> = ({isOpen, toggle}) => {
    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${isOpen ? "flex" : "hidden"}`}>
            <div className="w-[360px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
                <div className={"py-[4px] px-[16px]"}>
                    <div className="flex justify-between items-center">
                        <p className="font-sans font-semibold text-[18px] leading-[27px]">
                            Add to balance
                        </p>
                        <div className="cursor-pointer" onClick={toggle}>
                            <XIcon/>
                        </div>
                    </div>
                </div>
                <div className={"py-[16px] flex flex-col gap-[16px] px-[16px]"}>
                    <div className={"flex flex-col gap-[4px]"}>
                        <p className={"text-text-grey font-normal text-[14px]"}>Amount</p>
                        <input className={"bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"} placeholder={"N3000"}/>
                    </div>
                    <p className={"text-[14px] font-normal text-light-black"}>Wallet balance: <span className={"font-sans font-bold"}>N300,000</span></p>
                </div>
                <div className={"flex justify-between gap-[16px] px-[16px] pb-[10px]"}>
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
    );
}

export default BalanceModal;