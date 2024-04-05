import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import { useEffect, useState } from "react";
import DashTeacherAvailabilitiesHeader from "../ui/dash-teacher-availabilities__header";
import DashTeacherCalendar from "../ui/dash-teacher-calendar";

const DashTeacherAvailabilities = () => {
  return (
    <DashLayout>
      <DashTeacherAvailabilitiesHeader />
      <DashTeacherCalendar />
    </DashLayout>
  );
};

export default DashTeacherAvailabilities;
