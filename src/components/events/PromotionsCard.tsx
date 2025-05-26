import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { formatThousandSeparator } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deletePromotion } from "@/features/events/promotion.slice";

function PromotionsCard({ promotion }: { promotion: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);

  const handleDeletePromotion = (id: number) => {
    if (authToken && id) {
      dispatch(deletePromotion({ token: authToken, id }));
    }
  };

  return (
    <div
      className={"flex flex-col gap-[16px] p-[24px] bg-white rounded-[12px]"}
    >
      <div className={"flex justify-between"}>
        <p className={"font-semiBold text-[16px]"}>{promotion?.name}</p>
        <div className={"flex gap-[4px]"}>
          <PencilIcon className={"cursor-pointer"} />
          <TrashIcon
            className={"text-red-1 cursor-pointer"}
            onClick={() => handleDeletePromotion(promotion?.id)}
          />
        </div>
      </div>
      <p className={"text-[20px] font-semiBold"}>
        N{formatThousandSeparator(promotion?.price)}
      </p>
      <div className={"flex flex-col gap-[8px]"}>
        {promotion?.breakdown?.map((item: any, index: number) => (
          <p key={index} className={"text-[14px] font-normal text-light-black"}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PromotionsCard;
