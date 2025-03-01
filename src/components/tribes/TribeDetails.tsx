import React from 'react';
import Image from "next/image";
import {DotIcon} from "lucide-react";

const TribeDetails = () => {
    return (
        <div className="w-full flex flex-col gap-6 h-fit">
            <h3 className="text-lg font-semibold mb-3">Tribe details</h3>
            {/* Tribe Details Card */}
            <div className="bg-white rounded-lg p-4 w-[430px]">
                <div className="flex flex-col items-center mb-4 gap-2">
                    <Image
                        src="/images/tribe_1.png"
                        alt="Tribe"
                        width={96}
                        height={96}
                        className="rounded"
                    />
                    <p className="text-center text-[16px] font-semiBold">
                        Start-ups
                    </p>
                    <p className={"text-text-grey text-[14px] font-medium"}>Business</p>
                    <div className={"flex items-center"}>
                        <p className={"text-text-grey font-normal text-[12px]"}>3 members</p>
                        <DotIcon className={"text-text-grey"} />
                        <p className={"text-text-grey font-normal text-[12px]"}>1 thread</p>
                    </div>
                    <div className={"w-[311px]"}>
                        <p className="text-center text-[14px] text-light-black font-normal">
                            Share your start-up experiences to teach others on what to do.
                        </p>
                    </div>
                    <p className="text-center text-[12px] font-normal text-text-grey">Created on 23 Mar, 2024</p>
                </div>

            </div>

            {/* Private Tribe + Members Card */}
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <div className={"flex flex-col"}>
                        <p className="font-medium text-[16px]">Private Tribe</p>
                        <p className="font-normal text-text-grey text-[12px]">Available to only added members</p>
                    </div>
                </div>
                <div className={"bg-light-grey px-[24px] py-[16px] rounded-[12px] flex flex-col gap-[8px]"}>
                    <p className={"text-text-grey font-medium text-[14px]"}>Members</p>
                    <div className={"flex justify-between py-[10px] border-b-[1px] border-b-grey-20"}>
                        <div className={"flex gap-2 items-center"}>
                            <Image src={"/images/tribe_1.png"} alt={"image"} width={20} height={20}/>
                            <p className={'text-[14px] font-medium'}>Samjoe</p>
                        </div>
                        <p className={'font-medium text-[14px] text-text-grey italic'}>Creator</p>
                    </div>
                    <div className={"flex justify-between py-[10px] border-b-[1px] border-b-grey-20"}>
                        <div className={"flex gap-2 items-center"}>
                            <Image src={"/images/tribe_1.png"} alt={"image"} width={20} height={20}/>
                            <p className={'text-[14px] font-medium'}>Christojoe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TribeDetails;