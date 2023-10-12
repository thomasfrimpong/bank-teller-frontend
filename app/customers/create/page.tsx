"use client";
import AppBarComponent from "@/app/components/AppBarComponent";
import { useState, useContext } from "react";
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateDispatcher() {
  const { data: session, status } = useSession({
    required: true,
  });
  console.log(session);
  const token = session?.user.api_token;
  const { addCustomer } = dataEntry();
  const { error, loading } = useContext(AuthenticationContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    email: "",
  });

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);

    addCustomer(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        address: data.address,
        email: data.email,
      },
      token
    );
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
              Customer registration failed. Please try again..
            </Alert>
          ) : null}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <h2>Add Customer </h2>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <TextField
                          id="first_name"
                          label="First Name"
                          {...register("first_name", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.first_name && <p>First name is required</p>}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="last_name"
                          label="Last Name"
                          {...register("last_name", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.last_name && <p>Last name is required</p>}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="address"
                          label="Address"
                          {...register("address", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.address && <p>Address is required</p>}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          id="phone_number"
                          label="Phone Number"
                          {...register("phone_number", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.phone_number && <p>Phone is required</p>}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          label="Email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.email?.type === "required" && (
                          <p>Email is required</p>
                        )}
                        {errors.email?.type === "pattern" && (
                          <p>Invalid email format</p>
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
