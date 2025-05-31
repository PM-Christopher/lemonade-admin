import React, { useState } from "react";
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {
  eventMainHeaders,
  eventsHeaders,
  walletData,
  walletHeaders,
} from "@/data/tableData";
import PaginationComp from "@/components/global/Pagination";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface TRX_DATA {
  history: Event[];
  total_revenue: number;
  tickets_sold: number;
  total_events: number;
}

interface Event {
  id: number;
  event_name: string;
  event_image: string;
  organizer: string;
  tickets_sold: number;
  status: "ACTIVE" | "INACTIVE" | "CANCELLED"; // Assuming possible statuses
  created_at: string; // ISO date string
}

interface EventIF {
  trx_data: any;
}

function EventViews({ trx_data }: EventIF) {
  const router = useRouter();
  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(trx_data?.history?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = trx_data?.history?.slice(
    startIndex,
    startIndex + perPage
  );

  console.log("trx_data", trx_data);
  return (
    <>
      <div
        className={
          "flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"
        }
      >
        <DataCard
          styles={"w-full"}
          title={"Total Ticket Revenue"}
          count={trx_data?.total_revenue || 0}
          isPrice={true}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Tickets Sold"}
          count={trx_data?.tickets_sold || 0}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Events"}
          count={trx_data?.total_events || 0}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-mid-grey">
              {eventsHeaders.map((header, idx) => (
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
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((row: Event, index: number) => (
                <tr
                  key={index}
                  className="border-b border-grey-20 h-[72px] cursor-pointer"
                  onClick={() =>
                    router.push(`/transactions/${row.id}/event-details`)
                  }
                >
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.id}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.event_name}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.organizer}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.tickets_sold}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.tickets_sold}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {dayjs(row.created_at).format("DD MMM, YYYY hh:mmA")}
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
        <PaginationComp
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          perPage={perPage}
        />
      </div>
    </>
  );
}

export default EventViews;
