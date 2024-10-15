import { IconButton } from "@mui/material";
import moment from "moment";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const topiccolumns = ({
  openPopover,
  handleOpenPopover,
  setSyllabusinfo,
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
          <Tooltip title={row?.course}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.course}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Subject",
      cell: (row) => {
        return (
          <Tooltip title={row?.subject}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.subject}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Chapter",
      cell: (row) => {
        return (
          <Tooltip title={row?.chapterName}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.chapterName}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Topic",
      cell: (row) => {
        return (
          <Tooltip title={row?.name}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.name}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Topic Status",
      selector: (row) => (row?.status === 1 ? "Active" : "Inactive"),
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
                ? `${data?.createdByName} (${data?.createdByRole})`
                : "N/A"
            }
          >
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {data?.createdByName
                ? `${data?.createdByName} (${data?.createdByRole})`
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
              setSyllabusinfo(row);
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
