import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import PaginationComp from "@/components/global/Pagination";
import { affiliateData, affiliateHeaders } from "@/data/tableData";
import useSearchParams from "@/hooks/useSearchParams";
import { capitalizeWords } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AffiliateView = ({ userData, menuOption }: any) => {
  console.log("afflilite", userData?.affiliates);
  const router = useRouter();
  const { searchParams } = useSearchParams();
  const query = searchParams?.get("q");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<any>(userData?.affiliates || []);

  useEffect(() => {
    if (userData) {
      setData(userData.users);
    }
  }, [userData]);

  useEffect(() => {
    if (menuOption !== "affiliates") return;
    if (!userData) return;

    if (!query || query?.trim() === "") {
      setData(userData.affiliates);
    } else {
      const q = query?.toLowerCase()?.trim();

      const filtered = userData.affiliates.filter((affiliate: any) => {
        const matchesQuery =
          !q ||
          affiliate?.unique_id?.toLowerCase().includes(q) ||
          affiliate?.fullname?.toLowerCase().includes(q);

        return matchesQuery;
      });

      setData(filtered);
    }

    setCurrentPage(1); // Reset to first page on search
  }, [query, userData, menuOption]);

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
      <div
        className={
          "flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"
        }
      >
        <DataCard
          styles={"w-full"}
          title={"Total Referral Earnings"}
          count={userData?.total_referral_earnings || 0}
          isPrice={true}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Number of Referrers"}
          count={userData?.total_referrers || 0}
        />
        <DataCard
          styles={"w-full"}
          title={"Total Number of Referrals"}
          count={userData?.total_referrals || 0}
        />
      </div>
      <div className={"flex justify-between gap-[24px] w-full"}>
        <div className="flex-1 bg-white">
          {/* <GlobalTable
            headers={affiliateHeaders}
            content={userData?.affiliates || []}
          /> */}

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-mid-grey">
                {affiliateHeaders.map((header, idx) => (
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
                    onClick={() => router.push(`/users/affiliate/${row.id}`)}
                  >
                    <td className={"p-4 font-medium text-sm font-sans"}>
                      {row.unique_id}
                    </td>
                    <td className={"p-4 font-medium text-sm font-sans"}>
                      {row.name}
                    </td>
                    <td className={"p-4 font-medium text-sm font-sans"}>
                      {row.total_referrals}
                    </td>
                    <td className={"p-4 font-medium text-sm font-sans"}>
                      {row.subscribed_referrals}
                    </td>
                    <td className={"p-4 font-medium text-sm font-sans"}>
                      ₦{Number(row.earnings).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={affiliateHeaders.length}
                    className="p-4 text-center text-sm text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <PaginationComp
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            perPage={perPage}
          />
        </div>
        <div className="flex flex-col border-[1px] border-yellow-accent-3 rounded-[12px] h-fit">
          <div className="w-[326px] h-[48px] bg-yellow-accent-1 rounded-tl-[12px] rounded-tr-[12px]">
            <div className="flex items-center px-[24px] py-[16px]">
              <p className="font-semibold text-[12px] text-light-black">
                Top Referrers
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-yellow-accent-2 rounded-bl-[12px] rounded-br-[12px]">
            {userData?.top_referrers?.map((item: any, index: number) => (
              <div key={index} className="flex">
                <div className="w-[221px] h-[72px] p-[24px] px-[16px] flex gap-[8px] items-center">
                  <div className="w-[24px] h-[24px] bg-gray-600 rounded-full"></div>
                  <p>{item?.name}</p>
                </div>
                <div className="w-[105px] p-[24px] px-[16px]">
                  <p>₦{Number(item?.total_earnings)?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateView;
