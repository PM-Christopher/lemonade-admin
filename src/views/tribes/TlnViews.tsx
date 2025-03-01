import GlobalTable from "@/components/global/GlobalTable";
import { tribeTlnData, tribeTlnHeaders } from "@/data/tableData";
import React from "react";

const TlnTribeViews = () => {
  return (
    <div>
      <>
        <GlobalTable headers={tribeTlnHeaders} content={tribeTlnData} />
      </>
    </div>
  );
};

export default TlnTribeViews;
