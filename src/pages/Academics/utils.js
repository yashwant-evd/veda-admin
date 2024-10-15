import { IconButton, Button } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import Label from "components/label/Label";
import { capitalize } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";
import { PATH_DASHBOARD } from "routes/paths";

export const liveclasscolumns = ({
  openPopover,
  handleOpenPopover,
  setliveclassInfo,
  paginationpage
}) => {
  const { userinfo } = useSelector((state) => state.userinfo);

  const columnValues = [
    {
      name: "Sl No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "80px"
    },
    {
      name: "Batch, Subject, Chapter",
      selector: (row) => {
        return (
          `(${capitalize(row?.batchType)})` +
          " " +
          `(${capitalize(row?.subject)}) ` +
          " " +
          `(${capitalize(row.chapter)})`
        );
      },
      width: "320px"
    },
    {
      name: "Meeting Number",
      selector: (row) => {
        return (
          <Label
            variant="soft"
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            {row.meetingNumber}
          </Label>
        );
      },
      width: "150px"
    },
    {
      name: "Time Duration",
      selector: (row) => {
        return (
          <Label
            variant="soft"
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            {moment.duration(row?.time).asMinutes() + " Minute"}
          </Label>
        );
      },
      width: "150px"
    },
    {
      name: "Date",
      selector: (row) => {
        return (
          <Label
            variant="soft"
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            {moment(row.startedBy.split("T")[0]).format("DD MMM YYYY")}
          </Label>
        );
      },
      width: "150px"
    },
    {
      name: "Time",
      selector: (row) => {
        return (
          <Label
            variant="soft"
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            {moment(row.startedBy.split("T")[1], "HH:mm").format("hh:mm a")}
          </Label>
        );
      },
      width: "150px"
    },
    {
      name: "Join Meeting",
      selector: (row) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              let newWindow = window.open(
                `${PATH_DASHBOARD.zoommeeting}/${row.meetingNumber}`,
                "_blank"
              );
              newWindow.ZoomCredentials = {
                meetigNumber: row.meetingNumber,
                password: row.password,
                sdkKey: row.zoomApiKey || row.zoomClientKey,
                sdkSecret: row.zoomApiSecret || row.zoomClientSecret,
                email: `${userinfo?.email}`,
                // email: `${userinfo?.id}_${userinfo?.email}`,
                name: `${userinfo?.name.toLowerCase().replace(/ /g, "_")}(${
                  userinfo.vedaId
                })`,
                role: 1
              };
            }}
            sx={{
              borderRadius: "0px"
            }}
          >
            Join
          </Button>
        );
      },
      width: "150px"
    },
    // {
    //   name: "Created Date",
    //   selector: (row) => moment(row.startDate).format("ll"),
    //   width: "150px",
    // },
    {
      name: "Teacher",
      selector: (row) => capitalize(row.teacherName)
    },
    {
      name: "Created By",

      selector: (data) =>
        data?.createdByName
          ? `${data?.createdByName} (${data.createdByRole})`
          : "N/A",
      width: "150px"
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setliveclassInfo(row);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        );
      }
    }
  ];
  return columnValues;
};
