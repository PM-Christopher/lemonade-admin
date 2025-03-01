import React from 'react';
import {FileIcon} from "lucide-react";

function DataInfoCard(
    {styles, title, isEditable=false, handleChange}:
    {styles?: string, title: string, isEditable?: boolean, handleChange?: () => void}
) {
    return (
        <div
            className={`p-4 bg-white shadow-card-shadow flex justify-between rounded-[12px] ${styles}`}
        >
            <div className={"flex flex-col gap-[16px]"}>
                <div className={'p-[8px] bg-mid-grey w-fit rounded-[13px]'}>
                    <FileIcon className={'w-[14px] h-[17px]'} />
                </div>
                <p className="font-medium text-[16px]">{title}</p>
                {
                    isEditable && (
                        <p className="text-[14px] font-medium text-light-green">
                            Edit
                        </p>
                    )
                }
            </div>
        </div>
    );
}

export default DataInfoCard;