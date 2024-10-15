import { IconButton } from "@mui/material";
import { Button, Typography, Checkbox } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import moment from "moment";
import Inf from "assets/ImageStudent/inf.jpg";
import Tooltip from "@mui/material/Tooltip";

export const studentcolumns = ({
  openPopover,
  handleOpenPopover,
  setStudentInfo,
  paginationpage,
  setUserName,
  setUserImage,
  setOpenImageViewer,
  totalDates,
  getAttendance,
}) => {
  let daName = [];
  if (getAttendance?.dates && getAttendance.dates.length > 0) {
    daName = getAttendance.dates.map((item, index) => {
      return {
        name: item,
        cell: (row) => {
          const dateValue = row?.attendance[index];
          return (
            <Tooltip title={dateValue}>
              <Typography
                component="div"
                noWrap
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color:
                    dateValue == "A" ? "red" : dateValue == "P" ? "green" : "",
                }}
              >
                {dateValue}
              </Typography>
            </Tooltip>
          );
        },
      };
    });
  }

  const columnValues = [
    {
      name: "Sr. No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "80px",
    },
    {
      name: "Name",
      cell: (row) => {
        return (
          <Tooltip title={row.userName}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.userName}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "TID",
      cell: (row) => {
        return (
          <Tooltip title={row.TId}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.TId}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Batch Name",
      cell: (row) => {
        return (
          <Tooltip title={row.batchName}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.batchName}
            </Typography>
          </Tooltip>
        );
      },
    },
    ...daName,
  ];
  return columnValues;
};
