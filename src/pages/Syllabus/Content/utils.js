import { IconButton } from "@mui/material";
import moment from "moment";
import Iconify from "../../../components/iconify/Iconify";
import { capitalize } from "lodash";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const syllabuscollumns = ({
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
          <Tooltip title={row?.chapter?.map((ev) => ev.name)}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.chapter?.map((ev) => ev.name)}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
    {
      name: "Topic",
      cell: (row) => {
        return (
          <Tooltip title={row?.topic?.map((ev) => ev.name)}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {row?.topic?.map((ev) => ev.name)}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
    {
      name: "Language",
      selector: (row, index) => row.language,
      width: "120px",
    },
    {
      name: "Tag",
      cell: (row) => {
        return (
          <Tooltip title={capitalize(row?.tag)}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {capitalize(row?.tag)}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
    {
      name: "Source",
      cell: (row) => {
        return (
          <Tooltip title={capitalize(row?.source)}>
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
              {capitalize(row?.source)}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Test Status",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
            {capitalize(row?.isTestMandatory)}
          </Typography>
        );
      },
    },
    {
      name: "Test Mandatory",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
            {capitalize(row?.isMandatory)}
          </Typography>
        );
      },
      width: "140px",
    },
    {
      name: "Video Seq",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
            {row?.ORDERSEQ}
          </Typography>
        );
      },
    },
    {
      name: "Day Seq",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
            {row?.DAYSEQ}
          </Typography>
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
            <Typography component="div" noWrap sx={{ fontSize: "13px" }}>
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
