import { Button, IconButton, Checkbox } from "@mui/material";
import Iconify from "components/iconify/Iconify";
import Tooltip from "@mui/material/Tooltip";
import Inf from "assets/ImageStudent/inf.jpg";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as yup from "yup";

export const _initialValues = {
  fromDate: "",
  toDate: "",
};

export const pollPageValidate = yup.object().shape({
  fromDate: yup.string().required(),
  toDate: yup.string().required(),
});

export const studentcolumns = ({
  openPopover,
  handleOpenPopover,
  setStudentInfo,
  paginationpage,
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
      width: "90px",
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
      name: "Batch Name",
      cell: (row) => {
        return (
          <Tooltip title={row.batchName}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row.batchName ? row.batchName : "N/A"}
            </Typography>
          </Tooltip>
        );
      },
      width: "150px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
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
      selector: (row) => row.gender,
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

export const batchColumns = ({
  openPopover,
  handleOpenPopover,
  setReportInfo,
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
      width: "5%",
    },
    {
      name: "Student Name",
      // width: "150px"
      cell: (data) => {
        return (
          <Tooltip title={data.studentName}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {data.studentName}
            </Typography>
          </Tooltip>
        );
      },
      width: "15%",
    },
    {
      name: "Test Type",
      cell: (data) => {
        return (
          <Tooltip title={`(${data.title})`}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {`${data.title}`}
            </Typography>
          </Tooltip>
        );
      },
      width: "15%",
    },
    {
      name: "Total Questions",
      cell: (row) => {
        return (
          <Tooltip title={row?.numberOfQuestions}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.numberOfQuestions}
            </Typography>
          </Tooltip>
        );
      },
      width: "15%",
    },
    {
      name: "Unattempted Questions",
      cell: (row) => {
        return (
          <Tooltip title={row?.unAttemptedQuestion}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.unAttemptedQuestion}
            </Typography>
          </Tooltip>
        );
      },
      width: "12%",
    },
    {
      name: "Correct Ans",
      cell: (row) => {
        return (
          <Tooltip title={row?.correctAnswer}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.correctAnswer}
            </Typography>
          </Tooltip>
        );
      },
      width: "10%",
    },
    {
      name: "Wrong Ans",
      cell: (row) => {
        return (
          <Tooltip title={row?.wrongAnswer}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.wrongAnswer}
            </Typography>
          </Tooltip>
        );
      },
      width: "10%",
    },
    {
      name: "Result",
      cell: (row) => {
        return (
          <Tooltip title={row?.result}>
            <Typography component="div" noWrap sx={{ fontSize: "14px" }}>
              {row?.result}
            </Typography>
          </Tooltip>
        );
      },
      width: "8%",
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={(e) => {
              handleOpenPopover(e);
              setReportInfo(row);
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
