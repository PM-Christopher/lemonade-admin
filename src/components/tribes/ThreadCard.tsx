"use client"
import React, { useState } from 'react';
import Image from "next/image";
import {DotIcon} from "lucide-react";
import {MoreIcon} from "evergreen-ui";

interface ModalPosition {
    top: number;
    left: number;
}

interface ThreadCardProps {
    thread: any,
    tribe_id: number,
    toggle: () => void,
    switchUserId: any,
    pinThread: any,
    toggleThreadId: (id: number) => void,
    toggleDeleteThread: (id: number) => void,
}

const ThreadCard: React.FC = ({}) => {

    const [isExpanded, setIsExpanded] = useState(false); // State to track if text is expanded
    const [modalPosition, setModalPosition] = useState<ModalPosition | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const charLimit = 200;
    const [content] = useState('This is the content of the text you are reading and this is happening at the moment')

    const handleToggle = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };


    return (
        <div className="p-4 py-4 w-full h-full grid gap-[50px]">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <div>
                            <Image src={"/images/tribe_1.png"} alt="" width={48} height={48}
                                   className="w-[48px] h-[48px] rounded-[16px] border-[1px] border-grey-90"/>
                        </div>
                        <div>
                            <p className="font-semi-normal font-sans text-[14px] leading-[14.4px]">christjoe</p>
                        </div>
                        {/*{*/}
                        {/*    thread?.created_by.user.verified && (*/}
                                <div>
                                    <Image src={"/images/verified.png"} alt="verifed" width={13} height={13}/>
                                </div>
                        {/*    )*/}
                        {/*}*/}
                        <div>
                            <DotIcon className="w-[3px] h-[3px]"/>
                        </div>
                        <div>
                            <p className="font-sans font-normal text-[12px] leading-[14.4px]">{"thread?.created_at"}</p>
                        </div>
                    </div>
                    {/*<div className="cursor-pointer" ref={moreIconRef}>*/}
                        <MoreIcon className="cursor-pointer"/>
                    {/*</div>*/}
                </div>
                <div className="mt-[4px]">
                    <p className="font-sans font-semibold text-[14px] leading-[21px]">
                        {"thread?.topic"}
                    </p>
                    <p className="font-sans font-normal leading-[21px] text-[14px] text-light-black mt-[30px]">
                        {isExpanded || content || content.length <= charLimit
                            ? content
                            : `${content.slice(0, charLimit)}...`}
                    </p>
                    {content && content.length > charLimit && (
                        <p
                            className="font-sans font-semi-normal text-[14px] text-light-green cursor-pointer"
                            onClick={handleToggle}
                        >
                            {isExpanded ? "see less" : "see more"}
                        </p>
                    )}
                </div>
                {/*{*/}
                {/*    thread?.media.length > 0 && (*/}
                {/*        <div>*/}
                {/*            <Image src={thread?.media[0]} alt="thread_image" width={736} height={540} objectFit="contain"*/}
                {/*                   className="w-[736px] h-[540px] rounded-[12px]" layout="responsive"/>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}

                {/*{*/}
                {/*    thread?.polls && thread?.thread_polls?.options.length > 0 && (*/}
                {/*        thread?.thread_polls?.options?.map((option, index) => (*/}
                {/*            <div className="grid gap-2 mt-[16px] bg-light_grey rounded-[12px] cursor-pointer"*/}
                {/*                 onClick={() => pollVote(option.id)} key={index}>*/}
                {/*                <div className="relative w-full h-[40px] bg-grey rounded-[8px] overflow-hidden">*/}
                {/*                    /!* Background bar showing the percentage *!/*/}
                {/*                    <div*/}
                {/*                        className="absolute top-0 left-0 h-full bg-light-green-90 rounded-[8px]"*/}
                {/*                        style={{width: `${option.vote_percentage}%`}}*/}
                {/*                    ></div>*/}
                {/*                    /!* Content of the option *!/*/}
                {/*                    <div className="relative z-10 flex justify-between items-center p-3">*/}
                {/*                        <div className="flex gap-2 items-center">*/}
                {/*                            {*/}
                {/*                                thread?.thread_polls.has_voted && (*/}
                {/*                                    thread.thread_polls.user_vote?.id === option.id ? (*/}
                {/*                                        <VotedIcon className="w-[20px] h-[20px]"/>*/}
                {/*                                    ) : (*/}
                {/*                                        <NotVoted className="w-[20px] h-[20px]"/>*/}
                {/*                                    )*/}
                {/*                                )*/}
                {/*                            }*/}

                {/*                            <p className="font-semi-normal text-[14px]">{option.content}</p>*/}
                {/*                        </div>*/}
                {/*                        <p className="font-semi-normal text-[14px]">{option.vote_percentage}%</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*    )*/}
                {/*}*/}
                {/*{*/}
                {/*    thread?.polls && (*/}
                {/*        <div className="mt-2">*/}
                {/*            <p className="text-text-grey text-[12px] font-semi-normal">*/}
                {/*                {`${thread?.thread_polls.total_votes} vote${thread?.thread_polls.total_votes === 1 ? '' : 's'}`}*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}

            </div>
            <div className="flex gap-4 mt-2">

            </div>
            {isModalVisible && modalPosition && (
                <div
                    className="absolute bg-white shadow-lg z-10 rounded-[12px] flex flex-col w-[170px]"
                    style={{
                        top: modalPosition.top,
                        left: modalPosition.left,
                        minWidth: "150px",
                    }}
                >
                    {/*<div className="p-[12px] px-[16px] flex gap-[8px] items-center cursor-pointer"*/}
                    {/*     onClick={() => switchUserId(thread?.created_by?.user?.id)}>*/}
                    {/*    <UserIcon className="w-[16.25px] h-[16.25px]"/>*/}
                    {/*    <p className="font-normal text-[16px] text-black-light">View profile</p>*/}
                    {/*</div>*/}
                    {/*<div className="p-[12px] px-[16px] flex gap-[8px] items-center cursor-pointer"*/}
                    {/*     onClick={() => pinThread(thread?.id)}>*/}
                    {/*    <PinIcon className="w-[16.25px] h-[16.25px]"/>*/}
                    {/*    <p className="font-normal text-[16px] text-black-light">Pin Thread</p>*/}
                    {/*</div>*/}
                    {/*<div className="p-[12px] px-[16px] flex gap-[8px] items-center cursor-pointer"*/}
                    {/*     onClick={() => toggleThreadId(thread?.id)}>*/}
                    {/*    <FlagIcon className="w-[16.25px] h-[16.25px]"/>*/}
                    {/*    <p className="font-normal text-[16px] text-black-light">Report Thread</p>*/}
                    {/*</div>*/}
                    {/*<div className="p-[12px] px-[16px] flex gap-[8px] items-center cursor-pointer"*/}
                    {/*     onClick={() => toggleDeleteThread(thread?.id)}>*/}
                    {/*    <TrashRedIcon className="w-[16.25px] h-[16.25px]"/>*/}
                    {/*    <p className="text-red-1 font-normal text-[16px]">Delete thread</p>*/}
                    {/*</div>*/}
                </div>
            )}
            <div className="w-full border-b-[1px]"></div>
        </div>
    );
}

export default ThreadCard;