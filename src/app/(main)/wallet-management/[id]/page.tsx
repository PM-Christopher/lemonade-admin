"use client";
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { ChevronDown, ChevronRight } from "lucide-react";
import WithdrawalApproval from "@/modals/wallet-management/WithdrawalApproval";
import WithdrawalReject from "@/modals/wallet-management/WithdrawalReject";
import UpdateBalance from "@/modals/wallet-management/UpdateBalance";
import PayoutHistory from "@/modals/wallet-management/PayoutHistory";
import ReferralHistory from "@/modals/wallet-management/ReferralHistory";
import AffiliateHistory from "@/modals/wallet-management/AffiliateHistory";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getWalletDetail } from "@/features/wallet/wallet.slice";
import SkeletonLoader from "@/components/global/SkeletonLoader";
import { capitalizeWords } from "@/utils/helper";
import { formatNumberWithCommas } from "@/lib/formatNumber";

function WalletDetailsPage({}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isRejectOpen, setIsRejectOpen] = React.useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false);
  const [updateType, setUpdateType] = React.useState<string>("add");

  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { walletDetail, loading: walletLoading } = useSelector(
    (state: RootState) => state.wallet
  ) as {
    walletDetail: { status?: string; info: any; history?: any } | null;
    loading: boolean;
  };

  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;

  useEffect(() => {
    if (id && authToken) {
      dispatch(getWalletDetail({ token: authToken, id }));
    }
  }, [id]);

  const reloadFunc = () => {
    if (id && authToken) {
      dispatch(getWalletDetail({ token: authToken, id }));
    }
  };

  // side menu state
  const [isPayoutOpen, setIsPayoutOpen] = React.useState(false);
  const [isReferralOpen, setIsReferralOpen] = React.useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = React.useState(false);

  const toggleWithdrawalAction = () => {
    setIsOpen(!isOpen);
  };
  const toggleWithdrawalReject = () => {
    setIsRejectOpen(!isRejectOpen);
  };
  const toggleUpdateBalance = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };
  const updateBalanceType = (type: string) => {
    setUpdateType(type);
  };

  // side menu toggles
  const togglePayoutHistory = () => {
    setIsPayoutOpen(!isPayoutOpen);
  };

  const toggleReferralHistory = () => {
    setIsReferralOpen(!isReferralOpen);
  };

  const toggleAffiliateHistory = () => {
    setIsAffiliateOpen(!isAffiliateOpen);
  };

  const formatValue = (value: any): string => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${capitalizeWords(key)}: ${val}`)
        .join(", ");
    }
    return capitalizeWords(String(value || "N/A"));
  };

  console.log({ walletDetail });

  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        <div
          className={
            "w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"
          }
        >
          <div
            className={"w-[64px] h-[64px] rounded-full bg-light-black"}
          ></div>

          {walletDetail?.info ? (
            Object.entries(walletDetail?.info)
              .filter(([key]) => key !== "amount") // Exclude 'amount'
              .map(([key, value]) => (
                <div key={key} className="flex gap-[24px] items-center">
                  <div className="w-[115px]">
                    <p className="text-text-grey text-[12px] font-medium">
                      {capitalizeWords(key.replace(/_/g, " "))}:
                    </p>
                  </div>
                  {walletLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <p className="text-[14px] font-medium">
                      {formatValue(value)}
                    </p>
                  )}
                </div>
              ))
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex gap-[50px] items-center">
                  <div className="w-[115px]">
                    {/* Skeleton for the label */}
                    <SkeletonLoader />
                  </div>
                  {/* Skeleton for the value */}
                  <SkeletonLoader />
                </div>
              ))}
            </>
          )}
          
          {/* && walletDetail.status === "pending"  */}
          {walletDetail && walletDetail?.info?.status?.toLowerCase() !== "approved" && (
            <div className={"flex justify-between gap-[16px]"}>
              <button
                className={
                  "border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"
                }
                onClick={toggleWithdrawalReject}
              >
                <p className={"text-black text-[16px] font-medium"}>
                  Reject withdrawal
                </p>
              </button>
              <button
                className={
                  "border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"
                }
                onClick={toggleWithdrawalAction}
              >
                <p className={"text-[16px] font-medium text-white"}>
                  Approve Withdrawal
                </p>
              </button>
            </div>
          )}
        </div>

        {/* details */}
        <div
          className={
            "h-[762px] bg-white rounded-[12px] w-full lg:w-2/3 flex flex-col"
          }
        >
          <div className={"p-[24px] border-b-[1px] border-b-grey-20"}>
            <p className={"text-[16px] font-semiBold"}>Wallet summary</p>
          </div>
          <div className={"pt-[24px] px-[24px] pb-[12px]"}>
            <div
              className={
                "flex border-[1px] border-light-grey-50 bg-none w-fit h-[44px] px-[14px] py-[12px] rounded-[12px] gap-[8px] items-center cursor-pointer"
              }
              onClick={toggleUpdateBalance}
            >
              <div className={"flex justify-between items-center"}>
                <p className={"text-[14px] font-medium"}>Update Balance</p>
              </div>
              <ChevronDown className={"w-[20px]"} />
            </div>
          </div>
          <div className={"px-[24px] pb-[24px]"}>
            <div
              className={
                "p-[16px] border-[2px] border-mid-grey flex flex-col rounded-[12px]"
              }
            >
              <div
                className={
                  "p-[16px] border-b-[1px] border-b-grey-20 flex justify-between cursor-pointer"
                }
              >
                <div className={"flex flex-col gap-[8px]"}>
                  <p className={"font-normal text-text-grey text-[14px]"}>
                    Total amount earned
                  </p>
                  <p className={"text-[18px] font-semiBold"}>
                    ₦{" "}
                    {formatNumberWithCommas(
                      walletDetail?.history[0]?.wallet?.balance || 0
                    )}
                  </p>
                </div>
                <ChevronRight className={"cursor-pointer"} />
              </div>
              <div
                className={
                  "p-[16px] border-b-[1px] border-b-grey-20 flex justify-between cursor-pointer"
                }
              >
                <div className={"flex flex-col gap-[8px]"}>
                  <p className={"font-normal text-text-grey text-[14px]"}>
                    Referral earning
                  </p>
                  <p className={"text-[18px] font-semiBold"}>
                    {" "}
                    ₦ {formatNumberWithCommas(0)}
                  </p>
                </div>
                <ChevronRight className={"cursor-pointer"} />
              </div>
              <div className={"p-[16px] flex justify-between cursor-pointer"}>
                <div className={"flex flex-col gap-[8px]"}>
                  <p className={"font-normal text-text-grey text-[14px]"}>
                    Affiliate earning
                  </p>
                  <p className={"text-[18px] font-semiBold"}>
                    {" "}
                    ₦ {formatNumberWithCommas(0)}
                  </p>
                </div>
                <ChevronRight className={"cursor-pointer"} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <WithdrawalApproval isOpen={isOpen} toggle={toggleWithdrawalAction}  reload={reloadFunc}/>
      <WithdrawalReject isOpen={isRejectOpen} toggle={toggleWithdrawalReject} reload={reloadFunc}/>
      <UpdateBalance
        isOpen={isUpdateOpen}
        toggle={toggleUpdateBalance}
        updateType={updateType}
        userDetails={walletDetail}
        reload={reloadFunc}
      />

      <PayoutHistory
        isOpen={isPayoutOpen}
        toggle={togglePayoutHistory}
        data={[]}
      />
      <ReferralHistory
        isOpen={isReferralOpen}
        toggle={toggleReferralHistory}
        data={[]}
      />
      <AffiliateHistory
        isOpen={isAffiliateOpen}
        toggle={toggleAffiliateHistory}
        data={[]}
      />
    </MainLayout>
  );
}

export default WalletDetailsPage;
