"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import CreateTribeModal from "@/modals/tribes/CreateTribeModal";
import { tribeViews } from "@/utils/pageViews";
import CreatedTribeViews from "@/views/tribes/CreatedViews";
import TlnTribeViews from "@/views/tribes/TlnViews";
import { CalendarIcon, ChevronDown, PlusIcon, SearchIcon, UploadIcon } from "lucide-react";
import React, { useState } from "react";

const TribePage = () => {
  const [menuOption, setMenuOption] = useState("created");
  const [isCreateTribeModalOpen, setIsCreateTribeModalOpen] = useState(false);

  const switchOption = (option: string) => {
    setMenuOption(option);
  };

  const toggleCreateTribeModal = () => {
    setIsCreateTribeModalOpen(!isCreateTribeModalOpen);
  };

  const renderViews = () => {
    switch (menuOption) {
      case "created":
        return <CreatedTribeViews />;
      case "tln":
        return <TlnTribeViews />;
      default:
        <> </>;
    }
  };
  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>10,000 Tribes</p>
          <div className={"flex justify-between gap-[12px]"}>
            <div className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
              <div>
                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"} />
              </div>
              <div className="w-full">
                <input id="search" type="text" className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4" placeholder="Search Tribe, ID..." />
              </div>
            </div>

            <div className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
              <div className={"flex gap-2 items-center"}>
                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"} />
                <p className={"text-[12px] font-semiBold text-text-grey"}>ALL TIME</p>
              </div>
              <ChevronDown className={"text-text-grey w-[20px]"} />
            </div>
            <div>
              <Button className={"flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"} onClick={toggleCreateTribeModal}>
                <PlusIcon className={"text-white w-[15px] h-[15px]"} />
                <p className={"text-white font-medium text-[16px]"}>Create Tribe</p>
              </Button>
            </div>
          </div>
        </div>
        <div className={"px-[20px] flex flex-col gap-[8px]"}>
          <div className={"border-[1px] border-grey-20 rounded-[12px] flex flex-col"}>
            <div className={"px-[12px] pt-[8px] w-fit"}>
              <div className={"flex gap-6 bg-mid-grey p-[4px] items-center rounded-[12px]"}>
                {tribeViews.map((item, index) => (
                  <div className={`px-[8px] p-[4px] cursor-pointer ${menuOption === item.key && "bg-white rounded-[10px]"}`} onClick={() => switchOption(item.key)} key={index}>
                    <p className={`font-sans leading-[24px] ${menuOption === item.key ? "font-semibold text-[16px]" : "font-semi-normal text-[16px] text-text-grey"}`}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            {renderViews()}
          </div>
        </div>
      </section>
      <CreateTribeModal isOpen={isCreateTribeModalOpen} toggle={toggleCreateTribeModal} />
    </MainLayout>
  );
};

export default TribePage;
