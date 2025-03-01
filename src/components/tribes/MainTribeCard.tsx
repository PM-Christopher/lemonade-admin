import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { ChevronLeft, DotIcon, HeartIcon, MessageSquare, MoreVerticalIcon, SearchIcon } from "lucide-react";

const MainTribeCard = () => {
  return (
    <>
      <div className="flex flex-col  gap-[8px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-[8px] items-center">
            <div className="w-[48px] h-[48px] rounded-[10px] bg-gray-600"></div>
            <div className="flex items-center gap-[8px]">
              <p className="text-[14px] font-normal">Christjoe</p>
              <Image src={"/images/verified.png"} alt="verified" width={13} height={13} />
              <DotIcon className="text-light-grey-50 px-[0px]" />
              <p className="font-normal text-[12px] text-text-grey">2s</p>
            </div>
          </div>
          <MoreVerticalIcon className="text-text-grey cursor-pointer" />
        </div>
        <p className="font-medium text-[14px]">Why are architectural structures not as good as before</p>
        <p className="font-sans font-normal leading-[21px] text-[14px] text-light-black mt-[30px]">
          This is the detail of the thread.
          {/* {isExpanded || !thread?.thoughts || thread.thoughts.length <= charLimit ? thread?.thoughts : `${thread.thoughts.slice(0, charLimit)}...`} */}
        </p>
        {/* {thread?.thoughts && thread.thoughts.length > charLimit && (
            <p className="font-sans font-semi-normal text-[14px] text-light-green cursor-pointer" onClick={handleToggle}>
              {isExpanded ? "see less" : "see more"}
            </p>
          )} */}
        <div className="flex gap-4 mt-2">
          <div className="rounded-[12px] bg-light_grey p-[4px] px-[8px] w-[64px] h-[30px] flex justify-center items-center cursor-pointer bg-light-grey">
            <HeartIcon className="w-[14px] text-text-grey" />
            {/* {
                        thread?.hasLiked ? (
                            <HeartFilledIcon/>
                        ) : (
                            <HeartIcon className=""/>
                        )
                    } */}
          </div>
          <div className="rounded-[12px] bg-light_grey p-[4px] px-[8px] w-[64px] h-[30px] flex justify-center items-center cursor-pointer bg-light-grey">
            <MessageSquare className="w-[14px] text-text-grey" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTribeCard;
