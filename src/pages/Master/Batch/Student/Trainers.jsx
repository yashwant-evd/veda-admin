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
import excelDownload from "../../../../assets/excel/ExcelDownload.png";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useSettingsContext } from "components/settings";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  getAllStudentsByBatchAsync,
  getAllEmployeeByBatchIdAsync,
} from "redux/batchWiseDetails/batchDetails.async";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import {
  emptyStudent,
  emptyStudentAttendance,
} from "redux/slices/student.slice";
import {
  getClassWithBoardFilterAsync,
  getCheckedStudentAsync,
  coursefilterAsync,
} from "redux/filter/filter.async";
import { studentcolumns } from "./utilsTrainer";
import MenuPopup from "./component/MenuPopup";
import { InputAdornment } from "@mui/material";
import {
  studentExcelDownloadAsync,
  BatchWiseEmployeeExcelDownloadAsync,
} from "redux/downloadexcel/excel.async";
import { staffTestRescheduleAsync } from "redux/batchtype/batchtype.async";
import { PATH_DASHBOARD } from "routes/paths";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import CustomImageViewer from "utils/customImageViewer";
import moment from "moment";
import RescheduleBatchDialog from "./RescheduleBatchDialog";

const SUBSCRIPTION = {
  FREE: "free",
  PREMIUM: "premium",
};

export default function Trainers({ batchinfo }) {
  const { themeStretch } = useSettingsContext();
  const [getUserName, setUserName] = useState("");
  const [getUserImage, setUserImage] = useState("");
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [studentInfo, setStudentInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchStudent, setSearchStudent] = useState("");
  const [isFind, setIsFind] = useState(false);
  const [getCheckedValue, setCheckedValue] = useState([]);
  const [getCheckedAll, setCheckedAll] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const [isTestOpen, setIsTestOpen] = useState(false);

  const {
    studentLoader,
    studentAttendanceLoader,
    students,
    studentAttendance,
  } = useSelector((state) => state.student);

  const {
    filterLoader,
    classWithBatchFilter,
    classWithBoardFilter,
    checkedStudents,
    courseFilter,
  } = useSelector((state) => state.filterInfo);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );
  const {
    batchDetailLoader,
    batchDetailData,
    batchEmployeeLoader,
    batchEmployeeData,
  } = useSelector((state) => state?.batchDetails);

  const { staffTestLoader, staffTest } = useSelector((state) => state?.batch);

  const batchRescheduleDialogOpen = () => {
    setIsTestOpen(true);
  };

  useEffect(() => {
    const payload = {
      page: paginationpage,
      limit: perPageNumber,
      batchTypeId: batchinfo?.id,
      employeeCode: "",
      type: "Trainer",
    };
    dispatch(getAllEmployeeByBatchIdAsync(payload));
  }, [paginationpage, perPageNumber]);

  const InitialStudents = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }

    if (isFind || isFindManual) {
      let payload = {
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        batchTypeId: batchinfo?.id,
        employeeCode: searchStudent,
        type: "Trainer",
      };
      dispatch(getAllEmployeeByBatchIdAsync(payload));
    }
  };

  const resetFilter = () => {
    setIsFind(false);
    // setSearchCourse([]);
    // setSearchClass([]);
    setSearchStudent("");
    setPaginationpage(1);
    setperPageNumber(10);
    let payload = {
      page: 1,
      limit: 10,
      batchTypeId: batchinfo?.id,
      employeeCode: "",
      type: "Trainer",
    };
    dispatch(getAllEmployeeByBatchIdAsync(payload));
    setCheckedValue([]);
    setCheckedAll(false);
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

  // useEffect(() => {
  //   InitialStudents({});
  // }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(coursefilterAsync({}));
    dispatch(getClassWithBoardFilterAsync({}));
  }, []);

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
  const StudentList = batchEmployeeData?.data;

  const handleCheckedAll = (data) => {
    setCheckedAll(data);
    if (data === true) {
      const ids = StudentList.map((i) => i.id);
      setCheckedValue(ids);
    } else {
      setCheckedValue([]);
    }
  };

  useEffect(() => {
    if (getCheckedValue?.length === StudentList?.length) {
      setCheckedAll(true);
    }
  }, [getCheckedValue]);

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

  const rescheduleTest = () => {
    setIsTestOpen(false);
    let payload = {
      batchId: batchinfo?.id,
      userIds: getCheckedValue,
    };
    dispatch(staffTestRescheduleAsync(payload)).then((res) => {
      if (res?.payload?.status === 200) {
        toast.success(res?.payload?.message, toastoptions);
        const payload = {
          page: paginationpage,
          limit: perPageNumber,
          batchTypeId: batchinfo?.id,
          employeeCode: "",
          type: "Trainer",
        };
        dispatch(getAllEmployeeByBatchIdAsync(payload));
        setCheckedValue([]);
      }
    });
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Staff Manager | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        links={[
          { name: "Batch", href: "" },
          { name: "Trainer", href: "" },
        ]}
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
            <Box>
              <TextField
                size="small"
                sx={{ width: 200, mr: 2, mb: { xs: 1, md: 0 } }}
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Emp Code"
                InputProps={{
                  sx: { borderRadius: "10px !important" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
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

              {/*<Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
              </Button>

              <LoadingButton
                variant="contained"
                loading={studentAttendanceLoader}
                disabled={getCheckedValue?.length === 0}
                onClick={() => {
                  batchRescheduleDialogOpen();
                }}
                sx={{ mx: 2 }}
              >
                Reschedule Batch
              </LoadingButton> */}

              {/*<LoadingButton
                variant="contained"
                loading={staffTestLoader}
                disabled={getCheckedValue?.length === 0}
                onClick={rescheduleTest}
              >
                Reschedule Test
            </LoadingButton> 

              {isTestOpen && (
                <RescheduleBatchDialog
                  open={isTestOpen}
                  setOpen={setIsTestOpen}
                  studentIds={getCheckedValue}
                  batchinfo={batchinfo}
                  page={paginationpage}
                  limit={perPageNumber}
                  setCheckedValue={setCheckedValue}
                />
              )}*/}
            </Box>
            {/*<Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ borderRadius: "40px", cursor: "pointer" }}
                onClick={() =>
                  BatchWiseEmployeeExcelDownloadAsync({
                    batchTypeId: batchinfo?.id,
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
              </Box> */}
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={batchEmployeeLoader}
        data={batchEmployeeData?.data}
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
        totalcount={batchEmployeeData?.count}
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
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
