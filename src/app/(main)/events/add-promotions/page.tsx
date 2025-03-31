'use client'
import React, {useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import PromotionsCard from "@/components/events/PromotionsCard";
import {listPromotions} from "@/data/tableData";
import CreatePromotionModal from "@/modals/events/CreatePromotionModal";

function AddPromotionPage() {
    const [promotionModal, setPromotionModal] = useState(false)

    const togglePromotionModal = () => {
        setPromotionModal(!promotionModal);
    }

    return (
        <MainLayout>
            <section className="flex flex-col gap-[20px] mt-[24px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>10 Promotions</p>
                    <div className={"flex justify-between gap-[12px]"}>
                        <div>
                            <Button className={"flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"}>
                                <PlusIcon className={"text-white w-[15px] h-[15px]"}/>
                                <p className={"text-white font-medium text-[16px]"} onClick={togglePromotionModal}>Add promotion</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-3 px-[20px] gap-[24px]'}>
                    {
                        listPromotions.map((promotion, index) => (
                            <PromotionsCard key={index} />
                        ))
                    }
                </div>
            </section>
            <CreatePromotionModal isOpen={promotionModal} toggle={togglePromotionModal} />
        </MainLayout>
    );
}

export default AddPromotionPage;