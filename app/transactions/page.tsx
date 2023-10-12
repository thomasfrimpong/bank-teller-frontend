"use client";
import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppBarComponent from "../components/AppBarComponent";
import BasicTable from "./components/BasicTable";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Payments() {
  const { data: session, status } = useSession({
    required: true,
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent index="4" />

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
                <h2>Transactions Table </h2>
              </Grid>

              <Grid item xs={4}>
                <Button
                  sx={{ mt: 3 }}
                  href="/transactions/create"
                  variant="contained"
                >
                  Add Transaction
                </Button>
              </Grid>
              <Grid item xs={12}>
                <BasicTable />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
