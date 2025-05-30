"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import {
  CalendarIcon,
  ChevronDown,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { transactionPageViews } from "@/utils/pageViews";
import PlansViews from "@/views/transactions/PlansViews";
import WalletViews from "@/views/transactions/walletViews";
import BoostingViews from "@/views/transactions/boostingViews";
import ServiceViews from "@/views/transactions/serviceViews";
import EventViews from "@/views/transactions/eventViews";
import PromotionViews from "@/views/transactions/promotionViews";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getPlanSubscriptions,
  getTransactionData,
} from "@/features/transaction/transaction.slice";
import { manualTransactionsExport } from "@/utils/helper";

function TransactionsPage({}) {
  const [menuOption, setMenuOption] = useState("plan-subscriptions");
  const dispatch = useDispatch<AppDispatch>();

  const { authToken } = useSelector((state: RootState) => state.auth);
  type TrxDataType = {
    history?: any[];
    subscribers?: number;
    // add other properties as needed
  };

  const { trxData } = useSelector((state: RootState) => state.transaction) as {
    trxData: TrxDataType;
  };

  const switchOption = (option: string) => {
    setMenuOption(option);
  };

  useEffect(() => {
    if (menuOption && authToken) {
      dispatch(getTransactionData({ token: authToken, trxType: menuOption }));
    }
  }, [menuOption]);

  const renderViews = () => {
    switch (menuOption) {
      case "plan-subscriptions":
        return <PlansViews trx_data={trxData} />;
      case "wallet-withdrawals":
        return <WalletViews trx_data={trxData} />;
      case "boosting":
        return <BoostingViews />;
      case "services":
        return <ServiceViews />;
      case "events":
        return <EventViews trx_data={trxData} />;
      case "promotions":
        return <PromotionViews />;
    }
  };

  const exportCSV = () => {
    console.log("menuOption", menuOption);
    switch (menuOption) {
      case "plan-subscriptions":
        manualTransactionsExport(trxData?.history || [], "plan-subscriptions");
        break;
      case "wallet-withdrawals":
        manualTransactionsExport(trxData?.history || [], "wallet-withdrawals");
        break;
      case "boosting":
        break;
      case "services":
        break;
      case "events":
        manualTransactionsExport(trxData?.history || [], "events");
        break;
      case "promotions":
        break;
    }
  };

  console.log("trxData", trxData);

  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[20px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {trxData?.subscribers || trxData?.history?.length || 0} Transactions
          </p>
          <div className={"flex justify-between gap-[12px]"}>
            {/* <div
                            className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
                            <div>
                                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"}/>
                            </div>
                            <div className="w-full">
                                <input
                                    id="search"
                                    type="text"
                                    className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                                    placeholder="Search transactions, ID..."
                                />
                            </div>
                        </div> */}
            {/* <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex justify-between items-center'}>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>
                                    STATUS
                                </p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div> */}
            {/* <div
                            className={"flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"}>
                            <div className={'flex gap-2 items-center'}>
                                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"}/>
                                <p className={"text-[12px] font-semiBold text-text-grey"}>ALL TIME</p>
                            </div>
                            <ChevronDown className={"text-text-grey w-[20px]"}/>
                        </div> */}
            <div>
              <Button
                onClick={exportCSV}
                className={
                  "flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"
                }
              >
                <UploadIcon className={"text-white w-[15px] h-[15px]"} />
                <p className={"text-white font-medium text-[16px]"}>Export</p>
              </Button>
            </div>
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
                {transactionPageViews.map((item, index) => (
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
}

export default TransactionsPage;
