import React from "react";
import { Divider, MenuItem } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { PATH_DASHBOARD } from "routes/paths";
import { useState } from "react";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DialogFile from "./DialogFile";
import VideoSeqDialog from "./VideoSeqDialog";
import DayUpdateDialog from "./DayUpdateDialog";
import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import TestVideoMandatoryDialog from "./TestVideoMandatoryDialog";

export default function MenuPopupChapter({
  openPopover,
  handleClosePopover,
  syllabusinfo,
}) {
  const options = [true, false];
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const handleClickVideoDialogOpen = () => {
    setOpenVideoDialog(true);
  };

  const [openDayDialog, setOpenDayDialog] = useState(false);
  const handleClickDayDialogOpen = () => {
    setOpenDayDialog(true);
  };

  const [openMandatory, setOpenMandatory] = useState(false);
  const handleClickMandatoryDialogOpen = () => {
    setOpenMandatory(true);
  };

  console.log("syllabusinfo....", syllabusinfo);

  return (
    <>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.editcontent}/${syllabusinfo?.id}`);
          }}
          disabled={!Boolean(modulePermit?.edit)}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        {/* <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            // handleClosePopover();
            handleClickOpen();
          }}
        >
          <AltRouteIcon />
          {syllabusinfo?.status === 1 ? "Non-Mandatory" : "Mandatory"}
        </MenuItem> 

        <DialogFile
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          options={options}
          syllabusinfo={syllabusinfo}
        />*/}

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClickMandatoryDialogOpen();
          }}
        >
          <FollowTheSignsIcon />
          Test
        </MenuItem>

        <TestVideoMandatoryDialog
          open={openMandatory}
          setOpen={setOpenMandatory}
          handleClosePopover={handleClosePopover}
          id={syllabusinfo?.id}
          syllabusinfo={syllabusinfo}
        />

        <Divider sx={{ borderStyle: "dashed", marginTop: "10px" }} />
        <MenuItem
          onClick={() => {
            // handleClosePopover();
            handleClickVideoDialogOpen();
          }}
        >
          <AnimationOutlinedIcon />
          Video Seq
        </MenuItem>
        <VideoSeqDialog
          open={openVideoDialog}
          setOpen={setOpenVideoDialog}
          syllabusId={syllabusinfo?.id}
          subjectId={syllabusinfo && syllabusinfo?.subjectId}
          chapterId={syllabusinfo && syllabusinfo?.chapter[0]?.chapterId}
          topicId={syllabusinfo && syllabusinfo?.topic[0]?.topicId}
          orderSeq={syllabusinfo && syllabusinfo?.ORDERSEQ}
          handleClosePopover={handleClosePopover}
        />

        <Divider sx={{ borderStyle: "dashed", marginTop: "7px" }} />
        <MenuItem
          onClick={() => {
            handleClickDayDialogOpen();
          }}
        >
          <FormatListNumberedIcon />
          Day Seq
        </MenuItem>
        <DayUpdateDialog
          open={openDayDialog}
          setOpen={setOpenDayDialog}
          syllabusId={syllabusinfo?.id}
          subjectId={syllabusinfo && syllabusinfo?.subjectId}
          chapterId={syllabusinfo && syllabusinfo?.chapter[0]?.chapterId}
          topicId={syllabusinfo && syllabusinfo?.topic[0]?.topicId}
          orderSeq={syllabusinfo && syllabusinfo?.DAYSEQ}
          handleClosePopover={handleClosePopover}
        />
      </MenuPopover>
    </>
  );
}
