"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import {
  CalendarIcon,
  ChevronDown,
  SearchIcon,
  UploadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usersPageViews } from "@/utils/pageViews";
import UsersViews from "@/views/users/UsersView";
import AffiliateView from "@/views/users/AffiliateView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserData } from "@/features/user/user.slice";
import { getCSV } from "@/features/exports/export.slice";
import { downloadCSV } from "@/utils/helper";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import useDebounce from "@/hooks/useDebounce";
import useSearchParams from "@/hooks/useSearchParams";

function UsersPage({}) {
  const [menuOption, setMenuOption] = useState("users");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setLoading] = useState(false);

  const { authToken } = useSelector((state: RootState) => state.auth);
  const { userData } = useSelector((state: RootState) => state.user) as {
    userData: any;
  };

  const switchOption = (option: string) => {
    setMenuOption(option);
  };

  const renderViews = () => {
    switch (menuOption) {
      case "users":
        return <UsersViews userData={userData} />;
      case "affiliates":
        return <AffiliateView userData={userData} />;
    }
  };

  useEffect(() => {
    if (authToken && menuOption) {
      dispatch(getUserData({ token: authToken, trxType: menuOption }));
    }
  }, [menuOption]);

  const exportUser = () => {
    setLoading(true);
    dispatch(getCSV({ token: authToken || "", table: "users" }))
      .then((res) => {
        setLoading(false);
        if (res.meta.requestStatus) {
          downloadCSV(res.payload, "users.csv");

          dispatch(
            updateToastifyReducer({
              show: true,
              message: `Downloaded `,
              type: "success",
            })
          );
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

  const { debouncedValue } = useDebounce(searchValue, 500);
  const { setSearchParams } = useSearchParams();
  useEffect(() => {
    setSearchParams({ q: debouncedValue });
  }, [debouncedValue]);

  return (
    <MainLayout>
      <section className="flex flex-col gap-[20px] mt-[20px]">
        <div className={"px-[20px] flex justify-between"}>
          <p className={"text-[16px] font-semiBold"}>
            {userData?.users?.length || 0} users
          </p>
          <div className={"flex justify-between gap-[12px]"}>
            <div className="flex items-center gap-3 bg-light_grey p-2 px-[12px] h-[40px] w-[285px] rounded-[12px] border-[1px] border-grey-20">
              <div>
                <SearchIcon className={"w-[12px] h-[12px] text-grey-40"} />
              </div>
              <div className="w-full">
                <input
                  id="search"
                  type="text"
                  className="rounded-xl text-[14px] bg-light-grey focus:outline-none focus:ring-0 focus:border-transparent w-full py-4"
                  placeholder="Search user, email, ID, location..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div
              className={
                "flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"
              }
            >
              <div className={"flex justify-between items-center"}>
                <p className={"text-[12px] font-semiBold text-text-grey"}>
                  STATUS
                </p>
              </div>
              <ChevronDown className={"text-text-grey w-[20px]"} />
            </div>
            <div
              className={
                "flex border-[1px] border-grey-20 bg-none w-[193px] h-[40px] px-[16px] py-[10px] rounded-[12px] justify-between items-center"
              }
            >
              <div className={"flex gap-2 items-center"}>
                <CalendarIcon className={"text-text-grey w-[15px] h-[15px]"} />
                <p className={"text-[12px] font-semiBold text-text-grey"}>
                  ALL TIME
                </p>
              </div>
              <ChevronDown className={"text-text-grey w-[20px]"} />
            </div>
            <div>
              <Button
                onClick={exportUser}
                className={
                  "flex h-[40px] rounded-[12px] bg-gradient-green border-step-color"
                }
              >
                <UploadIcon className={"text-white w-[15px] h-[15px]"} />
                <p className={"text-white font-medium text-[16px]"}>
                  {isLoading ? "Exporting..." : "Export"}
                </p>
              </Button>
            </div>
          </div>
        </div>
        <div className={"px-[20px] flex flex-col "}>
          <div
            className={
              "border-[1px] border-grey-20 rounded-[12px] flex flex-col"
            }
          >
            <div className={"px-[12px] pt-[8px] w-fit"}>
              <div
                className={
                  "flex gap-6 bg-mid-grey p-[4px] items-center rounded-[12px]"
                }
              >
                {usersPageViews.map((item, index) => (
                  <div
                    className={`px-[8px] p-[4px] cursor-pointer ${
                      menuOption === item.key && "bg-white rounded-[10px]"
                    }`}
                    onClick={() => switchOption(item.key)}
                    key={index}
                  >
                    <p
                      className={`font-sans leading-[24px] ${
                        menuOption === item.key
                          ? "font-semibold text-[16px]"
                          : "font-semi-normal text-[16px] text-text-grey"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {renderViews()}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default UsersPage;
