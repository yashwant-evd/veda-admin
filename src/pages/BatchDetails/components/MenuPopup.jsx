import { Divider, MenuItem } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import CloseIcon from "@mui/icons-material/Close";
import Iconify from "components/iconify/Iconify";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { studentActiveStatusAsync } from "redux/studentStatus/sudentStatus.async";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { toastoptions } from "utils/toastoptions";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllTestReportsByBatchAsync } from "redux/batchWiseDetails/batchDetails.async";
import TestReports from "../TestReports";
import SummarizeIcon from "@mui/icons-material/Summarize";
import "../styles.css";

const MenuPopup = ({
  openPopover,
  handleClosePopover,
  studentInfo,
  setSubscription,
  setMpin,
  searchClass,
  searchStudent,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const [studentStatus, setStudentStatus] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleStudentStatus = () => {
    let payload = { id: studentInfo?.id };
    dispatch(studentActiveStatusAsync(payload)).then((res) => {
      if (res?.payload?.status === 200) {
        toast.success(res?.payload?.message, toastoptions);
        setStudentStatus(true);
      }
    });
    handleClosePopover();
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
    const payload = {
      page: 1,
      limit: 10,
      studentId: "",
      type: "test",
      batchTypeId: studentInfo?.batchNameId,
      status: "fail",
    };
    getAllTestReportsByBatchAsync(payload);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  console.log(
    "PATH_DASHBOARD...",
    PATH_DASHBOARD.viewBatchwiseProfile,
    studentInfo?.id
  );
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
            navigate(
              `${PATH_DASHBOARD.viewBatchwiseProfile}/${studentInfo?.id}`
            );
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.editStudent}/${studentInfo?.id}`);
          }}
          disabled={!Boolean(modulePermit?.edit)}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} /> */}
        {/*<MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.StudentAttendance}/${studentInfo?.id}`);
          }}
        >
          <EventAvailableIcon />
          Attendance
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} /> */}
        {/* <MenuItem
          onClick={() => {
            handleClosePopover();
            setSubscription(true);
          }}
        >
          <EventAvailableIcon />
          Change <br /> Subscription
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} /> 
        <MenuItem
          onClick={() => {
            handleClosePopover();
            setMpin(true);
          }}
        >
          <EventAvailableIcon />
          Change M-Pin
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />*/}

        {studentInfo?.studentType === "Primary"
          ? studentInfo?.status === "Inactive"
            ? studentStatus !== true && (
                <MenuItem
                  onClick={() => {
                    handleStudentStatus();
                  }}
                >
                  <Iconify icon="eva:eye-fill" />
                  "Inactive"
                </MenuItem>
              )
            : ""
          : ""}

        <MenuItem
          onClick={() => {
            handleClickOpen();
            handleClosePopover();
          }}
        >
          <SummarizeIcon />
          {"Report"}
        </MenuItem>
      </MenuPopover>
      <div className="reportDialog">
        {" "}
        <Dialog
          // fullWidth={true}
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {getReportById?.data?.message}
          </DialogTitle> */}
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
                {/* {!getReportsByIdLoader && ( */}
                <TestReports
                  studentId={studentInfo?.id}
                  studentInfo={studentInfo}
                />
                {/* )} */}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MenuPopup;
