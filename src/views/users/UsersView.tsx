import React, {useState} from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {usersData, usersHeaders} from "@/data/tableData";
import {capitalizeWords, GetStatusClass} from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import {useRouter} from "next/navigation";

function UsersViews({userData}: any) {
    const router = useRouter()
    // State for current page and items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total pages based on the data length and perPage value
    const totalPages = Math.ceil(userData?.users?.length / perPage);

    // Determine the start and end indices for slicing the data array
    const startIndex = (currentPage - 1) * perPage;
    const paginatedData = userData?.users?.slice(startIndex, startIndex + perPage)

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
                    {
                        paginatedData && paginatedData.length > 0 ? paginatedData.map((row:any, index: any) => (
                            <tr key={index} className="border-b border-grey-20 h-[72px] cursor-pointer" onClick={() => router.push(`/users/${row.id}`)}>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.lemon_id}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.fullname}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.email}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {capitalizeWords(row.account_plan)}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.location}
                                </td>
                                <td className={`p-4 font-medium text-sm font-sans`}>
                                    {row.date_joined}
                                </td>
                                <td className={`p-4 font-medium text-sm font-sans ${
                                    GetStatusClass(row.status)
                                }`}>
                                    {capitalizeWords(row.status)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={usersHeaders.length} className="p-4 text-center text-sm text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )
                    }
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