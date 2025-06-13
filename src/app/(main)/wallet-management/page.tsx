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
import {
  walletHeaders,
} from "@/data/tableData";
import WalletThresholdModal from "@/modals/wallet-management/WalletThresholdModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getWalletData,
  getWithdrawalRequest,
} from "@/features/wallet/wallet.slice";
import { AppDispatch, RootState } from "@/redux/store";
import dayjs from "dayjs";

function WalletMgtPage({}) {
  const [editThreshold, setEditThreshold] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(5); // Number of items per page
  
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { withdrawalRequests } = useSelector(
    (state: RootState) => state.wallet as any
  );

  const { walletData } = useSelector((state: RootState) => state.wallet as any);



  useEffect(() => {
    if (authToken) {
      dispatch(getWalletData({ token: authToken }));
      dispatch(getWithdrawalRequest({ token: authToken }));
    }
  }, []);




  const refetchFunc =()=>{

     if (authToken) {
      dispatch(getWalletData({ token: authToken }));
      dispatch(getWithdrawalRequest({ token: authToken }));
    }
  }


  // Handle searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter data based on search term
  const filteredData = withdrawalRequests?.history?.filter((row: any) => 
    row?.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleEditThreshold = () => {
    setEditThreshold(!editThreshold);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const maxPageButtons = 5;
    let pageNumbers = [];

    if (totalPages <= maxPageButtons) {
      // Show all pages if total pages are less than max buttons
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calculate which page numbers to show
      if (currentPage <= 3) {
        // If we're near the beginning
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // If we're near the end
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // If we're in the middle
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };


  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[20px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {withdrawalRequests?.history?.length || 0} Wallets
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
                  value={searchTerm}
                  onChange={handleSearch}
                  className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                  placeholder="Search guest name, email address"
                />
              </div>
            </div>
            {/* <div
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
            </div> */}
            {/* <div
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
            </div> */}
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
                count={walletData?.wallet_revenue?.toLocaleString() || 0}
                isPrice={true}
              />
              <DataCard
                title={"Total Wallets"}
                count={walletData?.total_wallets?.toLocaleString() || 0}
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
                  {currentItems.length > 0 ? (
                    currentItems.map((row: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b border-grey-20 h-[72px] cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/wallet-management/${row.id}`)
                        }
                      >
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row?.txn_id ?? "N/A"}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.fullname}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          ₦{row.amount}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {dayjs(row.created_at).format("YYYY-MM-DD hh:mm:ss A")}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {dayjs(row.date_paid).format("YYYY-MM-DD hh:mm:ss A")}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans capitalize"}>
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
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${
                        page === currentPage
                          ? "bg-light-white text-text-grey"
                          : "text-gray-500"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => handlePageChange(currentPage + 1)}
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
      refetchFunc={refetchFunc}
        isOpen={editThreshold}
        toggle={toggleEditThreshold}
      />
    </MainLayout>
  );
}

export default WalletMgtPage;