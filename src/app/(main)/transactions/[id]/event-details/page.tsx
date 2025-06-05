"use client";
import React, { useEffect, useState } from "react";
import { PrinterIcon } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getEventDetail } from "@/features/transaction/transaction.slice";
import { capitalizeWords } from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import dayjs from "dayjs";

function EventDetailsPage({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  const params = useParams();
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { loading, event } = useSelector(
    (state: RootState) => state.transaction
  ) as { event: any; loading: boolean };

  useEffect(() => {
    if (authToken && id) {
      dispatch(getEventDetail({ token: authToken, id }));
    }
  }, []);

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(event?.history?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = event?.history?.slice(startIndex, startIndex + perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log("event", event);

  const printCSV = () => {
    if (!event?.history || event?.history.length === 0) {
      alert("No data available to export");
      return;
    }

    // Define CSV headers
    const headers = ["Id", "Amount", "Created At", "Status"];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...event.history.map((item: any) => {
        return [
          item.unique_id,
          item.amount,
          `"${item.created_at}"`,
          item.status,
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
                Event name:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                {event?.info?.event_name}
              </p>
              {/*<p className={"cursor-pointer font-medium text-[14px] text-light-green"}>View business</p>*/}
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Event owner:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                {event?.info?.organizer}
              </p>
              <p
                className={
                  "cursor-pointer font-medium text-[14px] text-light-green"
                }
                onClick={() => router.push(`/users/${event?.info?.user_id}`)}
              >
                View profile
              </p>
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Transaction Id:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>
              {event?.info?.transaction_id}
            </p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Amount:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>N0</p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Tickets sold:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>
              {event?.info?.tickets_sold}
            </p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Date paid:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>
              {dayjs(event?.info?.created_at).format("DD MMM, YYYY hh:mmA")}
            </p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Status:
              </p>
            </div>
            <p className={"text-[14px] font-medium text-light-green-70"}>
              {capitalizeWords(event?.info?.status)}
            </p>
          </div>
        </div>

        {/* history  */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div
            className={"h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px]"}
          >
            <div
              className={
                "p-[24px] border-b-[1px] border-b-grey-20 flex justify-between items-center"
              }
            >
              <p className={"text-[16px] font-semiBold"}>Boosting history</p>
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
                        {item?.unique_id} - ₦{item?.amount}
                      </p>
                      <p className={"text-text-grey font-normal text-[12px]"}>
                        {item?.created_at}
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

export default EventDetailsPage;
