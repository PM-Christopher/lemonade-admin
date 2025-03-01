import React from 'react';
import {ChevronDown, ChevronLeft, SearchIcon, XIcon} from "lucide-react";
import FlameIcon from "@/icons/flameIcon.svg"
import Image from "next/image";
import ThreadCard from "@/components/tribes/ThreadCard";
import TribeDetails from "@/components/tribes/TribeDetails";

interface TribeModalProps {
    toggle: () => void;
    isOpen: boolean;
}

const TribeModal: React.FC<TribeModalProps> = ({toggle, isOpen}) => {
    return (
        <>
            <div
                className={`fixed p-4 top-0 right-0 z-50 bg-opacity-50 h-full transform transition-transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="w-[1152px] h-full bg-white p-[48px] px-[20px] rounded-[12px]">
                    <div className="flex justify-between border-b-[1px] pb-5 items-center gap-4">
                        <div className="flex gap-2 items-center cursor-pointer">
                            <div>
                                <p className="font-sans font-semibold text-[16px] leading-[24px]">
                                    Tribe name
                                </p>
                            </div>
                        </div>
                        <div>
                            <XIcon className="cursor-pointer" onClick={toggle}/>
                        </div>
                    </div>

                    <div className={"flex flex-row gap-6 p-2 h-full"}>
                        <div className={"h-full border-r-[1px]"}>
                            <div className={"flex flex-col gap-3 pr-[20px]"}>
                                <div className={"flex justify-between gap-[16px]"}>
                                    <div
                                        className="flex items-center gap-3 bg-light_grey px-[16px] h-[40px] rounded-[12px] w-[430px] bg-light-grey">
                                        <div>
                                            <SearchIcon className={"w-[12px]"}/>
                                        </div>
                                        <div className="w-full">
                                            <input
                                                id="search"
                                                type="text"
                                                className="rounded-xl text-[14px] bg-transparent border-0 w-full focus:outline-none focus:ring-0 focus:border-transparent"
                                                placeholder="Search tribe"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={"flex bg-mid-grey w-[180px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                                        <div className={'flex items-center gap-[8px]'}>
                                            <Image src={FlameIcon} alt="flame"/>
                                            <p className={"text-[14px] font-medium text-text-grey"}>
                                                Popular
                                            </p>
                                        </div>
                                        <ChevronDown className={"text-text-grey w-[20px]"}/>
                                    </div>
                                </div>
                                <ThreadCard/>
                                <ThreadCard/>
                            </div>
                        </div>
                        <TribeDetails/>
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div
                        className={`fixed z-10 inset-0 transition-all duration-300 ${
                            isOpen ? 'bg-black bg-opacity-50 backdrop-blur-sm' : 'bg-transparent'
                        }`}
                        onClick={toggle}
                    ></div>
                )
            }
        </>
    );
}

export default TribeModal;