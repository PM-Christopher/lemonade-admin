import React, { useState } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import { updateWithdrawalThreshold } from "@/features/wallet/wallet.slice";

type WalletMgtInterface = {
  isOpen: boolean;
  toggle: () => void;
  refetchFunc: ()=> void
};

const WalletThresholdModal: React.FC<WalletMgtInterface> = ({
  isOpen,
  toggle,
  refetchFunc
}) => {
  if (!isOpen) return null;
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const prodSchema = yup.object({
    threshold: yup.string().required("threshold is required"),
  });

  const formik = useFormik({
    initialValues: {
      threshold: "",
    },
    validationSchema: prodSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        updateWithdrawalThreshold({
          token: authToken || "",
          threshold: values.threshold,
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

            toggle()
            refetchFunc()
            
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
    },
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
          <p className={"text-[18px] font-semiBold"}>Withdrawal Threshold</p>
          <div className="cursor-pointer" onClick={toggle}>
            <XIcon />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div className={"flex flex-col gap-[16px]"}>
            <div style={{ maxWidth: "328px" }}>
              <p className={"text-text-grey text-[14px] font-normal"}>
                Set the minimum amount that can be withdrawn from wallet
                balance.
              </p>
            </div>
            <p className={"font-normal text-text-grey text-[14px]"}>Amount</p>
            <Input
              className={
                "bg-light-grey h-[48px] rounded-[12px] py-[12px] px-[12px] border-none"
              }
              placeholder={"Amount"}
              value={formik.values.threshold}
              onChange={formik.handleChange("threshold")}
              onBlur={formik.handleBlur}
            />
            <div className={"flex justify-between gap-[16px]"}>
              <button
                onClick={toggle}
                className={
                  "h-[48px] border-[1px] border-light-grey-50 px-[48px] py-[14px] rounded-[12px] bg-white w-full"
                }
              >
                <p className={"text-black text-[16px] font-medium"}>Cancel</p>
              </button>
              <button
                onClick={() => formik.handleSubmit()}
                className={
                  "h-[48px] border-[1px] border-step-color px-[48px] py-[14px] rounded-[12px] bg-gradient-green w-full"
                }
              >
                <p className={"text-[16px] font-medium text-white"}>
                  {isLoading ? "Loading..." : "Submit"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WalletThresholdModal;
