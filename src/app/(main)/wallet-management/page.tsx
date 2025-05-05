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
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {
  walletHeaders,
  walletMgtData,
  walletMgtHeaders,
} from "@/data/tableData";
import WalletThresholdModal from "@/modals/wallet-management/WalletThresholdModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getWalletData,
  getWithdrawalRequest,
} from "@/features/wallet/wallet.slice";
import { AppDispatch, RootState } from "@/redux/store";

function WalletMgtPage({}) {
  const [editThreshold, setEditThreshold] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { withdrawalRequests } = useSelector(
    (state: RootState) => state.wallet as any
  );

  const { walletData } = useSelector((state: RootState) => state.wallet as any);

  console.log("wall", walletData);

  useEffect(() => {
    if (authToken) {
      dispatch(getWalletData({ token: authToken }));
      dispatch(getWithdrawalRequest({ token: authToken }));
    }
  }, []);

  const toggleEditThreshold = () => {
    setEditThreshold(!editThreshold);
  };
  const currentPage = 1;
  const totalPages = 10;

  console.log("withdrawalRequests", withdrawalRequests);
  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[20px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>10,000 Wallets</p>
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
                  placeholder="Search guest name, email address"
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
            <div>
              <Button
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
            <div
              className={
                "grid grid-cols-3 gap-[24px] pt-[8px] px-[12px] pb-[16px]"
              }
            >
              <DataCard
                title={"Wallet Revenue"}
                count={walletData?.wallet_revenue || 0}
                isPrice={true}
              />
              <DataCard
                title={"Total Wallets"}
                count={walletData?.total_wallets || 0}
              />
              <DataCard
                title={"Withdrawal Threshold"}
                count={walletData?.withdrawal_threshold || 0}
                isPrice={true}
                isEditable={true}
                handleChange={toggleEditThreshold}
              />
            </div>
            <div className="bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-mid-grey">
                    {walletHeaders.map((header, idx) => (
                      <th
                        className="p-4 text-left text-[12px] text-text-grey font-semiBold"
                        key={idx}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>



                    {/*  {withdrawalRequests &&
                  walletData?.wallets?.length > 0 ? (
                    walletData.wallets.map((row: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b border-grey-20 h-[72px] cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/wallet-management/${row.wallet_id}`)
                        }
                      >
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.txn_id}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.fullname}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.amount}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.created_at}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={walletHeaders.length}
                        className="p-4 text-center text-sm text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )} */}
                  {withdrawalRequests &&
                  withdrawalRequests?.history?.length > 0 ? (
                    withdrawalRequests.history.map((row: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b border-grey-20 h-[72px] cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/wallet-management/${row.id}`)
                        }
                      >
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.txn_id}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.fullname}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.amount}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.created_at}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={walletHeaders.length}
                        className="p-4 text-center text-sm text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
                <button
                  disabled={currentPage === 1}
                  // onClick={() => onPageChange(currentPage - 1)}
                  className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        // onClick={() => onPageChange(page)}
                        className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${
                          page === currentPage
                            ? "bg-light-white text-text-grey"
                            : "text-gray-500"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  disabled={Number(currentPage) === Number(totalPages)}
                  // onClick={() => onPageChange(currentPage + 1)}
                  className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WalletThresholdModal
        isOpen={editThreshold}
        toggle={toggleEditThreshold}
      />
    </MainLayout>
  );
}

export default WalletMgtPage;
