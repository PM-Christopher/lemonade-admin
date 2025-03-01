import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";

function ReportDetailsPage() {
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
                                <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
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
                            <p className={"text-[14px] font-medium"}>Thread</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Case:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>Abuse & Harassment</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Submitted:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>23 Apr, 2024 09:45 PM</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-warning-bold"}>Pending</p>
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
                    className={"w-[780px] h-fit bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col p-[24px] gap-[16px]"}></div>
            </section>
        </MainLayout>
    );
}

export default ReportDetailsPage;