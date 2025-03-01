"use client";
import MainLayout from "@/components/layouts/MainLayout";
import MainTribeCard from "@/components/tribes/MainTribeCard";
import ThreadCard from "@/components/tribes/ThreadCard";
import TribeDetails from "@/components/tribes/TribeDetails";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatIcon, MoreIcon, SendMessageIcon } from "evergreen-ui";
import { ChevronDown, ChevronLeft, CircleDotIcon, DotIcon, EditIcon, HeartIcon, MessageSquare, MoreVerticalIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TribeDetailPage = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); // State to track if text is expanded
  const charLimit = 200; // Set your desired character limit
  return (
    <MainLayout>
      <section className="bg-white flex justify-between">
        <div className="flex flex-col w-[888px] h-[780px] p-[24px] gap-[24px] border-r-[1px]">
          <MainTribeCard />
          <MainTribeCard />
        </div>

        <div className="flex flex-col w-[788px] h-[780px] p-[24px] gap-[24px]">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[16px]">Tribe details</p>
            <div className="px-[14px] py-[10px] border-[1px] border-light-grey-50 rounded-[12px]">
              <div className="flex items-center gap-[8px]">
                <p className="font-medium text-[14px]">Flag Tribe</p>
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-[30px] gap-[8px]">
            <div className="w-[96px] h-[96px] bg-gray-600 rounded-[24px]"></div>
            <p className="text-[16px] font-semibold">Start-ups</p>
            <p className="text-[12px] font-semibold text-text-grey">
              ID: <span className="text-light-black">FR-2322</span>
            </p>
            <p className="font-medium italic text-[14px] text-text-grey">Business</p>
            <div className="flex items-center">
              <p className="text-text-grey font-normal text-[12px]">3 members</p>
              <DotIcon className="text-text-grey" />
              <p className="text-text-grey font-normal text-[12px]">0 thread</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-normal text-[14px] text-light-black text-center max-w-[311px]">Share your start-up experiences to teach others on what to do</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-normal text-[12px] text-text-grey text-center">Created on 23 Mar, 2025</p>
          </div>
          <div className="flex justify-center">
            <Button className="bg-gradient-green border-step-color shadow-custom-bottom h-[60px] p-[14px] px-[24px] rounded-[37px]">
              <div className="flex gap-1 justify-center items-center">
                <EditIcon />
                <p className="font-sans font-semi-normal text-[16px] leading-[19.2px]">Create thread</p>
              </div>
            </Button>
          </div>
          <div className={"bg-light-grey px-[24px] py-[16px] rounded-[12px] flex flex-col gap-[8px]"}>
            <p className={"text-text-grey font-medium text-[14px]"}>Members</p>
            <div className={"flex justify-between py-[10px] border-b-[1px] border-b-grey-20"}>
              <div className={"flex gap-2 items-center"}>
                <Image src={"/images/tribe_1.png"} alt={"image"} width={20} height={20} />
                <p className={"text-[14px] font-medium"}>Samjoe</p>
              </div>
              <p className={"font-medium text-[14px] text-text-grey italic"}>Creator</p>
            </div>
            <div className={"flex justify-between py-[10px] border-b-[1px] border-b-grey-20"}>
              <div className={"flex gap-2 items-center"}>
                <Image src={"/images/tribe_1.png"} alt={"image"} width={20} height={20} />
                <p className={"text-[14px] font-medium"}>Christojoe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TribeDetailPage;
