import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
// import { IconArrowUpLeft } from "@tabler/icons";

import DashboardCard from "./DashboardCard";
import userService from "../../../../features/users/UserService";

const UsersCount = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = "#E6FFFA";
  const [usersCount, setUsersCount] = useState({});

  useEffect(() => {
    const getUsersStats = async () => {
      const data = await userService.getUsersStats();
      console.log(data);
      setUsersCount(data);
    };

    getUsersStats();
  }, []);

  // chart
  const optionscolumnchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ["#5D87FF", "#49BEFF", "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      // theme: theme.palette.mode === "dark" ? "dark" : "light",
      // fillSeriesColor: false,
      // formatter: function (val, opts) {
      //   const seriesIndex = opts.seriesIndex;
      //   let label = "";
      //   if (seriesIndex === 0) {
      //     label = "Admin: ";
      //   } else if (seriesIndex === 1) {
      //     label = "Students: ";
      //   } else if (seriesIndex === 2) {
      //     label = "Teacher: ";
      //   }
      //   return label + val;
      // },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const val = series[seriesIndex];
        let label = "";
        if (seriesIndex === 0) {
          label = "Admin: ";
        } else if (seriesIndex === 1) {
          label = "Student: ";
        } else if (seriesIndex === 2) {
          label = "Teacher: ";
        }
        return `<div class="tooltip-custom px-4">${label}${val}</div>`;
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [
    usersCount?.roleCounts?.admin || 0,
    usersCount?.roleCounts?.user || 0,
    usersCount?.roleCounts?.teacher || 0,
  ];

  return (
    <DashboardCard title="Total Users">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {usersCount.totalUserCount}
          </Typography>

          <Stack spacing={3} mt={5} direction="row" sx={{ mt: "14rem" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="h5" color="textSecondary">
                Admins
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: "#49BEFF",
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="h5" color="textSecondary">
                Students
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primarylight,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="h5" color="textSecondary">
                Teachers
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default UsersCount;
