import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Button } from "@mui/material";
import { updateContentSequenceAsync } from "redux/syllabuus/syllabus.async";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import DialogBox from "components/DialogBox/index";

function VideoSeqDialog({
  handleClosePopover,
  open,
  setOpen,
  syllabusId,
  subjectId,
  chapterId,
  topicId,
  orderSeq,
}) {
  const dispatch = useDispatch();
  const { updateSeqData } = useSelector((state) => state.syllabus);

  const [seqVal, setSeqVal] = useState(orderSeq == "N/A" ? 0 : orderSeq);

  console.log("subjectId...", subjectId);

  const setValue = (e) => {
    setSeqVal(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    handleClosePopover();
  };

  const addSequence = () => {
    handleClosePopover();
    const videSequence = seqVal == "" ? 0 : seqVal;
    const payload = {
      subjectId: subjectId,
      chapterId: chapterId,
      topicId: topicId,
      Id: syllabusId,
      sequence: parseInt(videSequence),
    };

    if ((seqVal >= 0 && seqVal <= 1000) || seqVal == "" || seqVal == null) {
      dispatch(updateContentSequenceAsync(payload)).then((res) => {
        if (res.payload.status) {
          toast.success(res.payload.message, toastoptions);
          setOpen(false);
          handleClosePopover();
        }
      });
    } else {
      toast.error("Please enter numbers between 0-1000", toastoptions);
      setOpen(true);
    }
  };

  return (
    <form>
      <DialogBox
        open={open}
        title="Update Video Sequence"
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            *Please add video sequence number for unique <strong>Topic</strong>{" "}
            only
            <br />
            *Add 0 to reset the sequence
          </DialogContentText>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              name="videoSeq"
              label="Add Sequence"
              type="number"
              fullWidth
              variant="standard"
              value={seqVal}
              onChange={(e) => {
                setValue(e);
              }}
              error={seqVal < 0 || seqVal > 1000}
            />
          </FormControl>
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

export default VideoSeqDialog;
