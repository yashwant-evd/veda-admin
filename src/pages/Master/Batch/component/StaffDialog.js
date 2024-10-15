import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import TestReports from "../TestReports";

function StaffDialog({ handleClose, batchinfo, openDialog, fullScreen }) {
  return (
    <div className="reportDialog">
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Staff Details</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            color="error"
            style={{
              position: "absolute",
              top: 1,
              right: 1,
              borderRadius: "20px",
            }}
            variant="outlined"
          >
            <CloseIcon />
          </Button>
        </DialogActions>

        <DialogContent style={{ display: "flex" }}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12}>
              {/* <TestReports studentId={studentInfo?.id} /> */}
              <TestReports batchinfo={batchinfo} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StaffDialog;
