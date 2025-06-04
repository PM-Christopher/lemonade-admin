import React from 'react';
import TribeCard from "@/components/tribes/TribeCard";

const TribeViews = ({userDetail}: any) => {
    return (
        <div className={"flex flex-col  py-[20px]"}>
            {
                userDetail?.tribes?.length > 0 ? (
                    userDetail?.tribes.map((tribe: any, index: number) => (
                        <TribeCard tribeDetails={tribe} key={index} />
                    ))
                ) : (
                    <></>
                )
            }
        </div>
    );
}

export default TribeViews;