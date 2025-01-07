import React from 'react';
import {XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";

type WithdrawalActionInterface = {
    isOpen: boolean;
    toggle: () => void;
}

const WithdrawalApproval: React.FC<WithdrawalActionInterface> = ({ isOpen, toggle }) => {
    if (!isOpen) return null;
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
                isOpen ? "flex" : "hidden"
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6" style={{width: "480px"}}>
                <div className="flex justify-between items-center">
                    <p className={"text-[18px] font-semiBold"}>Approve withdrawal</p>
                    <div className="cursor-pointer" onClick={toggle}>
                        <XIcon/>
                    </div>
                </div>
                <div className={"flex flex-col"} style={{marginTop: "20px", gap: "16px"}}>
                    <p className={"text-[14px] font-normal"}>Are you sure you want to approve this wallet balance withdrawal?</p>
                    <div className={"p-[16px] rounded-[12px] bg-mid-grey flex flex-col"} style={{gap: "17px"}}>
                        <div className={"flex flex-col text-center"} style={{
                            border: "1px dashed #5B8601",
                            paddingTop: "16px",
                            paddingBottom: "16px",
                            paddingLeft: "102px",
                            paddingRight: "102px",
                            backgroundColor: "#F5FAEB",
                            borderRadius: "8px"
                        }}>
                            <p className={"font-medium text-text-grey text-[12px]"}>Amount</p>
                            <p className={"text-[24px] font-semiBold"} style={{color: "#5B8601"}}>N120,000</p>
                        </div>
                        <div className={"flex flex-col"}>
                            <p className={"text-text-grey font-medium text-[12px]"}>Account holder</p>
                            <p className={"font-semiBold text-[14px]"}>Funmilayo Johnson</p>
                        </div>
                        <div className={"flex flex-col"}>
                            <p className={"text-text-grey font-medium text-[12px]"}>Bank name</p>
                            <p className={"font-semiBold text-[14px]"}>GTB</p>
                        </div>
                        <div className={"flex flex-col"}>
                            <p className={"text-text-grey font-medium text-[12px]"}>Account number</p>
                            <p className={"font-semiBold text-[14px]"}>0123456789</p>
                        </div>
                    </div>
                    <div className={"flex justify-between gap-[16px]"}>
                        <button
                            className={"border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"}>
                            <p className={"text-black text-[16px] font-medium"}>Cancel</p>
                        </button>
                        <button
                            className={"border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"}>
                            <p className={"text-[16px] font-medium text-white"}>Approve</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalApproval