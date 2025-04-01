import React, {useState} from 'react';
import {XIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {userAction} from "@/features/user/user.slice";
import {eventAction} from "@/features/events/event.slice";

interface DeactivateModalProps {
    isOpen: boolean;
    toggle: () => void;
    id?: number
}

function SuspendModal({isOpen, toggle, id}: DeactivateModalProps) {
    const [selectedOption, setSelectedOption] = useState<string>('policy-violation');
    const dispatch  = useDispatch<AppDispatch>()
    const { authToken } = useSelector((state: RootState) => state.auth)
    // const { userAction: actionStatus } = useSelector((state: RootState) => state.user) as { userAction: any }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };


    const SubmitAction = () => {
        if (authToken && id) {
            dispatch(eventAction({token: authToken, id, actionType: "suspend"})).then((res: any) => {
                console.log({res})
                if (res.status === 200) {
                    toggle();
                }
            })
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${isOpen ? "flex" : "hidden"}`}>
            <div className="w-[360px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
                <div className={"py-[4px] px-[16px]"}>
                    <div className="flex justify-between items-center">
                        <p className="font-sans font-semibold text-[18px] leading-[27px]">
                            Suspend event
                        </p>
                        <div className="cursor-pointer" onClick={toggle}>
                            <XIcon/>
                        </div>
                    </div>
                </div>
                <div className={"py-[16px] flex flex-col gap-[16px] px-[16px]"}>
                    <p className={"text-[14px] font-normal text-light-black"}>
                        Are you sure you want to suspend this event? It will no longer be listed and all ticket sales will be lost.
                    </p>
                    <p className={'font-normal text-[14px] text-text-grey'}>Reason</p>
                    <select
                        className="bg-light-grey p-[12px] rounded-[12px]"
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value={'policy-violation'}>Policy violation</option>
                        <option value={'inappropriate-behaviour'}>Inappropriate behaviour</option>
                    </select>
                    <div className={"flex justify-between gap-[10px]"}>
                        <button className={"h-[48px] border-[1px] border-light-grey-50 rounded-[12px] bg-white w-[156px]"} onClick={toggle}>
                            <p className={"text-black text-[16px] font-medium"}>Cancel</p>
                        </button>
                        <button className={"h-[48px] border-[1px] bg-red-1 border-red-2 rounded-[12px] w-[156px] text-center"} onClick={SubmitAction}>
                            <p className={"text-[16px] font-medium text-white"}>Restrict</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuspendModal;