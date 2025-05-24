import React from 'react';

// Define the type for table props
interface TableProps {
    headers: string[];
    content: Array<Record<string, any>>;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
}

const GlobalTable: React.FC<TableProps> = ({
                                         headers,
                                         content,
                                         onPageChange = () => {
                                         },
                                         currentPage = 1,
                                         totalPages = 1,
                                     }) => {
    const getStatusClass = (status: string) => {
        let color;
        switch (status) {
            case "Pending":
            case "pending":
            case "Draft":
                color = "text-warning-bold"; // Text color for Pending
                break;
            case "Rejected":
            case "Suspended":
            case "Removed":
                color = "text-red-1"; // Text color for Rejected
                break;
            case "Scheduled":
                color = "text-blue-accent-2"; // Text color for Rejected
                break;
            case "Successful":
            case "Success":
            case "Completed":
            case "Resolved":
            case "Sent":
            case "Active":
                color = "text-light-green-70"; // Text color for Successful
                break;
            default:
                color = "black"; // Default text color
        }
        return color;
    };
    return (
        <div className="bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-mid-grey">
                    {headers.map((header, idx) => (
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
                    content?.length > 0 ? content.map((row, index) => (
                        <tr key={index} className="border-b border-grey-20 h-[72px]">
                            {Object.keys(row).map((key, cellIdx) => (
                                <td
                                    className={`p-4 font-medium text-sm font-sans ${
                                        key === 'status' || 'STATUS' ? getStatusClass(row[key]) : ''
                                    }`}
                                    key={cellIdx}
                                >
                                    {key === 'avatar' ? (
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={row[key] || 'https://via.placeholder.com/40'}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            {row.fullName}
                                        </div>
                                    ) : (
                                        row[key]
                                    )}
                                </td>
                            ))
                            }
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={headers.length} className="p-4 text-center text-sm text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
                <button
                    disabled={currentPage === 1}
                    // onClick={() => onPageChange(currentPage - 1)}
                    className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="flex gap-2">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            // onClick={() => onPageChange(page)}
                            className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${
                                page === currentPage ? 'bg-light-white text-text-grey' : 'text-gray-500'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    disabled={currentPage === totalPages}
                    // onClick={() => onPageChange(currentPage + 1)}
                    className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GlobalTable;