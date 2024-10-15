import { Divider, MenuItem } from "@mui/material";
import MenuPopover from "components/menu-popover/MenuPopover";
import Iconify from "components/iconify/Iconify";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  studentActiveStatusAsync,
  studentInactiveStatusAsync,
} from "redux/studentStatus/sudentStatus.async";
import { useSelector, useDispatch } from "react-redux";
import { toastoptions } from "utils/toastoptions";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import BookEventDialog from "./BookEventDialog";
import { getstudentbyidAsync } from "redux/async.api";

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

  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const handleClickVideoDialogOpen = () => {
    setOpenVideoDialog(true);
  };

  // useEffect(() => {
  //   if (studentInfo?.id) {
  //     dispatch(getstudentbyidAsync(studentInfo.id));
  //   }
  // }, [studentStatus]);

  const handleStudentStatus = (status) => {
    if (status == "Active") {
      let payload = { id: studentInfo?.id };
      dispatch(studentInactiveStatusAsync(payload)).then((res) => {
        if (res?.payload?.status === 200) {
          toast.error(res?.payload?.message, toastoptions);
          // setStudentStatus(false);
        }
      });
    } else {
      let payload = { id: studentInfo?.id };
      dispatch(studentActiveStatusAsync(payload)).then((res) => {
        if (res?.payload?.status === 200) {
          toast.success(res?.payload?.message, toastoptions);
          // setStudentStatus(true);
        }
      });
    }
    handleClosePopover();
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
            navigate(`${PATH_DASHBOARD.profileStudent}/${studentInfo?.id}`);
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            handleClosePopover();
            navigate(`${PATH_DASHBOARD.editStudent}/${studentInfo?.id}`);
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
            setMpin(true);
          }}
        >
          <EventAvailableIcon />
          Change M-Pin
        </MenuItem>
        <Divider sx={{ borderStyle: "dashed" }} />

        {studentInfo?.status === "Inactive" ? (
          <MenuItem
            onClick={() => {
              handleStudentStatus(studentInfo?.status);
            }}
          >
            <Iconify icon="eva:eye-fill" />
            Inactive
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleStudentStatus(studentInfo?.status);
            }}
          >
            <Iconify icon="eva:eye-fill" />
            Active
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem
          onClick={() => {
            // handleClosePopover();
            handleClickVideoDialogOpen();
          }}
        >
          <FollowTheSignsIcon />
          Event Request
        </MenuItem>
        <BookEventDialog
          open={openVideoDialog}
          setOpen={setOpenVideoDialog}
          handleClosePopover={handleClosePopover}
          id={studentInfo?.id}
          studentInfo={studentInfo}
        />
      </MenuPopover>
    </>
  );
};

export default MenuPopup;
