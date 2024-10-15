import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoMandatoryAsync } from "redux/syllabuus/syllabus.async";
import DialogBox from "components/DialogBox/index";

function DialogFile({ onClose, selectedValue, open, options, syllabusinfo }) {
  const dispatch = useDispatch();
  const { syllabusLoader, videoTestMandatory } = useSelector(
    (state) => state.syllabus
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    const payload = {
      Id: syllabusinfo.id,
      isMandatory: value,
    };
    dispatch(updateVideoMandatoryAsync(payload));
  };

  return (
    <DialogBox open={open} title="Set Test for Video" onClose={handleClose}>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem disableGutters key={option}>
            <ListItemButton onClick={() => handleListItemClick(option)}>
              <ListItemText
                primary={option.toString()}
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DialogBox>
  );
}

export default DialogFile;
