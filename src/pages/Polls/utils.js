import { Button, IconButton } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const pollColumns = ({
  openPopover,
  handleOpenPopover,
  setPollInfo,
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
      name: "Title",
      // width: "150px"
      cell: (data) => {
        return (
          <Tooltip title={data.title}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data.title}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Message",
      cell: (data) => {
        return (
          <Tooltip title={`(${data.message})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data.message}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "230px",
    },
    {
      name: "Created at",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.startDate.slice(0, 10)}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.startDate.slice(0, 10)}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
    {
      name: "Ended at",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.endDate.slice(0, 10)}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.endDate.slice(0, 10)}
            </Typography>
          </Tooltip>
        );
      },
      width: "180px",
    },
    {
      name: "Option 1",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.option1}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.option1}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Option 2",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.option2}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.option2}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Option 3",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.option3}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.option3}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Option 4",
      cell: (row) => {
        return (
          <Tooltip
            title={row?.option4}
          >
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.option4}
            </Typography>
          </Tooltip>
        );
      },
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
              setPollInfo(row);
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
  setPollInfo,
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