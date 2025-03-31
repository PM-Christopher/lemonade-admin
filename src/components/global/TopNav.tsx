import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {capitalizeWords, getFirstLetterCapitalized} from "@/utils/helper";
import {UserInterface} from "@/interfaces/SystemInterface";

function TopNav({}) {
    const user: UserInterface | null = useSelector((state: RootState) => state.auth.user);
    return (
        <header className="flex justify-between items-center bg-white px-[20px] py-[20px] border-b-[1px] border-b-grey-20">
            <h1 className="text-[16px] font-semiBold">Overview</h1>
            <div className="flex items-center space-x-4">
                <div className={"flex flex-col items-end"}>
                    <p className={"text-[16px] font-semiBold"}>
                        {user?.name}
                    </p>
                    <p className={"text-[12px] font-normal text-text-grey"}>
                        {capitalizeWords(user?.role)}
                    </p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    {getFirstLetterCapitalized(user?.name)}
                </div>
            </div>
        </header>
    );
}

export default TopNav;
