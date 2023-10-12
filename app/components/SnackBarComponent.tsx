"use client";
import React, { useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { AuthenticationContext } from "@/app/context/AuthContext";

interface State extends SnackbarOrigin {
  open: boolean;
}

const SnackBarComponent = ({ message }: { message: string }) => {
  const { showSnackbar, setAuthState } = useContext(AuthenticationContext);
  // console.log(showSnackbar);

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setAuthState({
      success: false,
      loading: false,
      error: false,
      showSnackbar: false,
    });

    setState({ ...state, open: false });
  };

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert severity="success" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBarComponent;
