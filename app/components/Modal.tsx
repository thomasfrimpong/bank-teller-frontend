import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  p: 4,
};

export default function ModalComponent({ button }: { button: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        {button}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Box sx={{ display: "flex" }}>
            <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ marginLeft: "70px" }}
              >
                Add A Cylinder
              </Typography>
              <Grid container spacing={3}>
                {/* <Grid item xs={8}>
                  <h2>Dispatchers Table </h2>
                </Grid>

                <Grid item xs={4}></Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="size_of_cylinder"
                    label="Size of Cylinder"
                    name="size_of_cylinder"
                    variant="standard"
                    sx={{ mt: 1 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="cost_per_unit"
                    label="Cost Per Unit"
                    name="cost_per_unit"
                    variant="standard"
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="number_of_units_available"
                    label="Number Of Units"
                    name="number_of_units_available"
                    variant="standard"
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button sx={{ mt: 3, width: "290px" }} variant="outlined">
                  Submit
                </Button>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
