'use client'
import React, {useEffect} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getWalletDetail} from "@/features/wallet/wallet.slice";
import {getReportDetail} from "@/features/reporting/reporting.slice";
import {capitalizeWords, GetStatusClass} from "@/utils/helper";

function ReportDetailsPage() {
    const params = useParams()
    const dispatch  = useDispatch<AppDispatch>()
    const { authToken } = useSelector((state: RootState) => state.auth)
    const id = params.id ? (Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id)) : undefined;
    const { loading, report } = useSelector((state: RootState) => state.report) as { report: any, loading: boolean };

    useEffect(() => {
        if (id && authToken) {
            dispatch(getReportDetail({token: authToken, id}))
        }
    }, [id])

    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}>
                    <div className={'flex flex-col p-[24px] gap-[20px] border-b-[1px] border-b-grey-20'}>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Reported By:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>{report?.reported_by?.name}</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Report ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>RE112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Category:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>{capitalizeWords(report?.category)}</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Case:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>{report?.case}</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Submitted:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>{report?.date_submitted}</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-warning-bold"}>{capitalizeWords(report?.status)}</p>
                        </div>
                    </div>
                    <div className={'p-[24px]'}>
                        <button
                            className={'px-[48px] py-[11px] bg-gradient-green text-white font-medium text-[16px] rounded-[12px] w-full border-step-color border-[1px] font-sans'}
                            type={'button'}>Mark as resolved
                        </button>
                    </div>
                </div>
                <div
                    className={"w-[780px] h-fit bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col gap-[16px]"}>
                    <div className={'flex justify-between items-center p-[18px] border-b-[1px] border-b-grey-20'}>
                        <p className={'font-semiBold text-[16px]'}>Content</p>
                        <div className={'p-[10px] px-[14px] border-[1px] rounded-[12px]'}>
                            <p className={'font-medium text-[14px]'}>Delete</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default ReportDetailsPage;