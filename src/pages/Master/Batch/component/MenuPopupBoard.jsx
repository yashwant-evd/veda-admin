import React, { useState, useEffect } from "react";
import { MenuItem, Divider } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";
import AddStudent from "../Student/addStudent/addStudent";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddchartIcon from "@mui/icons-material/Addchart";
import PreviewIcon from "@mui/icons-material/Preview";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBatchTypes,
  getBatchStatusAsync,
} from "redux/batchtype/batchtype.async";
import { emptybatch } from "redux/batchtype/batchtype.slice";
import { toastoptions } from "utils/toastoptions";
import { toast } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import TestReports from "../TestReports.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import "../styles.css";
import StaffDialog from "./StaffDialog";
import TrainerDialog from "./TrainerDialog";

const MenuPopupBoard = ({ openPopover, handleClosePopover, batchinfo }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openTrainerDialog, setTrainerOpenDialog] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const { batchLoader, batches, getBatchStatus } = useSelector(
    (state) => state.batch
  );

  useEffect(() => {
    if (getBatchStatus.status === 200) {
      toast.success(getBatchStatus.message, toastoptions);
      dispatch(emptybatch());
      dispatch(getAllBatchTypes({ page: 1, limit: 10, status: "all" }));
    }
  }, [getBatchStatus]);

  const handleClickOpen = (value) => {
    if (value == "staff") {
      setOpenDialog(true);
      setTrainerOpenDialog(false);
    } else {
      setOpenDialog(false);
      setTrainerOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleTrainerClose = () => {
    setTrainerOpenDialog(false);
  };

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
            navigate(`${PATH_DASHBOARD.editbatchtype}/${batchinfo.id}`);
          }}
          disabled={!Boolean(modulePermit?.edit)}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        {/*<Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.addStudent}/${batchinfo.id}`);
          }}
        >
          <AddReactionIcon />
          Add New Staff
        </MenuItem> */}
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.assignStaff}/${batchinfo.id}`);
          }}
        >
          <AddchartIcon />
          Assign Batch
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.assignTrainer}/${batchinfo.id}`);
          }}
        >
          <PersonAddAltIcon />
          Assign Trainer
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.uploadBulkStudent}/${batchinfo?.id}`);
          }}
        >
          <FileUploadIcon
            sx={{
              color: "primary.main",
            }}
          />
          Bulk Assign
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClickOpen("staff");
            handleClosePopover();
          }}
        >
          <PreviewIcon />
          View Staff
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClickOpen("trainer");
            handleClosePopover();
          }}
        >
          <WysiwygIcon />
          View Trainer
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            const payload = {
              batchTypeId: batchinfo.id,
              status: batchinfo.status === 1 ? 0 : 1,
            };
            dispatch(getBatchStatusAsync(payload));
          }}
        >
          <Iconify icon="eva:eye-fill" />
          {batchinfo?.status === 1 ? "Inactive" : "Active"}
        </MenuItem>
      </MenuPopover>

      <StaffDialog
        handleClose={handleClose}
        batchinfo={batchinfo}
        openDialog={openDialog}
        fullScreen={fullScreen}
      />

      <TrainerDialog
        handleClose={handleTrainerClose}
        batchinfo={batchinfo}
        openDialog={openTrainerDialog}
        fullScreen={fullScreen}
      />
    </>
  );
};

export default MenuPopupBoard;
