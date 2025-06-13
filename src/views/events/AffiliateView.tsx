import React, {useState} from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {affiliateMainData, affiliateMainHeaders, eventMainData, eventMainHeaders} from "@/data/tableData";
import {useRouter} from "next/navigation";
import PaginationComp from "@/components/global/Pagination";

const AffiliateView = ({pageData}: any) => {
    console.log({ pageData });

    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total pages based on the data length and perPage value
    const totalPages = Math.ceil(pageData?.affiliates?.length / perPage);

    // Determine the start and end indices for slicing the data array
    const startIndex = (currentPage - 1) * perPage;
    const paginatedData = pageData?.affiliates?.slice(startIndex, startIndex + perPage)
    return (
        <>
            <>
                <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                    <DataCard styles={"w-full"} title={"Ticket Affiliate Earning"} count={pageData?.total_affiliate_earning} isPrice={true}/>
                    <DataCard styles={"w-full"} title={"Total Affiliates"} count={pageData?.total_affiliates} />
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-mid-grey">
                            {affiliateMainHeaders.map((header, idx) => (
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
                                <tr key={index} className="border-b border-grey-20 h-[72px] cursor-pointer" onClick={() => router.push(`/events/${row.id}/affiliates`)}>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.unique_id}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.name}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.programs}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.date_joined}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={eventMainHeaders.length} className="p-4 text-center text-sm text-gray-500">
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
        </>
    );
}

export default AffiliateView;