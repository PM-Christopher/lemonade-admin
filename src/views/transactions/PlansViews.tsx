import React, {useState} from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {planData, planHeaders, walletHeaders} from "@/data/tableData";
import {capitalizeWords} from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import {useRouter} from "next/navigation";

interface PlanIF {
    trx_data: any
}

function PlansViews({trx_data}: PlanIF) {
    const router = useRouter()
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
    const paginatedData = trx_data?.history?.slice(startIndex, startIndex + perPage)


    return (
        <>
            <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                <DataCard styles={"w-full"} title={"Subscription Revenue"} count={trx_data?.revenue} isPrice={true}/>
                <DataCard styles={"w-full"} title={"Total Subscribers"} count={trx_data?.subscribers}/>
                <DataCard styles={"w-full"} title={"Churn Rate"} count={trx_data?.churn_rate} isPercentage={true}/>
            </div>
            <div className="bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-mid-grey">
                        {planHeaders.map((header, idx) => (
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
                            <tr key={index} className="border-b border-grey-20 h-[72px] cursor-pointer" onClick={() => router.push(`/transactions/${row.id}/subscription-details`)}>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.txn_id}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.fullname}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.plan}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.amount}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {row.created_at}
                                </td>
                                <td className={'p-4 font-medium text-sm font-sans'}>
                                    {capitalizeWords(row.status)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={walletHeaders.length} className="p-4 text-center text-sm text-gray-500">
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

export default PlansViews;