import React, {useState} from 'react';
import DataCard from "@/components/global/DataCard";
import GlobalTable from "@/components/global/GlobalTable";
import {eventMainData, eventMainHeaders, planHeaders, walletHeaders} from "@/data/tableData";
import {capitalizeWords} from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";
import {useRouter} from "next/navigation";
import EditCommissionModal from "@/modals/events/EditCommissionModal";

const EventView = ({pageData}: any) => {
    const router = useRouter()
    // State for current page and items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [editCommissionModal, setEditCommissionModal] = useState(false);
    const toggleEditModal = () => {
        setEditCommissionModal(!editCommissionModal);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total pages based on the data length and perPage value
    const totalPages = Math.ceil(pageData?.events?.length / perPage);

    // Determine the start and end indices for slicing the data array
    const startIndex = (currentPage - 1) * perPage;
    const paginatedData = pageData?.events?.slice(startIndex, startIndex + perPage)

    return (
        <>
            <>
                <div className={"flex justify-between gap-[24px] pt-[8px] px-[12px] pb-[16px]"}>
                    <DataCard styles={"w-full"} title={"Ticket Commission"} count={pageData?.tickets_commission} isPrice={true}/>
                    <DataCard styles={"w-full"} title={"Commission Percentage"} isPercentage={true} count={pageData?.commission_charge * 100} isEditable={true} handleChange={toggleEditModal}/>
                    <DataCard styles={"w-full"} title={"Total Events"} count={pageData?.total_events} />
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-mid-grey">
                            {eventMainHeaders.map((header, idx) => (
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
                                <tr key={index} className="border-b border-grey-20 h-[72px] cursor-pointer" onClick={() => router.push(`/events/${row.id}`)}>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.unique_id}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.event_name}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.event_type}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.category}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.date_created_at}
                                    </td>
                                    <td className={'p-4 font-medium text-sm font-sans'}>
                                        {row?.status}
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
                <EditCommissionModal isOpen={editCommissionModal} toggle={toggleEditModal} commissionCharge={pageData?.commission_charge} />
            </>
        </>
    );
}

export default EventView;