import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  IconButton,
  Grid,
  Card,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import excelDownload from "../../assets/excel/ExcelDownload.png";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useSettingsContext } from "components/settings";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  emptyStudent,
  emptyStudentAttendance,
} from "../../redux/slices/student.slice";
import { getStudentAsync, getAllDepartmentAsync } from "redux/async.api";
import { getAllStudentsByBatchAsync } from "redux/batchWiseDetails/batchDetails.async";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import { studentcolumns } from "./utils";
import MenuPopup from "./components/MenuPopup";
import { InputAdornment } from "@mui/material";
import {
  studentExcelDownloadAsync,
  batchWiseStudentExcelDownloadAsync,
} from "redux/downloadexcel/excel.async";
import { PATH_DASHBOARD } from "routes/paths";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import MpinChange from "./MpinChange/MpinChange";
import DialogBox from "components/DialogBox/index";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import CustomImageViewer from "utils/customImageViewer";
import { useFormik } from "formik";
import { pollPageValidate, _initialValues } from "./utils";
import { addDaysToDate } from "utils/generateDateFromTo";
const SUBSCRIPTION = {
  FREE: "free",
  PREMIUM: "premium",
};
import "./styles.css";

export default function Subject() {
  const [getUserName, setUserName] = useState("");
  const [getUserImage, setUserImage] = useState("");
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [studentInfo, setStudentInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchStudent, setSearchStudent] = useState("");
  const [searchClass, setSearchClass] = useState([]);
  const [searchBatch, setSearchBatch] = useState([]);
  const [searchDept, setSearchDept] = useState([]);
  const [searchEmpCode, setSearchEmpCode] = useState("");

  const [date30, setdate30] = useState();
  const [isFind, setIsFind] = useState(false);
  const [getSubscription, searchGetSubscription] = useState("");
  const [getCheckedValue, setCheckedValue] = useState([]);
  const [getCheckedAll, setCheckedAll] = useState(false);
  const [Subscription, setSubscription] = useState(false);
  const [Mpin, setMpin] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const { getALLDeptData, getALLDeptLoader } = useSelector(
    (state) => state.student
  );

  const { students, studentAttendance } = useSelector((state) => state.student);
  const { filterLoader } = useSelector((state) => state.filterInfo);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );
  const { batchDetailLoader, batchDetailData } = useSelector(
    (state) => state?.batchDetails
  );
  const { batchLoader, batches } = useSelector((state) => state.batch);

  // Get current month start and end date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const startDay = "01";
  const lastDay = new Date(currentYear, currentMonth, 0).getDate();
  const startDateString = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${startDay}`;
  const endDateString = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`;

  const onSubmit = async (values) => {
    setStartDate(values?.fromDate);
    setEndDate(values?.toDate);
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: pollPageValidate,
  });

  useEffect(() => {
    dispatch(getAllDepartmentAsync({}));
  }, []);

  useEffect(() => {
    const payload = {
      page: paginationpage,
      limit: 10,
      batchTypeId: "",
      startdate: startDateString,
      enddate: endDateString,
      employeeCode: "",
      department: "",
    };
    dispatch(getAllStudentsByBatchAsync(payload));
    dispatch(getAllBatchTypes({}));
  }, []);

  const InitialStudents = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    const payload = {
      page: pageNo || paginationpage,
      limit: paginateNo || perPageNumber,
      batchTypeId: searchBatch?.value || "",
      // startdate: "2023-07-10",
      startdate: startDate || "",
      enddate: endDate || "",
      employeeCode: searchEmpCode || "",
      department: searchDept?.value || "",
    };
    dispatch(getAllStudentsByBatchAsync(payload));
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchBatch([]);
    setSearchDept([]);
    setSearchEmpCode("");
    formik.resetForm();

    const payload = {
      page: paginationpage,
      limit: 10,
      batchTypeId: "",
      // startdate: startDateString,
      // enddate: endDateString,
      startdate: "",
      enddate: "",
      employeeCode: "",
      department: "",
    };
    dispatch(getAllStudentsByBatchAsync(payload));
  };

  // POPUPOVER
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  // PAGINATION
  const handlePageChange = (page) => {
    setPaginationpage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setperPageNumber(newPerPage);
  };

  useEffect(() => {
    InitialStudents({});
  }, [paginationpage, perPageNumber]);

  const subscription = [
    {
      value: "Free",
      label: "Free",
    },
    {
      value: "Premium",
      label: "Premium",
    },
  ];

  // Single Checkbox Select Section
  const handleChangeCheckbox = (data) => {
    const index = getCheckedValue.indexOf(data);
    setCheckedAll(false);
    if (index === -1) {
      setCheckedValue([...getCheckedValue, data]);
    } else {
      setCheckedValue(getCheckedValue.filter((item) => item != data));
    }
  };
  //Multiple Checkbox Select Section
  const StudentList = students?.data;
  const handleCheckedAll = (data) => {
    setCheckedAll(data);
    if (data === true) {
      const ids = StudentList.map((i) =>
        JSON.stringify({
          id: i?.id,
          type: i?.subscriptionType,
        })
      );
      setCheckedValue(ids);
    } else {
      setCheckedValue([]);
    }
  };
  const studentsSubscription = useMemo(() => {
    return getCheckedValue.map((ev) => JSON.parse(ev).type);
  }, [getCheckedValue]);
  const isAnyFree = useMemo(() => {
    return !studentsSubscription?.every((subs) => {
      return subs?.toLowerCase() === SUBSCRIPTION.PREMIUM;
    });
  }, [studentsSubscription]);

  const handleToFreeBtn = () => {
    if (getCheckedValue.length < 1)
      return toast.error("Please Select Atleast 01 Student!", toastoptions);
    if (isAnyFree)
      return toast.error("Not All Selected Options Are Premium!", toastoptions);
    handleClosePopover();
    setSubscription(true);
  };

  const isAnyPremium = useMemo(() => {
    return !studentsSubscription?.every((subs) => {
      return subs?.toLowerCase() === SUBSCRIPTION.FREE;
    });
  }, [studentsSubscription]);
  const handleToPremiumBtn = () => {
    if (getCheckedValue.length < 1)
      return toast.error("Please Select Atleast 01 Student!", toastoptions);
    if (isAnyPremium)
      return toast.error("Not All Selected Options Are Free!", toastoptions);
    handleClosePopover();
    setSubscription(true);
  };

  useEffect(() => {
    if (studentAttendance.status === 200) {
      toast.success(studentAttendance.message, toastoptions);
      dispatch(emptyStudentAttendance());
    }
  }, [studentAttendance]);

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Student Details | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading="Student"
        links={[{ name: "Student", href: "" }]}
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <FormControl>
                    <AutoCompleteCustom
                      size="small"
                      sx={{ width: 130, mr: 2, mb: { xs: 1, md: 0 } }}
                      loading={filterLoader}
                      options={_.map(batches?.data, (ev) => {
                        return {
                          label: `${ev.batchTypeName}`,
                          value: ev.id,
                        };
                      })}
                      value={searchBatch}
                      onChange={(event, value) => setSearchBatch(value)}
                      label="Batch"
                    />
                  </FormControl>
                  <FormControl>
                    <AutoCompleteCustom
                      size="small"
                      sx={{ width: 130, mr: 2, mb: { xs: 1, md: 0 } }}
                      loading={getALLDeptLoader}
                      options={_.map(getALLDeptData?.data, (ev) => {
                        return {
                          label: `${ev.department}`,
                          value: ev.id,
                        };
                      })}
                      value={searchDept}
                      onChange={(event, value) => setSearchDept(value)}
                      label="Department"
                    />
                  </FormControl>
                  <TextField
                    size="small"
                    sx={{ width: 130, mr: 2, mb: { xs: 1, md: 0 } }}
                    value={searchEmpCode}
                    onChange={(e) => setSearchEmpCode(e.target.value)}
                    placeholder="Emp Code"
                  />
                  <span
                    style={{
                      fontWeight: "bold",
                      verticalAlign: "middle",
                      marginLeft: "10px",
                      marginRight: "10px",
                      display: "inline-block",
                      marginTop: "5px",
                    }}
                  >
                    from:
                  </span>
                  <span className="dateHeightBatches">
                    <FormControl>
                      <TextField
                        size="small"
                        sx={{
                          width: 220,
                          mr: 2,
                          mb: { xs: 1, md: 1 },
                          height: 40,
                        }}
                        type="date"
                        name="fromDate"
                        fullWidth
                        inputProps={{
                          // min: new Date().toISOString().split("T")[0],
                          max: "9999-12-31",
                          // max: new Date(date30).toISOString().split("T")[0],
                        }}
                        // error={formik.touched.fromDate && formik.errors.fromDate}
                        {...formik.getFieldProps("fromDate")}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      verticalAlign: "middle",
                      marginLeft: "10px",
                      marginRight: "10px",
                      display: "inline-block",
                      marginTop: "5px",
                    }}
                  >
                    to:
                  </span>
                  <span className="dateHeightBatches">
                    <FormControl>
                      <TextField
                        size="small"
                        sx={{
                          width: 220,
                          mr: 2,
                          mb: { xs: 1, md: 0 },
                          height: 60,
                        }}
                        type="date"
                        name="toDate"
                        fullWidth
                        inputProps={{
                          min: addDaysToDate(formik.values.fromDate, 0),
                          max:
                            date30 &&
                            new Date(date30).toISOString().split("T")[0],
                        }}
                        // error={formik.touched.toDate && formik.errors.toDate}
                        {...formik.getFieldProps("toDate")}
                        onChange={formik.handleChange}
                        disabled={Boolean(formik.values.fromDate === "")}
                      />
                    </FormControl>
                  </span>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                    onClick={() => {
                      setIsFind(true);
                      InitialStudents({
                        pageNo: 1,
                        paginateNo: 10,
                        isFindManual: true,
                      });
                    }}
                  >
                    Filter
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                    onClick={resetFilter}
                  >
                    <AutorenewRoundedIcon />
                  </Button>
                </Box>

                <Box
                  sx={{
                    borderRadius: "40px",
                    cursor: "pointer",
                    marginLeft: "350px",
                    marginTop: "-20px",
                  }}
                  onClick={() =>
                    batchWiseStudentExcelDownloadAsync({
                      batchTypeId: searchBatch?.value || "",
                      startdate: startDate || startDateString,
                      enddate: endDate || endDateString,
                      employeeCode: searchEmpCode || "",
                      department: searchDept?.value || "",
                    })
                  }
                >
                  <img
                    src={excelDownload}
                    alt="Download Excel"
                    width="50px"
                    height="50px"
                    borderRadius="40px"
                  />
                </Box>
              </Box>
            </form>
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={batchDetailLoader}
        data={batchDetailData?.data}
        columns={studentcolumns({
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
        })}
        totalcount={batchDetailData?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <CustomImageViewer
        {...{ getUserName, getUserImage, setOpenImageViewer, openImageViewer }}
      />

      <MenuPopup
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        studentInfo={studentInfo}
        setSubscription={setSubscription}
        setMpin={setMpin}
      />
      <DialogBox
        open={Mpin}
        title="Are you sure want to change M-Pin?"
        onClose={() => setMpin(false)}
      >
        <MpinChange
          {...{
            setMpin,
            studentInfo,
          }}
        />
      </DialogBox>
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
