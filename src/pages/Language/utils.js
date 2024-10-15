import { Button, IconButton } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const langColumns = ({
  openPopover,
  handleOpenPopover,
  setLangInfo,
  paginationpage,
}) => {
  const columnValues = [
    {
      name: "Sl No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "120px",
    },
    {
      name: "Language",
      // width: "150px"
      cell: (data) => {
        return (
          <Tooltip title={data.language}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data.language}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Key",
      cell: (data) => {
        return (
          <Tooltip title={`(${data.key})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data.key}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "290px",
    },
    {
      name: "Value",
      cell: (data) => {
        return (
          <Tooltip title={`(${data.value})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data.value}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "290px",
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setLangInfo(row);
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

export const pollReports = ({
  openPopover,
  handleOpenPopover,
  setLangInfo,
  paginationpage,
}) => {
  const columnValues = [
    {
      name: "Sl No.",
      selector: (row, index) =>
        paginationpage === 1
          ? index + 1
          : index === 9
          ? `${paginationpage}0`
          : `${paginationpage - 1}${index + 1}`,
      width: "80px",
    },
    {
      name: "Poll Id",
      // width: "150px"
      cell: (data) => {
        return (
          <Tooltip title={data?.userId}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data?.pollId}
            </Typography>
          </Tooltip>
        );
      },
      width: "80px",
    },
    {
      name: "User Id",
      // width: "150px"
      cell: (data) => {
        return (
          <Tooltip title={data?.userId}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data?.userId}
            </Typography>
          </Tooltip>
        );
      },
      width: "80px",
    },
    {
      name: "Name",
      cell: (data) => {
        return (
          <Tooltip title={`(${data?.name})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data?.name}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Title",
      cell: (data) => {
        return (
          <Tooltip title={`(${data?.title})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data?.title}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "203px",
    },
    {
      name: "Response",
      cell: (data) => {
        return (
          <Tooltip title={`(${data?.response})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data?.response}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "200px",
    },
  ];
  return columnValues;
};
