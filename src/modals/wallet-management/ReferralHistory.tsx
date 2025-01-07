import React from 'react';
import {XIcon} from "lucide-react";
import {referralHistoryData} from "@/data/walletData";

type ReferralHistoryInterface = {
    isOpen: boolean;
    toggle: () => void;
    data: any;
}

const ReferralHistory: React.FC<ReferralHistoryInterface> = ({isOpen, toggle, data}) => {
    if (!isOpen) return null;
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
                            <p className="font-sans font-semibold text-[16px] leading-[24px] tracking-custom">Referral
                                history</p>
                        </div>
                        <div>
                            <XIcon className="cursor-pointer" onClick={toggle}/>
                        </div>
                    </div>
                    <div className={"flex flex-col px-[24px] mt-[16px]"}>
                        {
                            referralHistoryData.map((item: any, index: number) => (
                                <div className={"flex justify-between px-[16px] pt-[16px] pb-[24px]"} key={index}>
                                    <div className={"flex flex-col"}>
                                        <p className={"font-medium text-[14px]"}>{item.amount} - {item.type}</p>
                                        <p className={"text-[12px] font-normal text-text-grey"}>
                                            {item.date}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default ReferralHistory;