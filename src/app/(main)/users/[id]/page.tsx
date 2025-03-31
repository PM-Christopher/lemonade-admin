"use client";
import React, {useEffect, useState} from "react";
import { ChevronDown, MessageCircle, MessageCircleMore, PrinterIcon } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { usersDetailPageViews } from "@/utils/pageViews";
import ActivitiesViews from "@/views/users/ActivitiesViews";
import TribeViews from "@/views/users/TribeViews";
import TribeModal from "@/components/users/TribeModal";
import BusinessView from "@/views/users/BusinessView";
import EventView from "@/views/users/EventView";
import WalletView from "@/views/users/WalletView";
import BalanceModal from "@/modals/users/BalanceModal";
import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getEventDetail} from "@/features/transaction/transaction.slice";
import {getAccountInfo, getUserDetail} from "@/features/user/user.slice";

function UserDetailsPage({}) {
  const currentPage:number = 1
  const totalPages: number = 10
  const params = useParams()
  const id = params.id ? (Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id)) : undefined;
  const dispatch  = useDispatch<AppDispatch>()
  const { authToken } = useSelector((state: RootState) => state.auth)
  const { loading, user, userDetail } = useSelector((state: RootState) => state.user) as { user: any, loading: boolean, userDetail: any }

  useEffect(() => {
    if (authToken && id) {
      dispatch(getUserDetail({token: authToken, id}))
    }
  }, [])

  const [menuOption, setMenuOption] = useState("activities-log");
  const [tribeOpen, setTribeOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);

  const switchOption = (option: string) => {
    setMenuOption(option);
  };

  const toggleBalanceModalOpen = () => {
    setBalanceModalOpen(!balanceModalOpen);
  };

  const renderViews = () => {
    switch (menuOption) {
      case "activities-log":
        return <ActivitiesViews userDetail={userDetail} />;
      case "tribes":
        return <TribeViews userDetail={userDetail} />;
      case "business":
        return <BusinessView userDetail={userDetail} />;
      case "events":
        return <EventView userDetail={userDetail} />;
      case "wallet":
        return <WalletView userDetail={userDetail} />;
    }
  };

  const toggleTribeModal = () => {
    setTribeOpen(!tribeOpen);
  };

  useEffect(() => {
    if (authToken && id && menuOption) {
      dispatch(getAccountInfo({token: authToken, id, infoType: menuOption}))
    }
  }, [menuOption]);

  console.log({userDetail})
  /**
   *
   * */

  return (
    <MainLayout>
      <TribeModal toggle={toggleTribeModal} isOpen={tribeOpen} />
      <section className={"p-[20px] flex justify-between"}>
        <div className={"w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"}>
          <div className={"flex justify-between"}>
            <div className={"w-[64px] h-[64px] bg-light-black rounded-full"}></div>
            <div className={"flex gap-[4px]"}>
              <div className={"border-[1px] border-light-grey-50 rounded-[12px] h-[44px] px-[14px] py-[12px] gap-[8px] flex items-center"}>
                <MessageCircleMore className="w-[15px]" />
                <p className={"font-medium text-[14px]"}>Chat</p>
              </div>
              <div className={"flex border-[1px] border-light-grey-50 bg-none w-[149px] h-[44px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                <div className={"flex justify-between items-center"}>
                  <p className={"text-[14px] font-medium text-black-light"}>Actions</p>
                </div>
                <ChevronDown className={"text-text-grey w-[20px]"} />
              </div>
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Full name:</p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>{user?.fullname}</p>
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>User ID:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.lemon_id}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Account Plan:</p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>{user?.account_plan}</p>
              <p className={"cursor-pointer font-medium text-[14px] text-light-green"}>View history</p>
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
            </div>
            <p className={"text-[14px] font-medium text-light-green-70"}>{user?.status}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Email Address:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.email}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Username:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.username}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Lemonade Tag:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.lemon_id}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Date Joined:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.date_joined}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Location:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.location}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Social Links:</p>
            </div>
            <p className={"text-[14px] font-medium"}>Links here</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Referrals:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.referrals}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Tribes Joined:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.tribes_joined}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Tribes created:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.tribes_created}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Threads Created:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.threads_created}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Business:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.business}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>Event Created:</p>
            </div>
            <p className={"text-[14px] font-medium"}>{user?.events_created}</p>
          </div>
        </div>
        <div className={"flex flex-col"}>
          <div className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"} style={{ width: "908px" }}>
            <div className="flex justify-between mt-[10px] border-b-[1px] border-b-light-grey-50">
              {usersDetailPageViews.map((view, idx) => (
                <div onClick={() => switchOption(view.key)} className={`h-10 w-[276.5px] py-[8px] px-[16px] cursor-pointer ${menuOption === view.key && "border-b-step-color border-b-2"}`} key={idx}>
                  <p className="text-center font-sans font-medium text-[14px] leading-[21px] tracking-custom">{view.title}</p>
                </div>
              ))}
            </div>
            {renderViews()}
          </div>
          <div className={"h-[62px] bg-mid-grey rounded-br-[12px] rounded-bl-[12px]"} style={{ width: "908px" }}>
            <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
              <button
                disabled={currentPage === 1}
                // onClick={() => onPageChange(currentPage - 1)}
                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    // onClick={() => onPageChange(page)}
                    className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${page === currentPage ? "bg-light-white text-text-grey" : "text-gray-500"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                // onClick={() => onPageChange(currentPage + 1)}
                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
      <BalanceModal isOpen={balanceModalOpen} toggle={toggleBalanceModalOpen} />
    </MainLayout>
  );
}

export default UserDetailsPage;
