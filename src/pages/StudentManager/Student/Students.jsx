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
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import excelDownload from "../../../assets/excel/ExcelDownload.png";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useSettingsContext } from "components/settings";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  getStudentAsync,
  markStudentAttendanceAsync,
  getAllDepartmentAsync,
  getAllDesignationAsync,
} from "redux/async.api";
import CustomComponentLoader from "components/CustomComponentLoader";
import {
  emptyStudent,
  emptyStudentAttendance,
} from "../../../redux/slices/student.slice";
import {
  getClassWithBoardFilterAsync,
  getCheckedStudentAsync,
  coursefilterAsync,
} from "redux/filter/filter.async";
import { studentcolumns } from "./utils";
import MenuPopup from "./component/MenuPopup";
import { InputAdornment } from "@mui/material";
import { studentExcelDownloadAsync } from "redux/downloadexcel/excel.async";
import { PATH_DASHBOARD } from "routes/paths";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import SubscriptionChange from "../SubscriptionChange/SubscriptionChange";
import MpinChange from "../MpinChange/MpinChange";
import DialogBox from "components/DialogBox/index";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import CustomImageViewer from "utils/customImageViewer";
import { getStateFilterAsync } from "redux/filter/filter.async";
import { getCityAsync } from "redux/city/cities.async";
import BatchAssignDialog from "./BatchAssignDialog";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";

export default function Subject() {
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
  const [searchClass, setSearchClass] = useState([]);
  const [searchCourse, setSearchCourse] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const [getSubscription, searchGetSubscription] = useState("");
  const [getDepartment, searchGetDepartment] = useState("");
  const [getDesignation, searchGetDesignation] = useState("");
  const [getCheckedValue, setCheckedValue] = useState([]);
  const [getCheckedAll, setCheckedAll] = useState(false);
  const [Subscription, setSubscription] = useState(false);
  const [Mpin, setMpin] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const { batchLoader, batches } = useSelector((state) => state.batch);
  const { cityLoader, city } = useSelector((state) => state.city);

  const [stateVal, setStateVal] = useState({ id: "", name: "" });
  const [inputValue, setInputValue] = useState("");

  const [cityVal, setCityVal] = useState({ id: "", name: "" });
  const [inputCityValue, setCityInputValue] = useState("");

  const [designationVal, setDesignationVal] = useState({
    id: "",
    designation: "",
  });
  const [inputDesValue, setInputDesValue] = useState("");

  const [departmentVal, setDepartmentVal] = useState({
    id: "",
    department: "",
  });
  const [inputDepValue, setInputDepValue] = useState("");

  const [batchVal, setBatchVal] = useState({
    id: "",
    batchTypeName: "",
  });
  const [inputBatchValue, setInputBatchValue] = useState("");

  const {
    studentLoader,
    studentAttendanceLoader,
    students,
    studentAttendance,
    getALLDeptData,
    getALLDesigData,
    getALLDeptLoader,
    getALLDesigLoader,
  } = useSelector((state) => state.student);

  const {
    filterLoader,
    classWithBatchFilter,
    classWithBoardFilter,
    checkedStudents,
    courseFilter,
    stateFilter,
  } = useSelector((state) => state.filterInfo);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  useEffect(() => {
    dispatch(getAllDepartmentAsync({}));
    dispatch(getAllDesignationAsync({}));
    dispatch(getStateFilterAsync({}));
    dispatch(getAllBatchTypes({}));
    dispatch(
      getCityAsync({
        page: "",
        limit: "",
        city: "",
        state: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getCityAsync({
        page: "",
        limit: "",
        city: "",
        state: stateVal?.name,
      })
    );
  }, [stateVal?.name]);

  useEffect(() => {
    setCityVal({ id: "", name: "" });
    setCityInputValue("");
  }, [stateVal]);

  const InitialStudents = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        search: searchStudent,
        department: departmentVal.id,
        designation: designationVal.id,
        state: stateVal.id,
        city: cityVal.id,
        batch: batchVal.id,
        type: getSubscription,
      };
    }
    if (isReset) {
      delete payload.search;
      delete payload.type;
      delete payload.department;
      delete payload.designation;
      delete payload.state;
      delete payload.city;
      delete payload.batch;
    }
    dispatch(
      getStudentAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchCourse([]);
    setSearchClass([]);
    setSearchStudent("");
    searchGetDepartment("");
    searchGetDesignation("");
    setCityVal({ id: "", name: "" });
    setCityInputValue("");
    setStateVal({ id: "", name: "" });
    setInputValue("");
    setDesignationVal({ id: "", designation: "" });
    setInputDesValue("");
    setDepartmentVal({ id: "", designation: "" });
    setInputDepValue("");
    setBatchVal({ id: "", batchTypeName: "" });
    setInputBatchValue("");
    setCheckedValue([]);
    setCheckedAll(false);
    InitialStudents({
      pageNo: 1,
      paginateNo: 10,
      isReset: true,
    });
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

  useEffect(() => {
    dispatch(coursefilterAsync({}));
  }, []);

  // Single Checkbox Select Section
  const handleChangeCheckbox = (data) => {
    let newData = parseInt(data);
    const index = getCheckedValue.indexOf(newData);
    setCheckedAll(false);
    if (index === -1) {
      setCheckedValue([...getCheckedValue, newData]);
    } else {
      setCheckedValue(getCheckedValue.filter((item) => item != newData));
    }
  };

  //Multiple Checkbox Select Section
  const StudentList = students?.data;
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

  useEffect(() => {
    if (studentAttendance.status === 200) {
      toast.success(studentAttendance.message, toastoptions);
      dispatch(emptyStudentAttendance());
    }
  }, [studentAttendance]);

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Staff Manager | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading="Student"
        links={[
          { name: "Staff Manager", href: "" },
          { name: "Staff", href: "" },
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
                sx={{ width: 200, mr: 2, mb: { xs: 1, md: 2 } }}
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Search Staff"
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

              <FormControl sx={{ width: 130, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Autocomplete
                  value={departmentVal}
                  size="small"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setDepartmentVal(newValue);
                    } else {
                      setDepartmentVal({ id: "", department: "" });
                    }
                  }}
                  inputValue={inputDepValue}
                  onInputChange={(event, newInputValue) => {
                    setInputDepValue(newInputValue);
                  }}
                  id="department"
                  options={
                    getALLDeptData?.data !== undefined && getALLDeptData?.data
                  }
                  getOptionLabel={(des) =>
                    des.department !== undefined ? des.department : ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Department" />
                  )}
                />
              </FormControl>

              <FormControl sx={{ width: 130, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Autocomplete
                  value={designationVal}
                  size="small"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setDesignationVal(newValue);
                    } else {
                      setDesignationVal({ id: "", designation: "" });
                    }
                  }}
                  inputValue={inputDesValue}
                  onInputChange={(event, newInputValue) => {
                    setInputDesValue(newInputValue);
                  }}
                  id="designation"
                  options={
                    getALLDesigData?.data !== undefined && getALLDesigData?.data
                  }
                  getOptionLabel={(des) =>
                    des.designation !== undefined ? des.designation : ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Designation" />
                  )}
                />
              </FormControl>

              <FormControl sx={{ width: 130, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Autocomplete
                  value={stateVal}
                  size="small"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setStateVal(newValue);
                    } else {
                      setStateVal({ id: "", name: "" });
                    }
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="state"
                  options={stateFilter}
                  getOptionLabel={(state) => state.name}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                />
              </FormControl>

              <FormControl sx={{ width: 130, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Autocomplete
                  size="small"
                  value={cityVal}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setCityVal(newValue);
                    } else {
                      setCityVal({ id: "", name: "" });
                    }
                  }}
                  inputValue={inputCityValue}
                  onInputChange={(event, newInputValue) => {
                    setCityInputValue(newInputValue);
                  }}
                  id="city"
                  options={city.data || []}
                  getOptionLabel={(city) => city.name}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                />
              </FormControl>

              <FormControl sx={{ width: 130, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Autocomplete
                  value={batchVal}
                  size="small"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setBatchVal(newValue);
                    } else {
                      setBatchVal({ id: "", batchTypeName: "" });
                    }
                  }}
                  inputValue={inputBatchValue}
                  onInputChange={(event, newInputValue) => {
                    setInputBatchValue(newInputValue);
                  }}
                  id="batch"
                  options={batches?.data !== undefined && batches?.data}
                  getOptionLabel={(des) =>
                    des.batchTypeName !== undefined ? des.batchTypeName : ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Batch" />
                  )}
                />
              </FormControl>

              <FormControl sx={{ width: 90, mr: 2, mb: { xs: 1, md: 2 } }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "7px", padding: "7px" }}
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
              </FormControl>

              <FormControl sx={{ mr: 2, mb: { xs: 1, md: 2 } }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "7px", padding: "7px" }}
                  onClick={resetFilter}
                >
                  <AutorenewRoundedIcon />
                </Button>
              </FormControl>

              <FormControl sx={{ mr: 2, mb: { xs: 1, md: 2 } }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "7px", padding: "7px" }}
                  to={PATH_DASHBOARD.createStudent}
                  component={RouterLink}
                  disabled={!Boolean(modulePermit?.add)}
                >
                  <PersonAddRoundedIcon />
                </Button>
              </FormControl>

              <FormControl sx={{ mr: 2, mb: { xs: 1, md: 2 } }}>
                <Button
                  variant="contained"
                  disabled={getCheckedValue?.length === 0 ? true : false}
                  sx={{ borderRadius: "7px", padding: "7px 15px 7px 15px" }}
                  onClick={() => {
                    handleClickDialogOpen();
                  }}
                >
                  Assign Batch
                </Button>
              </FormControl>

              <FormControl sx={{ mr: 0, mt: "-12px" }}>
                <Button
                  sx={{ borderRadius: "7px" }}
                  onClick={() =>
                    studentExcelDownloadAsync({
                      classes: searchClass.value || "",
                      search: searchStudent || "",
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
                </Button>
              </FormControl>

              <FormControl sx={{ mr: 0, mt: -2 }}>
                <Button>
                  <IconButton
                    sx={{ borderRadius: "40px", cursor: "pointer" }}
                    component={RouterLink}
                    to={PATH_DASHBOARD.studentbulkupload}
                    size="large"
                  >
                    <FileUploadIcon
                      sx={{
                        width: "35px",
                        height: "35px",
                        color: "primary.main",
                      }}
                    />
                  </IconButton>
                </Button>
              </FormControl>

              {isDialogOpen && (
                <BatchAssignDialog
                  open={isDialogOpen}
                  setOpen={setIsDialogOpen}
                  studentIds={getCheckedValue}
                />
              )}
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
                sx={{ borderRadius: "40px", cursor: "pointer", mb: 2 }}
                onClick={() =>
                  studentExcelDownloadAsync({
                    classes: searchClass.value || "",
                    search: searchStudent || "",
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

              <Box>
                <IconButton
                  sx={{ borderRadius: "40px", cursor: "pointer", mb: 2 }}
                  component={RouterLink}
                  to={PATH_DASHBOARD.studentbulkupload}
                  size="large"
                >
                  <FileUploadIcon
                    sx={{
                      width: "35px",
                      height: "35px",
                      color: "primary.main",
                    }}
                  />
                </IconButton>
              </Box>
                  </Box> */}
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={studentLoader}
        data={students?.data}
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
        totalcount={students?.count}
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
        open={Subscription}
        title="Change Existing Subscription To :"
        onClose={() => setSubscription(false)}
      >
        <SubscriptionChange
          {...{
            setSubscription,
            studentInfo,
            searchStudent,
            searchClass,
            getSubscription,
            getCheckedValue,
            setCheckedValue,
            setCheckedAll,
          }}
        />
      </DialogBox>
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
