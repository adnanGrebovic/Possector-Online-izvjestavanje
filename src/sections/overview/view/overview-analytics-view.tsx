import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Box, CircularProgress } from '@mui/material';
import CustomDatePicker from 'src/layouts/components/nav-upgrade';
import React, { useState } from 'react';
import { useAppSelector } from 'src/data/ConfigureData';
import PieChartWithCenterLabel from '../Diagrams/PaymentTypeAnalytics';
import PieChartFinancialStatus from '../Diagrams/FinancialAnalytics'; // Keep only one import for FinancialAnalytics
import SimpleLineChart from '../Diagrams/LineChartMoneyFlow';
import ColorTabs from '../Diagrams/tabMenu';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [loading, setLoading] = useState(true);
  const {dateRange}= useAppSelector(state=>state.date_range);

  React.useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dateRange]);


  return (
    <DashboardContent maxWidth="xl">
      <Box display='flex' alignItems='center' mb={5}>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', top: '-100px' }}>
        <CustomDatePicker />
      </Box>

      <Grid container spacing={3} alignItems='center' justifyContent='space-between'>

        {!loading && dateRange && (
          <>


            <Grid>
              <Box sx={{ position: 'relative', left: '250px', right: '200px', bottom: '50px' }}>
                <SimpleLineChart />
              </Box>
            </Grid>

            <Grid>
              <Box sx={{position: 'relative', right: '310px', top: '150px'}}>
                <ColorTabs/>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} >
              <Box sx={{ padding: 2, position: 'relative', top: '50px' }}>
                <PieChartWithCenterLabel />
              </Box>
            </Grid>

            <Grid item xs={12} md={6} >
              <Box sx={{ padding: 2, position: 'relative', top: '50px' }}>
                <PieChartFinancialStatus />
              </Box>
            </Grid>
          </>
        )}


      </Grid>
    </DashboardContent>
  );
}
