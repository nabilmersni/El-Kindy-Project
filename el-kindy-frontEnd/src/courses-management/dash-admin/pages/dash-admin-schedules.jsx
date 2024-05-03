import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import { useEffect, useState } from "react";
import DashAdminSchedulesHeader from "../ui/dash-admin-schedules__header";
import DashAdminCalendar from "../ui/dash-admin-calendar";

const DashAdminSchedules = () => {
  return (
    <DashLayout>
      {/* <DashAdminSchedulesHeader /> */}
      <DashAdminCalendar />
    </DashLayout>
  );
};

export default DashAdminSchedules;
