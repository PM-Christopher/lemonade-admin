import React, { useRef, useEffect, MouseEvent } from "react";
import { CalendarIcon, ChevronDown, ChevronRight } from "lucide-react";
import { formatNumberWithCommas } from "@/lib/formatNumber";
import UpdateBalance from "@/modals/wallet-management/UpdateBalance";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "@/features/user/user.slice";

const WalletView = ({ userDetail }: any) => {
  const params = useParams();

  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false);

  const [updateType, setUpdateType] = React.useState<string>("add");

  const reloadFunc = () => {
    if (id && authToken) {
      dispatch(getAccountInfo({ token: authToken, id, infoType: "wallet" }));
    }
  };
  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, []);

  const toggleUpdateBalance = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="px-[24px] pt-[24px]" ref={containerRef}>
        <div className="relative inline-block">
          <button
            onClick={handleToggleDropdown}
            className="flex gap-[8px] border-[1px] border-light-grey-50 w-fit h-[44px] rounded-[12px] justify-between items-center bg-transparent px-[14px] py-[12px]"
          >
            <p className="text-[12px] font-semiBold text-black-light">
              Update balance
            </p>
            <ChevronDown className="text-black-light w-[20px]" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-[207px] bg-white rounded-[12px] shadow z-50">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setUpdateType("add");
                    toggleUpdateBalance();
                  }}
                >
                  <p className={"font-normal text-[16px]"}>Add to balance</p>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setUpdateType("deduct");
                    toggleUpdateBalance();
                  }}
                >
                  <p className={"font-normal text-[16px]"}>
                    Deduct from balance
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={"flex flex-col p-[24px]"}>
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
              <p className={"font-semiBold text-[18px] text-black-light"}>
                ₦ {formatNumberWithCommas(userDetail?.total_amount || 0)}{" "}
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
                Referral Earning
              </p>
              <p className={"font-semiBold text-[18px] text-black-light"}>
                ₦{formatNumberWithCommas(userDetail?.referral_earning || 0)}
              </p>
            </div>
            <ChevronRight className={"text-text-grey"} />
          </div>
          <div className={"p-[16px] flex justify-between cursor-pointer"}>
            <div className={"flex flex-col gap-[8px]"}>
              <p className={"text-[14px] font-normal text-text-grey"}>
                Affiliate Earning
              </p>
              <p className={"font-semiBold text-[18px] text-black-light"}>
                ₦{formatNumberWithCommas(userDetail.affiliate_earning || 0)}
              </p>
            </div>
            <ChevronRight className={"text-text-grey"} />
          </div>
        </div>
      </div>

      <UpdateBalance
        isOpen={isUpdateOpen}
        toggle={toggleUpdateBalance}
        updateType={updateType}
        userDetails={userDetail}
        reload={reloadFunc}
        balance={userDetail?.total_amount}
      />
    </div>
  );
};

export default WalletView;
