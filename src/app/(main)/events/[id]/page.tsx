"use client";
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import {
  CalendarIcon,
  ChevronDown,
  ChevronRight,
  ClockIcon,
  MapPinIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { eventAction, getEventDetail } from "@/features/events/event.slice";
import { capitalizeWords } from "@/utils/helper";
import Image from "next/image";
import SuspendModal from "@/modals/events/SuspendModal";
import DeleteModal from "@/modals/events/DeleteModal";

const Page = ({}) => {
  const params = useParams();
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { loading, event } = useSelector((state: RootState) => state.event) as {
    loading: boolean;
    event: any;
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (authToken && id) {
      dispatch(getEventDetail({ token: authToken, id }));
    }
  }, []);

  const toggleSuspendModalOpen = () => {
    setSuspendModalOpen(!suspendModalOpen);
  };

  const toggleDeleteModalOpen = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const unsuspendEvent = () => {
    if (authToken && id) {
      dispatch(eventAction({ token: authToken, id, actionType: "activate" }));
    }
  };

  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        <div
          className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}
        >
          <div
            className={
              "flex justify-between items-center border-b-[1px] p-[24px]"
            }
          >
            <p className={"text-[16px] font-semiBold"}>Event summary</p>
            {event?.event?.status !== "ACTIVE" ? (
              <button
                className={
                  "h-[44px] border-[1px] bg-gradient-green rounded-[12px] w-[156px] text-center"
                }
                onClick={unsuspendEvent}
              >
                <p className={"text-[16px] font-medium text-white"}>
                  Reactivate event
                </p>
              </button>
            ) : (
              <div className="relative inline-block">
                <div
                  className={
                    "border-[1px] border-light-grey-50 p-[10px] px-[14px] flex items-center rounded-[12px] gap-[8px]"
                  }
                  onClick={handleToggleDropdown}
                >
                  <p className={"text-[14px] font-medium"}>Flag event</p>
                  <ChevronDown />
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full w-[207px] bg-white rounded-[12px] shadow z-50">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={toggleSuspendModalOpen}
                      >
                        <p className={"font-normal text-[16px]"}>
                          Suspend event
                        </p>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={toggleDeleteModalOpen}
                      >
                        <p className={"font-normal text-[16px] text-red-1"}>
                          Delete event
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={"flex flex-col p-[24px] gap-[20px]"}>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Event Owner:
                </p>
              </div>
              <div className={"flex gap-[4px]"}>
                <p className={"text-[14px] font-medium"}>
                  {event?.event?.owner?.fullname}
                </p>
                {/* <p className={"text-[14px] font-medium text-light-green"}>
                  View profile
                </p> */}
              </div>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Event ID:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>EV112332</p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Event Status:
                </p>
              </div>
              <p className={"text-[14px] font-medium text-light-green-70"}>
                {capitalizeWords(event?.event?.status)}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Date Created:
                </p>
              </div>
              <div className={"flex gap-[4px]"}>
                <p className={"text-[14px] font-medium"}>
                  {event?.event?.created_at}
                </p>
              </div>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Event Category:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {event?.event?.category}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Payment Settings:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>Monthly</p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Account Number:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {event?.event?.account?.account_number}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Account Holder:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {event?.event?.account?.name}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Bank Name:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {event?.event?.account?.bank}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Ticket Revenue:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>N300,000</p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Ticket Class:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {event?.tickets.length}
              </p>
            </div>
            {event?.tickets.map((ticket: any, index: any) => (
              <div
                className={
                  "flex flex-col p-[12px] rounded-[12px] gap-[8px] bg-light-grey"
                }
                key={index}
              >
                <p className={"font-semiBold text-[16px]"}>
                  {capitalizeWords(ticket?.ticket_type)}
                </p>
                <p className={"font-normal text-[12px] text-light-black"}>
                  {ticket?.description}
                </p>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Price:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {ticket?.price === 0 ? "-" : ticket?.price}
                  </p>
                </div>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Ticket Stock:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {capitalizeWords(ticket?.stock_type)}
                  </p>
                </div>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Purchase Limit:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {ticket?.purchase_limit}
                  </p>
                </div>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Tickets Sold:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {ticket?.tickets_sold}
                  </p>
                </div>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Sales Revenue:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {ticket?.sales_revenue === 0 ? "-" : ticket?.sales_revenue}
                  </p>
                </div>
                <div className={"flex gap-[24px] items-center-center"}>
                  <div className={"w-[115px]"}>
                    <p className={"text-text-grey text-[12px] font-medium"}>
                      Check-Ins:
                    </p>
                  </div>
                  <p className={"text-[14px] font-medium"}>
                    {ticket?.check_ins}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div
          className={
            "w-[780px] h-fit bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col p-[24px] gap-[16px]"
          }
        > */}

        <div
          className={
            "h-[762px] bg-white rounded-tr-[12px] rounded-tl-[12px] w-full lg:w-2/3 flex flex-col gap-[16px] p-[24px]"
          }
        >
          <Image
            src={event?.event?.event_image}
            alt={event?.event?.event_name}
            width={320}
            height={343}
            className={"w-[320px] h-[343px] rounded-[16px]"}
          />
          <p className={"font-semiBold text-[20px]"}>
            {event?.event?.event_name}
          </p>
          <div className={"flex flex-col gap-[8px]"}>
            <div className={"flex items-center gap-[8px]"}>
              <CalendarIcon className={"text-text-grey"} />
              <p className={"font-medium text-[14px] text-text-grey"}>
                {event?.event?.event_date}
              </p>
            </div>
            <div className={"flex items-center gap-[8px]"}>
              <ClockIcon className={"text-text-grey"} />
              <p className={"font-medium text-[14px] text-text-grey"}>
                {event?.event?.event_time}
              </p>
            </div>
            <div className={"flex items-center gap-[8px]"}>
              <MapPinIcon className={"text-text-grey"} />
              <p className={"font-medium text-[14px] text-text-grey"}>
                {event?.event?.location}
              </p>
            </div>
          </div>
          <p className={"font-semiBold text-[16px]"}>Contact Us</p>
          <p className={"font-semiBold text-[16px]"}>About Event</p>
          <p className={"font-normal text-[14px] text-text-grey"}>
            {event?.event?.description}
          </p>
          <p className={"font-semiBold text-[16px]"}>Promotions</p>
          <div className={"flex flex-wrap gap-[12px]"}>
            <div
              className={
                "p-[8px] rounded-[12px] border-[1px] border-light-green-tint bg-light-tint flex gap-[] w-fit items-center"
              }
            >
              <p className={"font-medium text-[14px]"}>IG Feed</p>
              <ChevronRight className={"text-grey-40 w-[20px]"} />
            </div>
            <div
              className={
                "p-[8px] rounded-[12px] border-[1px] border-light-green-tint bg-light-tint flex gap-[] w-fit items-center"
              }
            >
              <p className={"font-medium text-[14px]"}>IG Story</p>
              <ChevronRight className={"text-grey-40 w-[20px]"} />
            </div>
          </div>
        </div>
      </section>
      <SuspendModal
        isOpen={suspendModalOpen}
        toggle={toggleSuspendModalOpen}
        id={id}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        toggle={toggleDeleteModalOpen}
        id={id}
      />
    </MainLayout>
  );
};

export default Page;
