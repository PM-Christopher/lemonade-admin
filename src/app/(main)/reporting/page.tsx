"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { CalendarIcon, ChevronDown, SearchIcon } from "lucide-react";
import { reportHeaders } from "@/data/tableData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getReportData } from "@/features/reporting/reporting.slice";
import { capitalizeWords } from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

function ReportingPage({}) {
  const router = useRouter();
  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch<AppDispatch>();

  const { authToken } = useSelector((state: RootState) => state.auth);
  const { reportData } = useSelector((state: RootState) => state.report) as {
    reportData: any;
  };

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(reportData?.reports?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = reportData?.reports?.slice(
    startIndex,
    startIndex + perPage
  );

  useEffect(() => {
    if (authToken) {
      dispatch(getReportData({ token: authToken }));
    }
  }, []);
  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[24px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {paginatedData?.length} Reports
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
          </div>
        </div>
        <div className={"px-[20px] flex flex-col "}>
          <div
            className={
              "border-[1px] border-grey-20 rounded-[12px] flex flex-col"
            }
          >
            {/*<GlobalTable headers={reportHeaders} content={reportData}/>*/}
            <div className="bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-mid-grey">
                    {reportHeaders.map((header, idx) => (
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
                    paginatedData.map((row: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b border-grey-20 h-[72px] cursor-pointer"
                        onClick={() => router.push(`/reporting/${row.id}`)}
                      >
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.id}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.reported_by.name}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {capitalizeWords(row.category)}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.case}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {dayjs(row.date_submitted).format(
                            "DD MMM, YYYY hh:mmA"
                          )}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {capitalizeWords(row.status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={reportHeaders.length}
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
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ReportingPage;
