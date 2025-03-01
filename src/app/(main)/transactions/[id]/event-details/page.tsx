import React from 'react';
import {PrinterIcon} from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

function EventDetailsPage({}) {
    const currentPage:number = 1
    const totalPages: number = 10

    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"}>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Event name:</p>
                        </div>
                        <div className={"flex gap-[4px]"}>
                            <p className={"text-[14px] font-medium"}>Unlocking business potentials</p>
                            {/*<p className={"cursor-pointer font-medium text-[14px] text-light-green"}>View business</p>*/}
                        </div>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Event owner:</p>
                        </div>
                        <div className={"flex gap-[4px]"}>
                            <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
                            <p className={"cursor-pointer font-medium text-[14px] text-light-green"}>View profile</p>
                        </div>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Transaction Id:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>EV112332</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Amount:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>N30,000</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Tickets sold:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>3000</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Date paid:</p>
                        </div>
                        <p className={"text-[14px] font-medium"}>23 Apr, 2024 09:45 PM</p>
                    </div>
                    <div className={"flex gap-[24px] items-center-center"}>
                        <div className={"w-[115px]"}>
                            <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                        </div>
                        <p className={"text-[14px] font-medium text-light-green-70"}>Successful</p>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"} style={{width: "908px"}}>
                        <div className={"p-[24px] border-b-[1px] border-b-grey-20 flex justify-between items-center"}>
                            <p className={"text-[16px] font-semiBold"}>Boosting history</p>
                            <div
                                className={'flex gap-[10px] items-center border-[1px] border-light-grey-50 px-[12px] py-[10px] rounded-[12px]'}>
                                <PrinterIcon className={"w-[20px]"}/>
                                <p className={"font-medium text-[16px] text-black-light"}>Print</p>
                            </div>
                        </div>

                        <div className={"flex flex-col px-[24px]"}>
                            <div className="px-[16px] pt-[16px] pb-[24px]">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <p className={"font-medium text-[14px]"}>EV12343 - <span className={"font-semiBold"}>₦15,000</span></p>
                                        <p className={'text-text-grey font-normal text-[12px]'}>23, Mar 2023.
                                            05:00PM</p>
                                    </div>
                                    <div
                                        className={"bg-light-green-60 px-[8px] py-[4px] gap-[4px] rounded-[8px] h-fit"}>
                                        <p className={"text-light-green-70 font-medium text-[12px]"}>Successful</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"h-[62px] bg-mid-grey rounded-br-[12px] rounded-bl-[12px]"}
                         style={{width: "908px"}}>
                        <div
                            className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
                            <button
                                disabled={currentPage === 1}
                                // onClick={() => onPageChange(currentPage - 1)}
                                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div className="flex gap-2">
                                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        // onClick={() => onPageChange(page)}
                                        className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${
                                            page === currentPage ? 'bg-light-white text-text-grey' : 'text-gray-500'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={currentPage === totalPages}
                                // onClick={() => onPageChange(currentPage + 1)}
                                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default EventDetailsPage;