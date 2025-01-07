"use client"
import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {ChevronDown, ChevronRight} from "lucide-react";
import WithdrawalApproval from "@/modals/wallet-management/WithdrawalApproval";
import WithdrawalReject from "@/modals/wallet-management/WithdrawalReject";
import UpdateBalance from "@/modals/wallet-management/UpdateBalance";
import PayoutHistory from "@/modals/wallet-management/PayoutHistory";
import ReferralHistory from "@/modals/wallet-management/ReferralHistory";
import AffiliateHistory from "@/modals/wallet-management/AffiliateHistory";

function WalletDetailsPage({}) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isRejectOpen, setIsRejectOpen] = React.useState<boolean>(false)
    const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false)
    const [updateType, setUpdateType] = React.useState<string>("add");

    // side menu state
    const [isPayoutOpen, setIsPayoutOpen] = React.useState(false);
    const [isReferralOpen, setIsReferralOpen] = React.useState(false);
    const [isAffiliateOpen, setIsAffiliateOpen] = React.useState(false);

    const toggleWithdrawalAction = () => {
        setIsOpen(!isOpen);
    }
    const toggleWithdrawalReject = () => {
        setIsRejectOpen(!isRejectOpen);
    }
    const toggleUpdateBalance = () => {
        setIsUpdateOpen(!isUpdateOpen);
    }
    const updateBalanceType = (type: string) => {
        setUpdateType(type);
    }

    // side menu toggles
    const togglePayoutHistory = () => {
        setIsPayoutOpen(!isPayoutOpen);
    }

    const toggleReferralHistory = () => {
        setIsReferralOpen(!isReferralOpen);
    }

    const toggleAffiliateHistory = () => {
        setIsAffiliateOpen(!isAffiliateOpen);
    }

    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"}>
                    <div className={"w-[64px] h-[64px] rounded-full bg-light-black"}></div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Full name:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>Adebayo Salami</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Wallet ID:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>WE112332</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Withdrawal Status:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>Pending</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Account Number:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>0001234321</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Account Holder:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>Funmilayo Johnson</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Bank Name:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>GTB</p>
                    </div>
                    <div className={"flex justify-between gap-[16px]"}>
                        <button
                            className={"border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"}>
                            <p className={"text-black text-[16px] font-medium"}>Reject withdrawal</p>
                        </button>
                        <button
                            className={"border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"}>
                            <p className={"text-[16px] font-medium text-white"}>Approve Withdrawal</p>
                        </button>
                    </div>
                </div>
                <div className={"h-[762px] bg-white rounded-[12px]"} style={{width: "908px"}}>
                    <div className={"p-[24px] border-b-[1px] border-b-grey-20"}>
                        <p className={"text-[16px] font-semiBold"}>Wallet summary</p>
                    </div>
                    <div className={"pt-[24px] px-[24px] pb-[12px]"}>
                        <div
                            className={"flex border-[1px] border-light-grey-50 bg-none w-fit h-[44px] px-[14px] py-[12px] rounded-[12px] gap-[8px] items-center"}>
                            <div className={'flex justify-between items-center'}>
                                <p className={"text-[14px] font-medium"}>
                                    Update Balance
                                </p>
                            </div>
                            <ChevronDown className={"w-[20px]"}/>
                        </div>
                    </div>
                    <div className={"px-[24px] pb-[24px]"}>
                        <div className={"p-[16px] border-[2px] border-mid-grey flex flex-col rounded-[12px]"}>
                            <div className={"p-[16px] border-b-[1px] border-b-grey-20 flex justify-between cursor-pointer"}>
                                <div className={"flex flex-col gap-[8px]"}>
                                    <p className={"font-normal text-text-grey text-[14px]"}>Total amount earned</p>
                                    <p className={"text-[18px] font-semiBold"}>N300,000</p>
                                </div>
                                <ChevronRight className={"cursor-pointer"}/>
                            </div>
                            <div className={"p-[16px] border-b-[1px] border-b-grey-20 flex justify-between cursor-pointer"}>
                                <div className={"flex flex-col gap-[8px]"}>
                                    <p className={"font-normal text-text-grey text-[14px]"}>Referral earning</p>
                                    <p className={"text-[18px] font-semiBold"}>N200,000</p>
                                </div>
                                <ChevronRight className={"cursor-pointer"}/>
                            </div>
                            <div className={"p-[16px] flex justify-between cursor-pointer"}>
                                <div className={"flex flex-col gap-[8px]"}>
                                    <p className={"font-normal text-text-grey text-[14px]"}>Affiliate earning</p>
                                    <p className={"text-[18px] font-semiBold"}>N100,000</p>
                                </div>
                                <ChevronRight className={"cursor-pointer"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <WithdrawalApproval isOpen={isOpen} toggle={toggleWithdrawalAction} />
            <WithdrawalReject isOpen={isRejectOpen} toggle={toggleWithdrawalReject} />
            <UpdateBalance isOpen={isUpdateOpen} toggle={toggleUpdateBalance} updateType={updateType} />

            <PayoutHistory isOpen={isPayoutOpen} toggle={togglePayoutHistory} data={[]} />
            <ReferralHistory isOpen={isReferralOpen} toggle={toggleReferralHistory} data={[]} />
            <AffiliateHistory isOpen={isAffiliateOpen} toggle={toggleAffiliateHistory} data={[]} />
        </MainLayout>
    );
}

export default WalletDetailsPage;