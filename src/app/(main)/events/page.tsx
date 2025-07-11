"use client";
import React, { useEffect, useState } from "react";
import AffiliateView from "@/views/events/AffiliateView";
import {
  CalendarIcon,
  ChevronDown,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { eventViews } from "@/utils/pageViews";
import EventView from "@/views/events/EventView";
import PromotionView from "@/views/tribes/PromotionView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getEventData } from "@/features/events/event.slice";
import { getCSV } from "@/features/exports/export.slice";
import { downloadCSV } from "@/utils/helper";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import { Button } from "@/components/ui/button";
import EditCommissionModal from "@/modals/events/EditCommissionModal";
import useDebounce from "@/hooks/useDebounce";
import useSearchParams from "@/hooks/useSearchParams";

const EventsPage = () => {
  const [menuOption, setMenuOption] = useState("events");
  const dispatch = useDispatch<AppDispatch>();
  const { searchParams } = useSearchParams();
  const query = searchParams?.get("search");
  const [searchValue, setSearchValue] = useState("");

  const { authToken } = useSelector((state: RootState) => state.auth);
  const { eventData } = useSelector((state: RootState) => state.event) as {
    eventData: any;
  };
  const [isLoading, setLoading] = useState(false);
  const switchOption = (option: string) => {
    setMenuOption(option);
  };

  const renderViews = () => {
    switch (menuOption) {
      case "events":
        return <EventView pageData={eventData} />;
      case "affiliates":
        return <AffiliateView pageData={eventData} />;
      case "promotions":
        return <PromotionView pageData={eventData} />;
      default:
        return <></>;
    }
  };

  const { debouncedValue } = useDebounce(searchValue, 500);
  const { setSearchParams } = useSearchParams();
  useEffect(() => {
    setSearchParams({ search: debouncedValue });
  }, [debouncedValue]);

  useEffect(() => {
    if (authToken && menuOption) {
      dispatch(getEventData({ token: authToken, trxType: menuOption }));
    }
  }, [menuOption]);

  const exportFunc = () => {
    setLoading(true);
    dispatch(getCSV({ token: authToken || "", table: "events" }))
      .then((res) => {
        if (res.meta.requestStatus) {
          setLoading(false);

          downloadCSV(res.payload, "events.csv");

          dispatch(
            updateToastifyReducer({
              show: true,
              message: `Downloaded `,
              type: "success",
            })
          );
        } else {
          setLoading(false);
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || `Something went wrong`,
              type: "error",
            })
          );
        }
      })
      .catch((res) => {
        setLoading(false);
        dispatch(
          updateToastifyReducer({
            show: true,
            message: res.payload.message || `Something went wrong`,
            type: "error",
          })
        );
      });
  };

  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[24px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {eventData?.events?.length || 6} Events
          </p>
          <div className={"flex justify-between gap-[12px]"}>
            <div className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
              <div>
                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"} />
              </div>
              <div className="w-full">
                <input
                  id="search"
                  type="text"
                  className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                  placeholder="Search event, ID..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div
              className={
                "flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"
              }
            >
              <div className={"flex justify-between items-center"}>
                <p className={"text-[12px] font-semiBold text-text-grey"}>
                  STATUS
                </p>
              </div>
              <ChevronDown className={"text-text-grey w-[20px]"} />
            </div>
            <div
              className={
                "flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"
              }
            >
              <div className={"flex gap-2 items-center"}>
                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"} />
                <p className={"text-[12px] font-semiBold text-text-grey"}>
                  ALL TIME
                </p>
              </div>
              <ChevronDown className={"text-text-grey w-[20px]"} />
            </div>

            {menuOption === "events" && (
              <>
                <div>
                  <Button
                    onClick={exportFunc}
                    className={
                      "flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"
                    }
                  >
                    <UploadIcon className={"text-white w-[15px] h-[15px]"} />
                    <p className={"text-white font-medium text-[16px]"}>
                      {isLoading ? "Exporting..." : "Export"}
                    </p>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={"px-[20px] flex flex-col "}>
          <div
            className={
              "border-[1px] border-grey-20 rounded-[12px] flex flex-col"
            }
          >
            <div className={"px-[12px] pt-[8px] w-fit"}>
              <div
                className={
                  "flex gap-6 bg-mid-grey p-[4px] items-center rounded-[12px]"
                }
              >
                {eventViews.map((item, index) => (
                  <div
                    className={`px-[8px] p-[4px] cursor-pointer ${
                      menuOption === item.key && "bg-white rounded-[10px]"
                    }`}
                    onClick={() => switchOption(item.key)}
                    key={index}
                  >
                    <p
                      className={`font-sans leading-[24px] ${
                        menuOption === item.key
                          ? "font-semibold text-[16px]"
                          : "font-semi-normal text-[16px] text-text-grey"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {renderViews()}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
export default EventsPage;
