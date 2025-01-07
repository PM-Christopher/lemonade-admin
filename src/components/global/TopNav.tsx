import React from 'react';

function TopNav({}) {
    // box-shadow: 0px 0px 1px 1.5px #EDEDED4D;
    return (
        <header className="flex justify-between items-center mb-6 bg-white px-[20px] py-[20px] border-b-[1px] border-b-grey-20">
            <h1 className="text-[16px] font-semiBold">Overview</h1>
            <div className="flex items-center space-x-4">
                <div className={"flex flex-col items-end"}>
                    <p className={"text-[16px] font-semiBold"}>Charles Ajimobi</p>
                    <p className={"text-[12px] font-normal text-text-grey"}>Admin</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    C
                </div>
            </div>
        </header>
    );
}

export default TopNav;