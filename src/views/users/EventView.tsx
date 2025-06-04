import React from "react";
import { CalendarIcon, ChevronDown, Dot, DotIcon } from "lucide-react";
import Image from "next/image";

interface EventViewProps {
  userDetail: any;
}

const EventView: React.FC<EventViewProps> = ({ userDetail }) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className={"px-[24px] pt-[24px] p-[16px]"}>
        <div
          className={
            "flex border-[1px] border-grey-20  h-[40px] rounded-[12px] justify-between items-center bg-light-grey px-[16px] py-[10px]"
          }
        >
          <div className={"flex justify-between items-center"}>
            <div className={"flex gap-[8px] items-center text-text-grey"}>
              <CalendarIcon className={"w-[15px]"} />
              <p className={"text-[12px] font-semiBold text-text-grey"}>
                ALL EVENTS
              </p>
            </div>
          </div>
          <ChevronDown className={"text-text-grey w-[20px]"} />
        </div>
      </div>
      <div className={"p-[24px]"}>
        <div className={"flex gap-[24px] flex-wrap"}>
          {userDetail?.events?.map((item: any) => (
            <div
              key={item?.id}
              className={
                "p-[4px] rounded-[12px] flex flex-col border-[1px] w-fit gap-[4px]"
              }
            >
              <Image src={item?.image} alt={""} width={155.5} height={155.5} />
              <p className={"font-semiBold text-[14px]"}>{item?.name}</p>
              <div className={"flex items-center gap-[4px]"}>
                <CalendarIcon className={"w-[12px]"} />
                <p className={"text-[12px] font-normal text-text-grey"}>
                  {item?.date}
                </p>
                <Dot className={"text-text-grey"} />
                <p className={"text-[12px] font-normal text-text-grey"}>
                  {item?.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventView;
