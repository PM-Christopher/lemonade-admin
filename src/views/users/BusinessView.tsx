import React from 'react';
import Image from "next/image";
import RocketGreenIcon from "@/icons/rocketIconGreen.svg"

const BusinessView = ({}) => {
    return (
        <div className="flex flex-col p-[24px] gap-[24px]">
            <div
                className="w-full relative bg-white rounded-[12px] p-[16px] bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: `url('/images/business-bg.png')`}}
            >
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <Image
                            src={"/images/business/jobLogo.png"}
                            alt="logo"
                            className="rounded-[16px] border-[1px] border-step-color"
                            width={64}
                            height={64}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-[8px]">
                        <p className="text-center font-semibold text-[16px]">
                            {"data?.business?.name"}
                        </p>
                        <p className="text-center font-medium text-[14px] text-text-grey">
                            {"data?.business?.city"}, {"data?.business?.country"}
                        </p>
                    </div>
                    <div className="flex justify-center mt-[8px]">
                        <div className="flex items-center gap-1 bg-mid-grey p-2 rounded-xl">
                            <Image src={"/images/medal.png"} alt="medal" width={16} height={16}/>
                            <p className="font-sans font-medium text-[14px] text-primary-black">
                                {/* rating value */}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 bg-light-green-10 rounded-bl-[12px] rounded-tr-[12px]">
                    <div className="flex p-[4px] px-[8px] gap-[4px] items-center">
                        <Image src={RocketGreenIcon} alt="boosted"/>
                        <p className="text-[14px] font-medium text-mid-green">Boosted</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content Section */}
            <div className="flex flex-col h-96">
                {/* The flex-1 and min-h-0 classes ensure that this div will shrink properly within the parent */}
                <div className="flex flex-col gap-[12px] min-h-0 overflow-y-auto hide-scrollbar">
                    <div className="flex flex-col gap-[12px] pb-[24px] border-b-[1px]">
                        <p className="font-bold text-[16px]">About business</p>
                        <p className="font-normal text-[14px] text-light-black">
                            We don't just design products, we build brands. We're a creative agency that takes your
                            vision from
                            initial concept to market success. By working with us, you benefit from a seamless
                            experience where
                            every step is reinforced.
                        </p>
                    </div>
                    <div className="flex flex-col gap-[12px] pb-[24px] border-b-[1px]">
                        <p className="font-bold text-[16px]">Business categories</p>
                        <p className="font-normal text-[14px] text-light-black">
                            Software development, Digital design
                        </p>
                    </div>
                    <div className="flex flex-col gap-[12px] pb-[24px] border-b-[1px]">
                        <p className="font-bold text-[16px]">Services</p>
                        <p className="font-normal text-[14px] text-light-black">
                            UI designs, Mock ups designs, Graphic designs
                        </p>
                    </div>
                    <div className="flex flex-col gap-[12px] pb-[24px] border-b-[1px]">
                        <p className="font-bold text-[16px]">Portfolio Gallery</p>
                        <div className="flex flex-wrap gap-1">
                            {/*{*/}
                            {/*    data?.business?.gallery?.map((item: string, index: string) => (*/}
                                    <Image src={"/images/tribe_1.png"} alt="image_1"
                                           className="rounded-[4px]" width={170.5}
                                           height={170.5} />
                            {/*    ))*/}
                            {/*}*/}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px] pb-[24px] border-b-[1px]">
                        <p className="font-bold text-[16px]">Reviews</p>
                        <p className="font-normal text-[14px] text-light-black">
                            UI designs, Mock ups designs, Graphic designs
                        </p>
                    </div>
                    
                </div>
            </div>

        </div>

    );
}

export default BusinessView;