"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthenticationContext } from "./context/AuthContext";
import { Alert, FormControl } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import dataSource from "@/hooks/dataSource";
import useAuth from "@/hooks/useAuth";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  //const { getAdmin } = dataSource();
  const { logIn } = useAuth();

  const router = useRouter();
  const { loading, error, setAuthState } = useContext(AuthenticationContext);

  const logInUser = async (data: any) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });

    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log(response);
    if (!response?.error) {
      router.push("/dashboard");
    }
    // const response = await getAdmin({
    //   email: data.email,
    //   password: data.password,
    // });
    // console.log(response);
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {error ? (
          <Alert severity="error" sx={{ mt: 4, mb: 2 }}>
            Login failed. Please try again..
          </Alert>
        ) : null}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h2" variant="h6">
            Bank Teller Application
          </Typography>

          <form onSubmit={handleSubmit(logInUser)}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                onChange={handleChangeInput}
              />
              {errors.email?.type === "required" && (
                <p style={{ color: "#c40c21" }}>Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p style={{ color: "#c40c21" }}>Invalid email format</p>
              )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                onChange={handleChangeInput}
              />
              {errors.email && (
                <p style={{ color: "#c40c21" }}>Password is required</p>
              )}
            </FormControl>

            <FormControl fullWidth>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Login in..." : "Sign In"}
              </Button>
            </FormControl>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
