'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import PromotionsCard from "@/components/events/PromotionsCard";
import {listPromotions} from "@/data/tableData";
import CreatePromotionModal from "@/modals/events/CreatePromotionModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {clearPromotion, getPromotionData} from "@/features/events/promotion.slice";

function AddPromotionPage() {
    const [promotionModal, setPromotionModal] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const [promotionId, setPromotionId] = useState(0);

    const { authToken } = useSelector((state: RootState) => state.auth)
    const { promotionData } = useSelector((state: RootState) => state.promotion) as {promotionData: any}

    const togglePromotionModal = () => {
        if (promotionId !== 0) {
            setPromotionId(0)
            dispatch(clearPromotion())
        }
        setPromotionModal(!promotionModal);
    }

    useEffect(() => {
        if (authToken) {
            dispatch(getPromotionData({token: authToken}))
        }
    }, [])

    const storePromotionId = (promotionId: number) => {
        setPromotionId(promotionId)
    }

    console.log({promotionId})


    return (
        <MainLayout>
            <section className="flex flex-col gap-[20px] mt-[24px]">
                <div className={"px-[20px] flex justify-between"}>
                    <p className={"text-[16px] font-semiBold"}>{promotionData?.promotions?.length || 0} Promotions</p>
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
                        promotionData?.promotions.map((promotion: any, index: number) => (
                            <PromotionsCard promotion={promotion} key={index} promotionId={promotion?.id} setPromotionId={setPromotionId} toggle={togglePromotionModal} />
                        ))
                    }
                </div>
            </section>
            <CreatePromotionModal isOpen={promotionModal} toggle={togglePromotionModal} promotionId={promotionId} />
        </MainLayout>
    );
}

export default AddPromotionPage;