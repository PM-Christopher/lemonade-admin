import React from 'react';
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {ChatIcon} from "evergreen-ui";

const TribeCard = ({tribeDetails}: {tribeDetails: any}) => {
    return (
        <div className="px-[24px]">
            <div className="bg-mid-grey rounded-[16px] mb-2 border-[1px] border-grey-30">
                <div className="flex items-center justify-between bg-white p-4 rounded-[16px]">
                    <div className="flex gap-2 items-center">
                        <div>
                            <Image src={"/images/tribe_image.png"} alt="tribe image" width={40} height={40}/>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <p className="font-sans text-[14px] font-semibold">{tribeDetails?.name}</p>
                            </div>
                            <div>
                                <p className="font-sans font-normal text-[12px] text-text-grey">Created
                                    on {tribeDetails?.created_at}</p>
                            </div>
                        </div>
                    </div>
                    <ChevronRight className={"w-[10px] text-text-grey"}/>
                </div>
                <div className="flex justify-between p-4 bg-mid-grey rounded-b-[16px] py-6">
                    <div>
                        <p className="font-sans font-semi-normal text-[12px] leading-[14.4px] text-black-light">
                            {tribeDetails?.category}
                        </p>
                    </div>
                    <div>
                        <p className="font-sans font-semi-normal text-[12px] leading-[14.4px] text-black-light">
                            {tribeDetails?.members} Members</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <ChatIcon/>
                        <p className="font-sans font-semi-normal text-[12px] leading-[14.4px] text-black-light">
                            {tribeDetails?.threads} threads
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TribeCard;