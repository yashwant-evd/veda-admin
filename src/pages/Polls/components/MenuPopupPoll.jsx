import { Divider, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { PATH_DASHBOARD } from "routes/paths";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { pollReportByIdAsync } from "redux/polls/poll.async";
import { useDispatch } from "react-redux";
import "../styles.css";
import AnalyticLive from "../AnalyticLive";
import LivePollReport from "../LivePollReport";

const MenuPopupBoard = ({
  openPopover,
  handleClosePopover,
  pollInfo,
  setOpenConfirm,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modulePermit } = useSelector((state) => state.menuPermission);

  const { getReportById, pollLoader, getReportsByIdLoader, updatePollLoader } =
    useSelector((state) => state?.pollsData);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
    const payload = {
      pollId: pollInfo.id,
    };
    dispatch(pollReportByIdAsync(payload));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const labelsReportArray = [];
  const valuesReportArray = [];

  // if (
  //   getReportById?.data?.option3 === "" &&
  //   getReportById?.data?.option4 === ""
  // ) {
  //   labelsReportArray.push(
  //     getReportById?.data?.option1,
  //     getReportById?.data?.option2
  //   );
  //   valuesReportArray.push(
  //     getReportById?.data?.result?.option1,
  //     getReportById?.data?.result?.option2
  //   );
  // } else if (getReportById?.data?.option3 === "") {
  //   labelsReportArray.push(
  //     getReportById?.data?.option1,
  //     getReportById?.data?.option2,
  //     getReportById?.data?.option4
  //   );
  //   valuesReportArray.push(
  //     getReportById?.data?.result?.option1,
  //     getReportById?.data?.result?.option2,
  //     getReportById?.data?.result?.option4
  //   );
  // } else if (getReportById?.data?.option4 === "") {
  //   labelsReportArray.push(
  //     getReportById?.data?.option1,
  //     getReportById?.data?.option2,
  //     getReportById?.data?.option3
  //   );
  //   valuesReportArray.push(
  //     getReportById?.data?.result?.option1,
  //     getReportById?.data?.result?.option2,
  //     getReportById?.data?.result?.option3
  //   );
  // } else {
  //   labelsReportArray.push(
  //     getReportById?.data?.option1,
  //     getReportById?.data?.option2,
  //     getReportById?.data?.option3,
  //     getReportById?.data?.option4
  //   );
  //   valuesReportArray.push(
  //     getReportById?.data?.result?.option1,
  //     getReportById?.data?.result?.option2,
  //     getReportById?.data?.result?.option3,
  //     getReportById?.data?.result?.option4
  //   );
  // }

  const options = [];
  const results = [];

  if (getReportById?.data?.option1 !== "") {
    options.push(getReportById?.data?.option1);
    results.push(getReportById?.data?.result?.option1);
  }

  if (getReportById?.data?.option2 !== "") {
    options.push(getReportById?.data?.option2);
    results.push(getReportById?.data?.result?.option2);
  }

  if (getReportById?.data?.option3 !== "") {
    options.push(getReportById?.data?.option3);
    results.push(getReportById?.data?.result?.option3);
  }

  if (getReportById?.data?.option4 !== "") {
    options.push(getReportById?.data?.option4);
    results.push(getReportById?.data?.result?.option4);
  }

  labelsReportArray.push(...options);
  valuesReportArray.push(...results);

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
            {
              pollInfo.id &&
                navigate(`${PATH_DASHBOARD.editPoll}/${pollInfo.id}`);
            }
          }}
          disabled={!Boolean(modulePermit?.edit)}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            setOpenConfirm(true);
          }}
          sx={{ color: "error.main" }}
          disabled={!Boolean(modulePermit?.remove)}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClickOpen();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          {"Report"}
        </MenuItem>
      </MenuPopover>
      <div className="reportDialog">
        {" "}
        <Dialog
          // fullScreen
          // fullWidth={true}
          // maxWidth={"xl"}
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {getReportById?.data?.message}
          </DialogTitle>
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
              <Grid item xs={12} md={6}>
                {!getReportsByIdLoader && (
                  <AnalyticLive
                    labelsReportArray={labelsReportArray}
                    valuesReportArray={valuesReportArray}
                    pollId={pollInfo.id}
                  />
                )}
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {!getReportsByIdLoader && (
                  <LivePollReport
                    labelsReportArray={labelsReportArray}
                    valuesReportArray={valuesReportArray}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MenuPopupBoard;
