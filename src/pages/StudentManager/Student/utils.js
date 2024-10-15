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
  handleChangeCheckbox,
  handleCheckedAll,
  getCheckedAll,
  getCheckedValue,
  setUserName,
  setUserImage,
  setOpenImageViewer,
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
          // value={JSON.stringify({
          //   id: data?.id,
          //   type: data?.subscriptionType,
          // })}
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
      name: "TID",
      cell: (row) => {
        return (
          <Tooltip title={row.TId}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.TId ? row.TId : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      name: "Role",
      cell: (row) => {
        return (
          <Tooltip title={row.type}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.type ? row.type : "N/A"}
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
      width: "200px",
    },
    {
      name: "Batch",
      cell: (row) => {
        return (
          <Tooltip title={row.batchName ? row.batchName : "N/A"}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.batchName ? row.batchName : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
      width: "170px",
    },
    {
      name: "Gender",
      cell: (row) => {
        return (
          <Tooltip title={row?.gender ? `${row?.gender}` : "N/A"}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.gender ? `${row?.gender}` : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
      width: "100px",
    },
    {
      name: "Date of Birth",
      selector: (row) =>
        row.dob ? moment(row.dob).format("DD MMM YYYY") : "N/A",
    },
    {
      name: "State",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
            {row?.state ? row?.state : "N/A"}
          </Typography>
        );
      },
      width: "150px",
    },
    {
      name: "City",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
            {row?.city ? row?.city : "N/A"}
          </Typography>
        );
      },
      width: "150px",
    },
    {
      name: "Self Req",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
            {`${row?.selfAuthType}`}
          </Typography>
        );
      },
      width: "100px",
    },
    {
      name: "Team Req",
      cell: (row) => {
        return (
          <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
            {`${row?.teamAuthType}`}
          </Typography>
        );
      },
      width: "100px",
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
      name: "Registration Date",
      selector: (row) =>
        row?.registationDate
          ? moment(row?.registationDate).format("DD MMM YYYY")
          : "N/A",
      width: "150px",
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
