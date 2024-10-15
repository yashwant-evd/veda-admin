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
  handleChangeCheckbox,
  handleCheckedAll,
  getCheckedAll,
  getCheckedValue,
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
      name: (
        <Checkbox
          value={getCheckedAll}
          checked={getCheckedAll}
          onChange={(event) =>
            // console.log(event.target.checked)
            handleCheckedAll(event.target.checked)
          }
        />
      ),
      selector: (data) => (
        <Checkbox
          value={data?.id}
          checked={getCheckedValue.findIndex((i) => i == data.id) != -1}
          onChange={(event) =>
            // console.log(event.target.value)
            handleChangeCheckbox(event.target.value)
          }
        />
      ),
      width: "80px",
    },
    {
      name: "Image",
      selector: (row) => {
        return (
          <img
            src={row.avatar == null ? Inf : row.avatar}
            alt="logo"
            onClick={() => {
              setUserImage(row?.avatar);
              setUserName(row?.name);
              setOpenImageViewer(true);
            }}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "40px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        );
      },
      width: "80px",
    },
    {
      name: "Name",
      cell: (row) => {
        return (
          <Tooltip title={row.name}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.name}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Employee Id",
      cell: (row) => {
        return (
          <Tooltip title={row.employeeCode}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.employeeCode ? row.employeeCode : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Department",
      cell: (row) => {
        return (
          <Tooltip title={row.department}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.department ? row.department : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Designation",
      cell: (row) => {
        return (
          <Tooltip title={row.designation}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.designation ? row.designation : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      // selector: (row) => (row.email ? row.email : "N/A")
      cell: (row) => {
        return (
          <Tooltip title={row.email ? row.email : "N/A"}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.email ? row.email : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Gender",
      cell: (row) => {
        return (
          <Tooltip title={`${row?.gender}`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${row?.gender}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "100px",
    },
    {
      name: "Test Rescheduled",
      cell: (row) => {
        return (
          <Tooltip>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.isTestAllowed == true ? "Yes" : "No"}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
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
      width: 300,
    },
    {
      name: "Date of Birth",
      selector: (row) =>
        row.dob ? moment(row.dob).format("DD MMM YYYY") : "N/A",
    },
    {
      name: "Registration Date",
      selector: (row) =>
        row?.registationDate
          ? moment(row?.registationDate).format("DD MMM YYYY")
          : "N/A",
      width: "150px",
    },
    {
      name: "Batch Start",
      selector: (row) =>
        row.staffBatchStartDate
          ? moment(row.staffBatchStartDate).format("DD MMM YYYY")
          : "N/A",
    },
    {
      name: "Batch End",
      selector: (row) =>
        row.staffBatchEndDate
          ? moment(row.staffBatchEndDate).format("DD MMM YYYY")
          : "N/A",
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              setStudentInfo(row);
              handleOpenPopover(e);
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
