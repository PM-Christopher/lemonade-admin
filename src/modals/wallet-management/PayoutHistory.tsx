import React from 'react';
import {XIcon} from "lucide-react";
import {payoutHistoryData} from "@/data/walletData";

type PayoutHistoryInterface = {
    isOpen: boolean;
    toggle: () => void;
    data: any;
}

const PayoutHistory: React.FC<PayoutHistoryInterface> = ({isOpen, toggle, data}) => {
    if (!isOpen) return null;

    const renderStyle = (status: string) => {
        switch (status) {
            case "Processing":
                return "bg-warning text-warning-bold";
            case "Successful":
                return "bg-light-green-60 text-light-green-70";
            case "Failed":
                return "bg-red-accent-1 text-red-1";
        }
    }

    return (
        <>
            <div
                className={"fixed inset-0 flex justify-end bg-gray-800 bg-opacity-50 z-50 transform transition-transform"}
                style={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "20px"
                }}
            >
                <div className="h-full bg-white rounded-[12px] flex flex-col" style={{width: "585px"}}>
                    <div className="flex justify-between items-center" style={{paddingTop: "24px", paddingBottom: "8px", paddingLeft: "24px", paddingRight: "24px"}}>
                        <div>
                            <p className="font-sans font-semibold text-[16px] leading-[24px] tracking-custom">Payout
                                history</p>
                        </div>
                        <div>
                            <XIcon className="cursor-pointer" onClick={toggle}/>
                        </div>
                    </div>
                    <div className={"flex flex-col px-[24px] mt-[16px]"}>
                        {
                            payoutHistoryData.map((item: any, index: number) => (
                                <div className={"flex justify-between px-[16px] pt-[16px] pb-[24px]"}>
                                    <div className={"flex flex-col"}>
                                        <p className={"font-medium text-[14px]"}>{item.amount}</p>
                                        <p className={"text-[12px] font-normal text-text-grey"}>
                                            {item.date}
                                        </p>
                                    </div>
                                    <p className={`text-[12px] font-medium px-[8px] py-[4px] h-fit rounded-[8px] ${renderStyle(item.status)}`}>{item.status}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default PayoutHistory;