"use client";
import AppBarComponent from "@/app/components/AppBarComponent";
import { useState, useContext, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { TextField, Button, Alert } from "@mui/material";
import { useSession } from "next-auth/react";
import { AuthenticationContext } from "@/app/context/AuthContext";
//import ProtectedRoute from "@/app/context/ProtectedRoute";
import dataEntry from "@/hooks/dataEntry";
import { Customer } from "@/utils/interfaces";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateDispatcher() {
  const { data: session, status } = useSession({
    required: true,
  });
  console.log(session);
  const token = session?.user.api_token;
  const { addAccount, getCustomers } = dataEntry();
  const { error, loading } = useContext(AuthenticationContext);
  const [customerId, setCustomerId] = useState("");
  const [typeOfAccount, setTypeOfAccount] = useState("");
  const [customerList, setCustomerList] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const list = await getCustomers(token);
      console.log(list);

      setCustomerList(list);
    };
    fetchCustomers();
    console.log(customerList);
  }, [token]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(typeOfAccount);
    console.log(customerId);

    addAccount(
      {
        type_of_account: typeOfAccount,
        customer_id: customerId,
      },
      token
    );
  };

  const handleChangeAccountType = (event: SelectChangeEvent) => {
    console.log(event.target.value);

    setTypeOfAccount(event.target.value);
  };

  const handleChangeCustomer = (event: SelectChangeEvent) => {
    console.log(event.target.value);

    setCustomerId(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent index="2" />

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
          {error ? (
            <Alert severity="error">
              Account registration failed. Please try again..
            </Alert>
          ) : null}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <h2>Add Account </h2>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Type Of Account
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={typeOfAccount}
                          label="Type Of Account"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeAccountType}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Saving">Savings</MenuItem>
                          <MenuItem value="Current">Current</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose Customer
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={customerId}
                          label="Choose Customer"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeCustomer}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {customerList.map((customer) => {
                            return (
                              <MenuItem key={customer.id} value={customer.id}>
                                {customer.first_name} {customer.last_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, width: "320px", mb: 6, mr: 5 }}
                          disabled={loading}
                        >
                          {loading ? "Saving...." : "Submit"}
                        </Button>
                      </FormControl>
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
