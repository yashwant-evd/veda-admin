import { IconButton } from "@mui/material";
import moment from "moment";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const batchdatecolumns = ({
  openPopover,
  handleOpenPopover,
  setBatchdateinfo,
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
      name: "Course, Board, Class, Batch",
      // selector: (row) => `(${row?.course}) (${row?.board}) (${row?.class}) (${row?.batchType})`,
      cell: (row) => {
        return (
          <Tooltip title={`(${row?.course}) (${row?.board}) (${row?.class}) (${row?.batchType})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`(${row?.course}) (${row?.board}) (${row?.class}) (${row?.batchType})`}
            </Typography>
          </Tooltip>
        );
      },
      width: "350px",
    },
    {
      name: "Batch Date",
      selector: (row) => moment(row.date).format("DD MMM YYYY"),
      width: "160px",
    },
    {
      name: "Batch Date Status",
      selector: (row) => row.status === 1 ? "Active" : "Inactive",
      width: "160px",
    },
    {
      name: "Created Date",
      selector: (row) => moment(row.createdAt).format("DD MMM YYYY"),
      width: "150px",
    },
    {
      name: "Created By",
      selector: (data) =>
        data?.createdByName
          ? `${data?.createdByName} (${data.createdByRole})`
          : "N/A"
    },
    {
      name: "Actions",
      width: "150px",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setBatchdateinfo(row);
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
