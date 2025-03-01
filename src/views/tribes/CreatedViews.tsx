import GlobalTable from "@/components/global/GlobalTable";
import { tribeData, tribeHeaders } from "@/data/tableData";
import React from "react";

const CreatedTribeViews = () => {
  return (
    <div>
      <>
        <GlobalTable headers={tribeHeaders} content={tribeData} />
      </>
    </div>
  );
};

export default CreatedTribeViews;
