import React, { useEffect, useState } from "react";
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import { usersData, usersHeaders } from "@/data/tableData";
import { capitalizeWords, GetStatusClass } from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import { useRouter } from "next/navigation";
import useSearchParams from "@/hooks/useSearchParams";

function UsersViews({ userData }: any) {
  const router = useRouter();
  const { searchParams } = useSearchParams();
  const query = searchParams?.get("q");
  const status = searchParams?.get("status");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<any>(userData?.users || []);

  // Update data when userData changes
  useEffect(() => {
    if (userData) {
      setData(userData.users);
    }
  }, [userData]);
  // Search + reset pagination
  useEffect(() => {
    if (!userData) return;

    if ((!query && !status) || query?.trim() === "") {
      setData(userData.users);
    } else {
      const q = query?.toLowerCase()?.trim();
      const s = status?.toLowerCase()?.trim();

      const filtered = userData.users.filter((user: any) => {
        const matchesQuery =
          !q ||
          user?.location?.toLowerCase().includes(q) ||
          user?.fullname?.toLowerCase().includes(q) ||
          user?.email?.toLowerCase().includes(q);

        const matchesStatus = !s || user?.status?.toLowerCase() === s;

        return matchesQuery && matchesStatus;
      });

      setData(filtered);
    }

    setCurrentPage(1); // Reset to first page on search
  }, [query, status, userData]);

  // Calculate pagination from filtered data
  const totalPages = Math.ceil(data?.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = data?.slice(startIndex, startIndex + perPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-mid-grey">
              {usersHeaders.map((header, idx) => (
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
                  onClick={() => router.push(`/users/${row.id}`)}
                >
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.lemon_id}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.fullname}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.email}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {capitalizeWords(row.account_plan)}
                  </td>
                  <td className={"p-4 font-medium text-sm font-sans"}>
                    {row.location}
                  </td>
                  <td className={`p-4 font-medium text-sm font-sans`}>
                    {row.date_joined}
                  </td>
                  <td
                    className={`p-4 font-medium text-sm font-sans ${GetStatusClass(
                      row.status
                    )}`}
                  >
                    {capitalizeWords(row.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={usersHeaders.length}
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

export default UsersViews;
