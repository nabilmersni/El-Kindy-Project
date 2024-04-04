import { useState } from "react";
import { Grid, Box } from "@mui/material";

import DashLayout from "../dashboard-layout/dash-layout";
import "../../public/assets/css/style.css";
import MonthlyEarnings from "../users-management/dash-admin/components/dashBoardStats/MonthlyEarnings";
import UsersCount from "../users-management/dash-admin/components/dashBoardStats/UsersCount";
import EarningOverview from "../users-management/dash-admin/components/dashBoardStats/EarningOverview";

const AdminDashboard = () => {
  return (
    <DashLayout>
      <div className="overflow-y-auto">
        <Box sx={{ height: "81vh", px: "1rem", pt: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <EarningOverview />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <UsersCount />
                </Grid>
                <Grid item xs={12}>
                  <MonthlyEarnings />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <RecentTransactions /> */}
            </Grid>
            <Grid item xs={12} lg={8}>
              {/* <ProductPerformance /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Blog /> */}
            </Grid>
          </Grid>
        </Box>
      </div>
    </DashLayout>
  );
};

export default AdminDashboard;
