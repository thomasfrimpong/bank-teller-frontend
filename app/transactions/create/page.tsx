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
import { Account, Customer } from "@/utils/interfaces";
import dataSource from "@/hooks/dataSource";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateDispatcher() {
  const { data: session, status } = useSession({
    required: true,
  });

  const token = session?.user.api_token;

  const { getCustomers } = dataEntry();
  const { addTransaction, getAccounts } = dataSource();
  const { error, loading } = useContext(AuthenticationContext);
  const [accountId, setAccountId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [typeOfTransaction, setTypeOfTransaction] = useState("");
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [inputs, setInputs] = useState({
    amount: 0,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const list = await getCustomers(token);
      console.log(list);

      setCustomerList(list);

      const accounts = await getAccounts(token);
      console.log(accounts);
      setAccountList(accounts);
    };
    fetchDetails();
  }, [token]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission

    addTransaction(
      {
        customer_id: customerId,
        account_id: accountId,
        amount: data.amount,
        type_of_transaction: typeOfTransaction,
      },
      token
    );
  };

  const handleChangeAccountId = (event: SelectChangeEvent) => {
    setAccountId(event.target.value);
  };

  const handleChangeTransactionType = (event: SelectChangeEvent) => {
    //console.log(event.target.value);

    setTypeOfTransaction(event.target.value);
  };
  const handleChangeCustomer = (event: SelectChangeEvent) => {
    setCustomerId(event.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
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
              Transaction recording failed. Please try again..
            </Alert>
          ) : null}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <h2>Add Transaction</h2>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Type Of Transaction
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={typeOfTransaction}
                          label="Type Of Account"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeTransactionType}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="deposit">Deposit</MenuItem>
                          <MenuItem value="withdrawal">Withdrawal</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Customer
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
                        <InputLabel id="demo-simple-select-label">
                          Account Number
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={accountId}
                          label="Account Number"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeAccountId}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {accountList.map((account) => (
                            <MenuItem value={account.id}>
                              {account.account_number}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="amount"
                          label="Amount"
                          {...register("amount", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />
                        {errors.amount && (
                          <p style={{ color: "#c40c21" }}>Amount is required</p>
                        )}
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
