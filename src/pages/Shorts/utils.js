import { IconButton } from "@mui/material";
import moment from "moment";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const shortscollumns = ({
  openPopover,
  handleOpenPopover,
  setShortsinfo,
  paginationpage,
}) => {
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
      name: "Course",
      cell: (row) => {
        return (
          <Tooltip title={row?.courseName}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.courseName}
            </Typography>
          </Tooltip>
        );
      },
      width: "200px",
    },
    {
      name: "Subject",
      cell: (row) => {
        return (
          <Tooltip title={row?.subject}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.subject}
            </Typography>
          </Tooltip>
        );
      },
      width: "200px",
    },
    {
      name: "Shorts Titles",
      selector: (row) => row?.title,
      width: "200px",
    },
    {
      name: "Source",
      selector: (row) => row?.source,
    },
    {
      name: "Video Url",
      cell: (row) => {
        return (
          <Tooltip title={row?.video}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.video}
            </Typography>
          </Tooltip>
        );
      },
      width: "250px",
    },
    {
      name: "Created Date",
      selector: (row) => moment(row.createdAt).format("DD MMM YYYY"),
    },
    {
      name: "Created By",
      cell: (data) => {
        return (
          <Tooltip
            title={
              data?.createdByName
                ? `${data?.createdByName} (${data.createdByRole})`
                : "N/A"
            }
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data?.createdByName
                ? `${data?.createdByName} (${data.createdByRole})`
                : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setShortsinfo(row);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        );
      },
    },
  ];
  return columnValues;
};
