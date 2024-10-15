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
import { updateVideoMandatoryAsync } from "redux/syllabuus/syllabus.async";
import DialogBox from "components/DialogBox/index";

function BookEventDialog({
  handleClosePopover,
  open,
  setOpen,
  syllabusinfo,
  id,
}) {
  const dispatch = useDispatch();
  const [checkedTest, setCheckedTest] = useState(syllabusinfo?.isTestMandatory);
  const [checkedMandatory, setCheckedMandatory] = useState(
    syllabusinfo?.isMandatory
  );
  const [checkedMain, setCheckedMain] = useState(syllabusinfo?.isMain);
  const handleClose = () => {
    setOpen(false);
    handleClosePopover();
  };

  const handleChangeTest = (event) => {
    setCheckedTest(event.target.checked);
  };

  const handleChangeMandatory = (event) => {
    setCheckedMandatory(event.target.checked);
  };

  const handleChangeMain = (event) => {
    setCheckedMain(event.target.checked);
  };

  const addSequence = () => {
    const payload = {
      isTestMandatory: checkedTest,
      isMandatory: checkedMandatory,
      isMain: checkedMain,
      Id: id,
      courseId: syllabusinfo?.courseId,
      // boardId: syllabusinfo?.boardId,
      // classId: syllabusinfo?.class[0]?.classId,
      // batchTypeId: syllabusinfo?.batchType[0]?.batchId,
      subjectId: syllabusinfo?.subjectId,
      chapterId: syllabusinfo?.chapter[0]?.chapterId,
      topicId: syllabusinfo?.topic[0]?.topicId,
    };

    dispatch(updateVideoMandatoryAsync(payload)).then((res) => {
      if (res.payload.status === 200) {
        toast.success(res.payload.message, toastoptions);
        setOpen(false);
        handleClosePopover();
      }
    });
  };

  return (
    <form>
      <DialogBox open={open} title="Request for Test" onClose={handleClose}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Please select Test and Mandatory options:
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox checked={checkedTest} onChange={handleChangeTest} />
            }
            label="Test"
            sx={{ marginRight: "40px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedMandatory}
                onChange={handleChangeMandatory}
              />
            }
            label="Mandatory"
          />
          {/*<FormControlLabel
            control={
              <Checkbox checked={checkedMain} onChange={handleChangeMain} />
            }
            label="Main Test"
          /> */}
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
