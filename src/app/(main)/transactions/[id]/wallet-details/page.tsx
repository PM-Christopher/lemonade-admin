"use client";
import React, { useEffect, useState } from "react";
import { PrinterIcon } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getWalletDetail } from "@/features/transaction/transaction.slice";
import { capitalizeWords } from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";

function WalletDetailsPage({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const params = useParams();
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { loading, wallet } = useSelector(
    (state: RootState) => state.transaction
  ) as { wallet: any; loading: boolean };

  useEffect(() => {
    if (authToken && id) {
      dispatch(getWalletDetail({ token: authToken, id }));
    }
  }, []);

  console.log({ wallet });

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(wallet?.history?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = wallet?.history?.slice(
    startIndex,
    startIndex + perPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const printCSV = () => {
    if (!wallet?.history || wallet.history.length === 0) {
      alert("No data available to export");
      return;
    }

    // Define CSV headers
    const headers = [
      "ID",
      "User Id",
      "Full Name",
      "Amount",

      "Status",
      "Wallet Id",
      "Created At",
    ];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...wallet.history.map((item: any) => {
        return [
          item.id,
          item.user_id,
          `"${item?.user.fullname}"`,
          item.amount,
          item.status,
          item.wallet_id,
          `"${item.created_at}"`,
        ].join(",");
      }),
    ];

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set up download link
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `payment_history_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    // Append to document, trigger download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        <div
          className={
            "w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"
          }
        >
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Full name:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                {wallet?.info?.fullname}
              </p>
              {/* <p
                className={
                  "cursor-pointer font-medium text-[14px] text-light-green"
                }
              >
                View profile
              </p> */}
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Transaction Id:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>WA112332</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Date Paid:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>23 Apr, 2024 09:45 PM</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Amount:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>N{wallet?.info?.amount}</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Subscription Type:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>Yearly</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Status:
              </p>
            </div>
            <p className={"text-[14px] font-medium text-light-green-70"}>
              {capitalizeWords(wallet?.info?.status)}
            </p>
          </div>
        </div>

        {/* payout history */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div
            className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"}
          >
            <div
              className={
                "p-[24px] border-b-[1px] border-b-grey-20 flex justify-between items-center"
              }
            >
              <p className={"text-[16px] font-semiBold"}>Payout history</p>
              <div
                className={
                  "flex gap-[10px] items-center border-[1px] border-light-grey-50 px-[12px] py-[10px] rounded-[12px]"
                }
                onClick={printCSV}
              >
                <PrinterIcon className={"w-[20px]"} />
                <p className={"font-medium text-[16px] text-black-light"}>
                  Print
                </p>
              </div>
            </div>

            <div className={"flex flex-col px-[24px]"}>
              {paginatedData?.map((item: any, index: number) => (
                <div className="px-[16px] pt-[16px] pb-[24px]" key={index}>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p className={"font-medium text-[14px]"}>
                        {item?.wallet?.wallet_id} - ₦{item?.amount}
                      </p>
                      <p className={"text-text-grey font-normal text-[12px]"}>
                        23, Mar 2023. 05:00PM
                      </p>
                    </div>
                    <div
                      className={
                        "bg-light-green-60 px-[8px] py-[4px] gap-[4px] rounded-[8px] h-fit"
                      }
                    >
                      <p
                        className={
                          "text-light-green-70 font-medium text-[12px]"
                        }
                      >
                        {capitalizeWords(item?.status)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-2">
            <PaginationComp
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default WalletDetailsPage;
