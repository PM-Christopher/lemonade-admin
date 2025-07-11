"use client";
import React, {useEffect, useState} from "react";
import MainLayout from "@/components/layouts/MainLayout";
import {PlusIcon, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {teamHeaders} from "@/data/tableData";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {capitalizeWords} from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import {getTeamData} from "@/features/team/team.slice";
import AddMember from "@/modals/team/AddMemberModal";
import useDebounce from "@/hooks/useDebounce";
import useSearchParams from "@/hooks/useSearchParams";

function TeamMembersPage({}) {
  const router = useRouter();
  // State for current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { searchParams } = useSearchParams();
  const query = searchParams?.get("search");

  const [searchValue, setSearchValue] = useState("");

  const [isOpen, setOpen] = useState(false);

  const toggelModal = () => {
    setOpen(!isOpen);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch<AppDispatch>();

  const { authToken } = useSelector((state: RootState) => state.auth);
  const { teamData } = useSelector((state: RootState) => state.team) as {
    teamData: any;
  };

  const [data, setData] = useState<any>(teamData?.admins || []);
  useEffect(() => {
    if (authToken) {
      dispatch(getTeamData({ token: authToken }));
    }
  }, []);

  const { debouncedValue } = useDebounce(searchValue, 500);
  const { setSearchParams } = useSearchParams();
  useEffect(() => {
    setSearchParams({ search: debouncedValue });
  }, [debouncedValue]);

  useEffect(() => {
    if (query?.trim() === "") {
      setData(teamData?.admins);
    } else {
      const q = query?.toLowerCase()?.trim();
      const filtered = teamData?.admins.filter((user: any) => {
        console.log({user})
        return !q ||
            user?.name?.toLowerCase().includes(q) ||
            user?.email?.toLowerCase().includes(q);
      });

      setData(filtered);
    }

    setCurrentPage(1); // Reset to first page on search
  }, [query]);

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(data?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = data?.slice(
      startIndex,
      startIndex + perPage
  );


  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[24px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {teamData?.admins?.length || 0} Team Members
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
                  placeholder="Search member, ID..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                className={
                  "flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"
                }
                onClick={toggelModal}
              >
                <PlusIcon className={"text-white w-[15px] h-[15px]"} />
                <p className={"text-white font-medium text-[16px]"}>
                  Add Member
                </p>
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
            <div className="bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-mid-grey">
                    {teamHeaders.map((header, idx) => (
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
                        onClick={() => router.push(`/team/${row.id}`)}
                      >
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.unique_id}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.name}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.email}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {capitalizeWords(row.role)}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {row.created_at}
                        </td>
                        <td className={"p-4 font-medium text-sm font-sans"}>
                          {capitalizeWords(row.status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={teamHeaders.length}
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

      <AddMember isOpen={isOpen} toggle={toggelModal} />
    </MainLayout>
  );
}

export default TeamMembersPage;
