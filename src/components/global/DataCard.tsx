import React from 'react';

function DataCard(
    {styles, title, count, isPrice=false, isEditable=false, isPercentage=false, handleChange}:
    {styles?: string, title: string, count: number, isPrice?: boolean, isPercentage?: boolean, isEditable?: boolean, handleChange?: () => void}
) {
    return (
        <div
            className={`p-4 bg-white shadow-card-shadow flex justify-between rounded-[12px] ${styles}`}
        >
            <div className={"flex flex-col gap-[16px]"}>
                <p className="text-text-grey font-normal text-[14px]">{title}</p>
                <p className="text-[24px] font-semiBold">
                    {isPrice && "₦"}{count}{isPercentage && "%"}
                </p>
            </div>
            {
                isEditable && (
                    <p className={"font-medium text-[14px] text-light-green cursor-pointer"}>Edit</p>
                )
            }
        </div>
    );
}

export default DataCard;