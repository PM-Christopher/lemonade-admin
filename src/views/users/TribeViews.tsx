import React from "react";
import TribeCard from "@/components/tribes/TribeCard";

const TribeViews = ({ userDetail }: any) => {
  console.log("tribes", userDetail?.tribes);
  return (
    <div className={"flex flex-col  py-[20px]"}>
      {userDetail?.tribes?.map((item: any) => (
        <TribeCard
          date={item?.created_at}
          image={item?.image}
          title={item?.name}
          key={item?.id}
          category={item?.category}
          members={item?.members}
          threads={item?.threads}
        />
      ))}
      {/* <TribeCard  />
            <TribeCard />
            <TribeCard /> */}
    </div>
  );
};

export default TribeViews;
