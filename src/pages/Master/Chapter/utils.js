import { IconButton } from "@mui/material";
import moment from "moment";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const chaptercolumns = ({
  openPopover,
  handleOpenPopover,
  setChapterInfo,
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
    // {
    //   name: "Course, Board, Class, Batch",
    //   cell: (row) => {
    //     return (
    //       <Tooltip
    //         title={`(${row?.course}) (${row?.board}) (${row?.class}) (${row?.batchType})`}
    //       >
    //         <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
    //           {`(${row?.course}) (${row?.board}) (${row?.class}) (${row?.batchType})`}
    //         </Typography>
    //       </Tooltip>
    //     );
    //   },
    //   width: "300px",
    // },
    {
      name: "Course",
      cell: (row) => {
        return (
          <Tooltip title={row?.course}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.course}
            </Typography>
          </Tooltip>
        );
      },
      // width: "150px",
    },
    {
      name: "Subject Name",
      cell: (row) => {
        return (
          <Tooltip title={row?.subject}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.subject}
            </Typography>
          </Tooltip>
        );
      },
      // width: "150px",
    },
    {
      name: "Chapter Name",
      selector: (row) => row.chapterName,
      // width: "150px",
    },
    {
      name: "Chapter Status",
      selector: (row) => (row.status === 1 ? "Active" : "Inactive"),
      // width: "150px",
    },
    {
      name: "Created Date",
      selector: (row) => moment(row.createdAt).format("DD MMM YYYY"),
      // width: "160px",
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
              setChapterInfo(row);
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
