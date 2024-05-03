import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import { useEffect, useState } from "react";
import DashTeacherSchedulesHeader from "../ui/dash-teacher-schedules__header";
import DashTeacherSchedulesCalendar from "../ui/dash-teacher-schedules";

const DashTeacherSchedules = () => {
  return (
    <DashLayout>
      <DashTeacherSchedulesHeader />
      <DashTeacherSchedulesCalendar />
    </DashLayout>
  );
};

export default DashTeacherSchedules;
