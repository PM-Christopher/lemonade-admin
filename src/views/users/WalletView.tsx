import React, {useRef, useEffect, MouseEvent} from 'react';
import {CalendarIcon, ChevronDown, ChevronRight} from "lucide-react";

const WalletView = ({userDetail}: any) => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    }

    const handleClickOutside = (event: Event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside as EventListener)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside as EventListener)
        }
    }, []);


    return (
        <div className="flex flex-col">
            <div className="px-[24px] pt-[24px]" ref={containerRef}>
                <div className="relative inline-block">
                    <button
                        onClick={handleToggleDropdown}
                        className="flex gap-[8px] border-[1px] border-light-grey-50 w-fit h-[44px] rounded-[12px] justify-between items-center bg-transparent px-[14px] py-[12px]"
                    >
                        <p className="text-[12px] font-semiBold text-black-light">
                            Update balance
                        </p>
                        <ChevronDown className="text-black-light w-[20px]"/>
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute left-0 top-full mt-1 w-[207px] bg-white rounded-[12px] shadow z-50">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <p className={"font-normal text-[16px]"}>Add to balance</p>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <p className={"font-normal text-[16px]"}>Deduct from balance</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            <div className={"flex flex-col p-[24px]"}>
                <div className={"border-mid-grey p-[16px] border-[1px] rounded-[12px] flex flex-col"}>
                    <div className={"p-[16px] flex justify-between border-b-[1px] border-b-grey-20 cursor-pointer"}>
                        <div className={"flex flex-col gap-[8px]"}>
                            <p className={"text-[14px] font-normal text-text-grey"}>Total Amount Earned</p>
                            <p className={"font-semiBold text-[18px] text-black-light"}>₦300,000</p>
                        </div>
                        <ChevronRight className={"text-text-grey"}/>
                    </div>
                    <div className={"p-[16px] flex justify-between border-b-[1px] border-b-grey-20 cursor-pointer"}>
                        <div className={"flex flex-col gap-[8px]"}>
                            <p className={"text-[14px] font-normal text-text-grey"}>Referral Earning</p>
                            <p className={"font-semiBold text-[18px] text-black-light"}>₦300,000</p>
                        </div>
                        <ChevronRight className={"text-text-grey"}/>
                    </div>
                    <div className={"p-[16px] flex justify-between cursor-pointer"}>
                        <div className={"flex flex-col gap-[8px]"}>
                            <p className={"text-[14px] font-normal text-text-grey"}>Affiliate Earning</p>
                            <p className={"font-semiBold text-[18px] text-black-light"}>₦300,000</p>
                        </div>
                        <ChevronRight className={"text-text-grey"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletView;