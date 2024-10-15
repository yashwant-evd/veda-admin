import React from "react";
import Students from "./Student/Students";

function TestReports({batchinfo}) {
  return (
    <div>
      <Students batchinfo={batchinfo} />
    </div>
  );
}

export default TestReports;
