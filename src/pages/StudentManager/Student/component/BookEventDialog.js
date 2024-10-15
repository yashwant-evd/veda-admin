import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateEventAuthTypeAsync } from "redux/studentStatus/sudentStatus.async";
import DialogBox from "components/DialogBox/index";

function BookEventDialog({
  handleClosePopover,
  open,
  setOpen,
  studentInfo,
  id,
}) {
  const dispatch = useDispatch();
  const [checkedSelf, setCheckedSelf] = useState(studentInfo?.selfAuthType);
  const [checkedTeam, setCheckedTeam] = useState(studentInfo?.teamAuthType);

  const handleClose = () => {
    setOpen(false);
    handleClosePopover();
  };

  const handleChangeSelf = (event) => {
    setCheckedSelf(event.target.checked);
  };

  const handleChangeTeam = (event) => {
    setCheckedTeam(event.target.checked);
  };

  const addSequence = () => {
    const payload = {
      selfType: checkedSelf,
      teamType: checkedTeam,
      Id: id,
    };

    dispatch(updateEventAuthTypeAsync(payload)).then((res) => {
      if (res.payload.status === 200) {
        toast.success(res.payload.message, toastoptions);
        setOpen(false);
        handleClosePopover();
      }
    });
  };

  return (
    <form>
      <DialogBox open={open} title="Request for Event" onClose={handleClose}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Please Select below event types:
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox checked={checkedSelf} onChange={handleChangeSelf} />
            }
            label="Self"
            sx={{ marginRight: "40px" }}
          />
          <FormControlLabel
            control={
              <Checkbox checked={checkedTeam} onChange={handleChangeTeam} />
            }
            label="Team"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={addSequence}>
            Add
          </Button>
        </DialogActions>
      </DialogBox>
    </form>
  );
}

export default BookEventDialog;
