"use client";
import React from "react";
import { useRouter } from "next/navigation";

function DataCard({
  styles,
  title,
  count,
  isPrice = false,
  isEditable = false,
  isPercentage = false,
  isLink = false,
  pageLink = "",
  handleChange,
    toggle
}: {
  styles?: string;
  title: string;
  count: number;
  isPrice?: boolean;
  isPercentage?: boolean;
  isEditable?: boolean;
  isLink?: boolean;
  pageLink?: string;
  handleChange?: () => void;
  toggle?: () => void;
}) {
  const router = useRouter();
  return (
    <div
      className={`p-4 bg-white shadow-card-shadow flex justify-between rounded-[12px] ${styles}`}
    >
      <div className={"flex flex-col gap-[16px]"}>
        <p className="text-text-grey font-normal text-[14px]">{title}</p>
        <p className="text-[24px] font-semiBold">
          {isPrice && "₦"}
          {Number(count)?.toLocaleString()}
          {isPercentage && "%"}
        </p>
      </div>
      {isEditable && (
        <p
          className={"font-medium text-[14px] text-light-green cursor-pointer"}
          onClick={handleChange}
        >
          Edit
        </p>
      )}
      {isLink && pageLink && (
        <p
          className={"font-medium text-[14px] text-light-green cursor-pointer"}
          onClick={() => router.push(pageLink)}
        >
          View
        </p>
      )}
    </div>
  );
}

export default DataCard;
