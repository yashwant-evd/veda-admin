import React from "react";
import Trainers from "./Student/Trainers";

function TrainerReports({batchinfo}) {
  return (
    <div>
      <Trainers batchinfo={batchinfo} />
    </div>
  );
}

export default TrainerReports;
