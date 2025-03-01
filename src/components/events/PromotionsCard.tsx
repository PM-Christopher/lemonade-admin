import React from 'react';
import {PencilIcon, TrashIcon} from "lucide-react";

function PromotionsCard() {
    return (
        <div className={'flex flex-col gap-[16px] p-[24px] bg-white rounded-[12px]'}>
            <div className={'flex justify-between'}>
                <p>Instagram Feed Post</p>
                <div className={'flex gap-[4px]'}>
                    <PencilIcon/>
                    <TrashIcon/>
                </div>
            </div>
            <p>N250,000</p>
            <div>
                <p>Content describing the event with a preferred caption</p>
            </div>
        </div>
    );
}

export default PromotionsCard;