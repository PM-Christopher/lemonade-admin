import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { withdrawalRequestDecison } from "@/features/wallet/wallet.slice";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import { useParams } from "next/navigation";

type WithdrawalRejectInterface = {
  isOpen: boolean;
  toggle: () => void;
};

const WithdrawalReject: React.FC<WithdrawalRejectInterface> = ({
  isOpen,
  toggle,
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
  const isReject = () => {
    dispatch(
      withdrawalRequestDecison({
        token: authToken || "",
        id: id,
        type: "reject",
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
  };

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
          <p className={"text-[18px] font-semiBold"}>Reject withdrawal</p>
          <div className="cursor-pointer" onClick={toggle}>
            <XIcon />
          </div>
        </div>
        <div
          className={"flex flex-col"}
          style={{ marginTop: "20px", gap: "16px" }}
        >
          <p className={"text-[14px] font-normal"}>
            Are you sure you want to reject this wallet balance withdrawal?
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
                "border-[1px] px-[48px] py-[11px] rounded-[12px] w-full"
              }
              style={{ background: "#DB0000" }}
              onClick={isReject}
            >
              <p className={"text-[16px] font-medium text-white"}>Reject</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalReject;
