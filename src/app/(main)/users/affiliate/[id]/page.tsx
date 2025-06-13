"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { getAffiliateDetail } from "@/features/user/user.slice";
import { formatNumberWithCommas } from "@/lib/formatNumber";
import ReferralHistory from "@/modals/wallet-management/ReferralHistory";
import { AppDispatch, RootState } from "@/redux/store";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AffiliateUser = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const [refHistoryOpen, setRefHistoryOpen] = useState<boolean>(false);

  const [isData, setData] = useState<any>({});

  const toggleHistoryOpen = () => {
    setRefHistoryOpen(!refHistoryOpen);
  };

  const { authToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authToken && id) {
      dispatch(getAffiliateDetail({ token: authToken, id })).then((res) => {
        console.log("isaff", res.payload.data);

        setData(res.payload.data);
      });
    }
  }, []);
  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        <div
          className={
            "w-[600px] h-fit bg-white p-[24px] flex flex-col gap-[20px] rounded-[12px]"
          }
        >
          <div className={"flex justify-between"}>
            {/* <div
              className={"w-[64px] h-[64px] bg-light-black rounded-full"}
            ></div> */}

            {isData?.detail?.image ? (
              <Image
                src={isData?.detail?.image}
                alt="image"
                width={89}
                height={83}
                className={"w-[64px] h-[64px] bg-light-black rounded-full"}
              />
            ) : (
              // null
              <div
                className={"w-[64px] h-[64px] bg-light-black rounded-full"}
              ></div>
            )}
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Full name:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                {isData?.detail?.name}
              </p>
            </div>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                User ID:
              </p>
            </div>
            <p className={"text-[14px] font-medium"}>
              {" "}
              {isData?.detail?.unique_id}
            </p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Status:
              </p>
            </div>
            <p className={"text-[14px] font-medium text-light-green-70"}>
              {isData?.detail?.status}
            </p>
          </div>
          <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Referral Code:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                {" "}
                {isData?.detail?.referral_code}
              </p>
              {/* <p
                className={
                  "cursor-pointer font-medium text-[14px] text-light-green"
                }
              >
                copy icon
              </p> */}
            </div>
          </div>
          {/* <div className={"flex gap-[24px] items-center-center"}>
            <div className={"w-[115px]"}>
              <p className={"text-text-grey text-[12px] font-medium"}>
                Referral Link:
              </p>
            </div>
            <div className={"flex gap-[4px]"}>
              <p className={"text-[14px] font-medium"}>
                https://app.lemonade.com/ref=?adeba123
              </p>
            </div>
            <p
              className={
                "cursor-pointer font-medium text-[14px] text-light-green"
              }
            >
              copy icon
            </p>
          </div> */}
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          <div
            className={
              "h-[700px] bg-white rounded-tr-[12px] rounded-tl-[12px] flex flex-col"
            }
          >
            <div className="flex justify-between mt-[10px] border-b-[1px] border-b-grey-20 h-10 py-[8px] px-[16px]">
              <p className="font-semibold text-[16px]">Referral activity</p>
            </div>

            <div className="flex flex-col">
              <div className={"flex flex-col p-[24px] gap-[8px]"}>
                <div
                  className={
                    "border-mid-grey p-[16px] border-[1px] rounded-[12px] flex flex-col"
                  }
                >
                  <div
                    className={
                      "p-[16px] flex justify-between border-b-[1px] border-b-grey-20 cursor-pointer"
                    }
                  >
                    <div className={"flex flex-col gap-[8px]"}>
                      <p className={"text-[14px] font-normal text-text-grey"}>
                        Total Amount Earned
                      </p>
                      <p
                        className={"font-semiBold text-[18px] text-black-light"}
                      >
                        ₦{" "}
                        {formatNumberWithCommas(
                          isData?.total_amount_earned || 0
                        )}
                      </p>
                    </div>
                    <ChevronRight className={"text-text-grey"} />
                  </div>
                  <div
                    className={
                      "p-[16px] flex justify-between border-b-[1px] border-b-grey-20 cursor-pointer"
                    }
                  >
                    <div className={"flex flex-col gap-[8px]"}>
                      <p className={"text-[14px] font-normal text-text-grey"}>
                        Total Referrals
                      </p>
                      <p
                        className={"font-semiBold text-[18px] text-black-light"}
                      >
                        {formatNumberWithCommas(isData?.total_referrals || 0)}
                      </p>
                    </div>
                    <ChevronRight className={"text-text-grey"} />
                  </div>
                  <div
                    className={"p-[16px] flex justify-between cursor-pointer"}
                  >
                    <div className={"flex flex-col gap-[8px]"}>
                      <p className={"text-[14px] font-normal text-text-grey"}>
                        Total Subscribed Referrals
                      </p>
                      <p
                        className={"font-semiBold text-[18px] text-black-light"}
                      >
                        {" "}
                        {formatNumberWithCommas(
                          isData?.total_subscribed_referrals || 0
                        )}
                      </p>
                    </div>
                    <ChevronRight className={"text-text-grey"} />
                  </div>
                </div>
                <div
                  className="flex gap-[8px] items-center p-[12px] px-[16px] cursor-pointer"
                  onClick={toggleHistoryOpen}
                >
                  <p className="text-[16px] font-medium text-light-green">
                    View history
                  </p>
                  <ChevronRight className="text-light-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReferralHistory
        toggle={toggleHistoryOpen}
        isOpen={refHistoryOpen}
        data={[]}
      />
    </MainLayout>
  );
};

export default AffiliateUser;
