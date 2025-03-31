import React, {useState} from 'react';
import {PlusIcon, XIcon} from "lucide-react";

interface CreatePromotionModalProps {
    isOpen: boolean;
    toggle: () => void;
}

const CreatePromotionModal:  React.FC<CreatePromotionModalProps> = ({isOpen, toggle}) => {
    const [eventType, setEventType] = React.useState('one-time');

    const [breakdowns, setBreakdowns] = useState<string[]>(['']);

    const handleAddField = () => {
        setBreakdowns([...breakdowns, '']);
    };

    const handleInputChange = (index: number, value: string) => {
        const newBreakdowns = [...breakdowns];
        newBreakdowns[index] = value;
        setBreakdowns(newBreakdowns);
    };

    const handleSave = () => {
        console.log('Saved Breakdowns:', breakdowns);
    };

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${isOpen ? "flex" : "hidden"}`}>
            <div className="w-[640px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
                <div className={"py-[4px] px-[16px]"}>
                    <div className="flex justify-between items-center">
                        <div className={'flex gap-[8px] items-center'}>
                            <XIcon onClick={toggle} className={'cursor-pointer'}/>
                            <p className="font-sans font-semibold text-[18px] leading-[27px]">
                                Create promotion
                            </p>
                        </div>
                        <div className="cursor-pointer" onClick={toggle}>
                            <button
                                className={"border-[1px] border-step-color px-[14px] py-[11px] rounded-[12px] bg-gradient-green w-full"}>
                                <p className={"text-[16px] font-medium text-white"}>Create promotion</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"py-[16px] flex flex-col gap-[24px] px-[16px]"}>
                    <div className={"flex flex-col gap-[2px]"}>
                        <p className={"text-text-grey font-normal text-[14px]"}>Promotion name</p>
                        <input className={"bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"} placeholder={""}/>
                    </div>
                    <div className={"flex flex-col gap-[4px]"}>
                        <p className={"text-text-grey font-normal text-[14px]"}>Promotion name</p>
                        <div className="flex gap-2">
                            <div
                                className={`flex gap-2 cursor-pointer rounded-[12px] p-[12px] px-[16px] items-center ${eventType === "one-time" ? "bg-gradient-green-2 shadow-event-custom" : "bg-light_grey text-text-grey"}`}
                                onClick={() => setEventType('one-time')}
                            >
                                <p className="font-sans font-normal text-[14px] leading-[21px] tracking-custom">One time</p>
                            </div>
                            <div
                                className={`flex gap-2 cursor-pointer rounded-[12px] p-[12px] px-[16px] items-center ${eventType === "unit" ? "bg-gradient-green-2 shadow-event-custom" : "bg-light_grey text-text-grey"}`}
                                onClick={() => setEventType('unit')}
                                >
                                <p className="font-sans font-normal text-[14px] leading-[21px] tracking-custom">Unit</p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-[2px]"}>
                        <p className={"text-text-grey font-normal text-[14px]"}>Promotion Price</p>
                        <input className={"bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"} placeholder={"N0.00"}/>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <p className="text-text-grey font-normal text-[14px]">Breakdown</p>
                        {breakdowns.map((breakdown, index) => (
                            <div key={index} className="flex flex-col gap-[2px]">
                                <input
                                    className="bg-light-grey p-[12px] gap-[12px] rounded-[12px] h-[48px] text-[14px]"
                                    placeholder="Enter breakdown of promotion"
                                    value={breakdown}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"flex justify-between gap-[16px] px-[16px] pb-[10px]"}>
                    <button
                        className={"border-[1px] px-[48px] py-[11px] rounded-[12px] bg-light-green-10 w-full flex items-center justify-center"}
                        onClick={handleAddField}
                    >
                        <PlusIcon className={'text-light-green'} />
                        <p className={"text-[16px] font-medium text-light-green"}>Add breakdown</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePromotionModal;