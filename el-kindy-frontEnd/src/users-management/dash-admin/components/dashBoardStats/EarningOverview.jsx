import { useState } from "react";
import Chart from "react-apexcharts";
import { Select, MenuItem } from "@mui/material";

import DashboardCard from "./DashboardCard";

function EarningOverview() {
  // select
  const [month, setMonth] = useState("1");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  // chart
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: ["#5D87FF", "#49BEFF"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        "16/08",
        "17/08",
        "18/08",
        "19/08",
        "20/08",
        "21/08",
        "22/08",
        "23/08",
      ],
      axisBorder: {
        show: false,
      },
    },
    // tooltip: {
    //   theme: theme.palette.mode === "dark" ? "dark" : "light",
    //   fillSeriesColor: false,
    // },
  };
  const seriescolumnchart = [
    {
      name: "Eanings this month",
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: "Expense this month",
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];
  return (
    <DashboardCard
      title="Earnings Overview"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
          sx={{
            borderRadius: "1rem",

            "& .MuiInputBase-input": {
              fontSize: `1.8rem`,
              lineHeight: "normal",
              textAlign: "center",
            },
          }}
        >
          <MenuItem value={1} sx={{ fontSize: "1.8rem" }}>
            March 2023
          </MenuItem>
          <MenuItem value={2} sx={{ fontSize: "1.8rem" }}>
            April 2023
          </MenuItem>
          <MenuItem value={3} sx={{ fontSize: "1.8rem" }}>
            May 2023
          </MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
}

export default EarningOverview;
