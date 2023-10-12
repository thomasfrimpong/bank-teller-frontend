"use client";
import { useSession } from "next-auth/react";
import ProtectedRoute from "../context/ProtectedRoute";
import { useTheme } from "@mui/material/styles";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBarComponent from "../components/AppBarComponent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import dataSource from "@/hooks/dataSource";
import { useEffect, useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const token = session?.user.api_token;

  const { currentDate, getWithdrawalSum, getDepositSum } = dataSource();
  const [withdrawalSum, setWithdrawalSum] = useState(0);
  const [depositSum, setDepositSum] = useState(0);

  useEffect(() => {
    const getSummaries = async () => {
      const sum1 = await getWithdrawalSum(token);
      console.log(sum1);
      setWithdrawalSum(sum1);
      const sum2 = await getDepositSum(token);
      console.log(sum2);
      setDepositSum(sum2);
    };
    getSummaries();
  }, [token]);

  const theme = useTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent index="1" />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <h2>Dashboard Page </h2>
                <Typography component="div" variant="h6">
                  Summaries for {currentDate()}
                </Typography>
              </Grid>

              <Grid item xs={4}></Grid>

              <Grid item xs={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <DeliveryDiningIcon sx={{ height: 70, width: 70 }} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        GHC {withdrawalSum}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Sum Of Withdrawals
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <PropaneTankIcon sx={{ height: 70, width: 70 }} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        GHC {depositSum}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Sum of Deposits
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <GroupAddIcon sx={{ height: 70, width: 70 }} />
                    {/* <DeliveryDiningIcon sx={{ height: 70, width: 70 }} /> */}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        5
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Total of Customers
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    {/* <DeliveryDiningIcon sx={{ height: 70, width: 70 }} /> */}
                    <FormatListNumberedRtlIcon sx={{ height: 70, width: 70 }} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        7
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Total of Accounts
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
