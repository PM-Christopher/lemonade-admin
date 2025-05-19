import React from 'react';

interface PaginationCompProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    perPage: number;
}

const PaginationComp: React.FC<PaginationCompProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Create an array with page numbers (e.g., [1, 2, 3, ..., totalPages])
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="p-4 px-10 flex items-center justify-between bg-mid-grey rounded-br-lg rounded-bl-lg">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 p-2 rounded-lg disabled:opacity-50"
            >
                Previous
            </button>
            <div className="flex gap-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`p-2 w-8 h-8 text-sm font-medium rounded-lg ${
                            page === currentPage ? 'bg-light-white text-text-grey' : 'text-gray-500'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                disabled={Number(currentPage) === Number(totalPages)}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex gap-2 h-9 items-center text-gray-500 border-2 border-light-grey-50 rounded-lg p-2 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationComp;
