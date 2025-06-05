import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useFormik } from "formik";
import {
  withdrawaladdition,
  withdrawaldeduction,
} from "@/features/wallet/wallet.slice";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import { formatNumberWithCommas } from "@/lib/formatNumber";

type UpdateBalanceInterface = {
  isOpen: boolean;
  toggle: () => void;
  updateType: string;
  userDetails?: any;
  reload?: any;
  balance?: any;
};

const UpdateBalance: React.FC<UpdateBalanceInterface> = ({
  isOpen,
  toggle,
  updateType,
  userDetails,
  reload,
  balance,
}) => {
  if (!isOpen) return null;

  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const { authToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const renderType = () => {
    switch (updateType) {
      case "add":
        return "Add to balance";
      case "deduct":
        return "Deduct from balance";
      default:
        return "Add to balance";
    }
  };
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      if (updateType === "add" || updateType === "") {
        dispatch(
          withdrawaladdition({
            token: authToken || "",
            id: id,
            amount: values.amount,
          })
        )
          .then((res) => {
            setLoading(false);

            if (res.payload.status) {
              setLoading(false);

              dispatch(
                updateToastifyReducer({
                  show: true,
                  message: `Success `,
                  type: "success",
                })
              );
              toggle();

              if (reload) {
                reload();
              }
            } else {
              setLoading(false);
              dispatch(
                updateToastifyReducer({
                  show: true,
                  message: res.payload.message || `Something went wrong`,
                  type: "error",
                })
              );
            }
          })
          .catch((res) => {
            setLoading(false);
            dispatch(
              updateToastifyReducer({
                show: true,
                message: res.payload.message || `Something went wrong`,
                type: "error",
              })
            );
          });
      } else {
        dispatch(
          withdrawaldeduction({
            token: authToken || "",
            id: id,
            amount: values.amount,
          })
        )
          .then((res) => {
            setLoading(false);

            if (res.payload.status) {
              setLoading(false);

              dispatch(
                updateToastifyReducer({
                  show: true,
                  message: `Success `,
                  type: "success",
                })
              );
              toggle();

              if (reload) {
                reload();
              }
            } else {
              setLoading(false);
              dispatch(
                updateToastifyReducer({
                  show: true,
                  message: res.payload.message || `Something went wrong`,
                  type: "error",
                })
              );
            }
          })
          .catch((res) => {
            setLoading(false);
            dispatch(
              updateToastifyReducer({
                show: true,
                message: res.payload.message || `Something went wrong`,
                type: "error",
              })
            );
          });
      }
    },
    enableReinitialize: true,
  });

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ width: "480px" }}
      >
        <div className="flex justify-between items-center">
          <p className={"text-[18px] font-semiBold"}>{renderType()}</p>
          <div className="cursor-pointer" onClick={toggle}>
            <XIcon />
          </div>
        </div>
        <div
          className={"flex flex-col"}
          style={{ marginTop: "20px", gap: "16px" }}
        >
          <div className={"flex flex-col"} style={{ gap: "4px" }}>
            <p className={"text-text-grey font-normal text-[14px]"}>Amount</p>
            <Input
              className={
                "bg-light-grey h-[48px] rounded-[12px] py-[12px] px-[12px] border-none"
              }
              placeholder={"Amount"}
              value={formik.values.amount}
              onChange={formik.handleChange("amount")}
              onBlur={formik.handleBlur}
              id="amount"
            />
          </div>

          <p className={"font-normal text-[14px]"}>
            Wallet balance:{" "}
            <span className={"font-bold text-[14px]"}>
              {" "}
              ₦{" "}
              {/* {formatNumberWithCommas(
                userDetails?.total_amount ||
                  userDetails?.history[0]?.wallet?.balance ||
                  0
              )} */}
              {formatNumberWithCommas(balance || 0)}
            </span>
          </p>

          <div className={"flex justify-between gap-[16px]"}>
            <button
              className={
                "border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"
              }
              onClick={toggle}
            >
              <p className={"text-black text-[16px] font-medium"}>Cancel</p>
            </button>
            <button
              className={
                "border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"
              }
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              <p className={"text-[16px] font-medium text-white"}>Confirm</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBalance;
