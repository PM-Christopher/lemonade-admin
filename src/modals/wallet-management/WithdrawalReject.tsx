import React from 'react';
import {XIcon} from "lucide-react";

type WithdrawalRejectInterface = {
    isOpen: boolean;
    toggle: () => void;
}

const WithdrawalReject: React.FC<WithdrawalRejectInterface> = ({isOpen, toggle}) => {
    if (!isOpen) return null;
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
                isOpen ? "flex" : "hidden"
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6" style={{width: "480px"}}>
                <div className="flex justify-between items-center">
                    <p className={"text-[18px] font-semiBold"}>Reject withdrawal</p>
                    <div className="cursor-pointer" onClick={toggle}>
                        <XIcon/>
                    </div>
                </div>
                <div className={"flex flex-col"} style={{marginTop: "20px", gap: "16px"}}>
                    <p className={"text-[14px] font-normal"}>Are you sure you want to reject this wallet balance withdrawal?</p>

                    <div className={"flex justify-between gap-[16px]"}>
                        <button
                            className={"border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"}>
                            <p className={"text-black text-[16px] font-medium"}>Cancel</p>
                        </button>
                        <button
                            className={"border-[1px] px-[48px] py-[11px] rounded-[12px] w-full"} style={{background: "#DB0000"}}>
                            <p className={"text-[16px] font-medium text-white"}>Reject</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithdrawalReject;