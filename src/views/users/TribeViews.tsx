import React from 'react';
import TribeCard from "@/components/tribes/TribeCard";

const TribeViews = ({}) => {
    return (
        <div className={"flex flex-col  py-[20px]"}>
            <TribeCard />
            <TribeCard />
            <TribeCard />
        </div>
    );
}

export default TribeViews;