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
import excelDownload from "../../assets/excel/ExcelDownload.png";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useSettingsContext } from "components/settings";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import CustomComponentLoader from "components/CustomComponentLoader";
import { studentcolumns } from "./utils";
// import MenuPopup from "./component/MenuPopup";
import { InputAdornment } from "@mui/material";
import { attendanceReportDownloadAsync } from "redux/downloadexcel/excel.async";
import { PATH_DASHBOARD } from "routes/paths";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
// import SubscriptionChange from "../SubscriptionChange/SubscriptionChange";
import DialogBox from "components/DialogBox/index";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import CustomImageViewer from "utils/customImageViewer";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import { staffAttendanceListAsync } from "redux/slices/attendance/attendance.async";

export default function Subject() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [getUserName, setUserName] = useState("");
  const [getUserImage, setUserImage] = useState("");
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchStudent, setSearchStudent] = useState("");
  const [isFind, setIsFind] = useState(false);

  console.log("paginationpage..", paginationpage, perPageNumber);
  const { attendanceLoader, getAttendance } = useSelector(
    (state) => state.empAttendance
  );

  const { batchLoader, batches } = useSelector((state) => state.batch);
  const [batchVal, setBatchVal] = useState({
    id: "",
    batchTypeName: "",
  });
  const [inputBatchValue, setInputBatchValue] = useState("");

  useEffect(() => {
    dispatch(getAllBatchTypes({})).then((res) => {
      if (res?.payload?.status === 200) {
        let payload2 = {
          page: 1,
          limit: 10,
          batchId: res?.payload?.data[0]?.id,
        };
        dispatch(staffAttendanceListAsync(payload2));
      }
    });
  }, []);

  useEffect(() => {
    if (batches?.data?.length > 0) {
      const payload = {
        page: paginationpage,
        limit: 10,
        batchId: batchVal?.id ? batchVal?.id : batches?.data[0]?.id,
      };
      dispatch(staffAttendanceListAsync(payload));
    }
  }, [paginationpage, perPageNumber]);

  const resetFilter = () => {
    setPaginationpage(1);
    setperPageNumber(10);
    setBatchVal({
      id: "",
      batchTypeName: "",
    });

    const payload = {
      page: 1,
      limit: 10,
      batchId: batches?.data[0]?.id,
    };
    dispatch(staffAttendanceListAsync(payload));
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

  const filterHandler = () => {
    if (batchVal) {
      const payload = {
        page: 1,
        limit: 10,
        batchId: batchVal?.id,
      };
      dispatch(staffAttendanceListAsync(payload));
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Attendance Manager</title>
      </Helmet>

      <CustomBreadcrumbs
        links={[
          { name: "Attendance Manager", href: "" },
          { name: "Attendance", href: "" },
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControl sx={{ width: 200, mr: 2, mb: { xs: 1, md: 2 } }}>
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
                  onClick={filterHandler}
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
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <FormControl sx={{ mr: 0, mt: "-12px" }}>
                <Button
                  sx={{ borderRadius: "7px" }}
                  onClick={() =>
                    attendanceReportDownloadAsync({
                      batchId:
                        batchVal?.id == ""
                          ? batches?.data[0]?.id
                          : batchVal?.id,
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
            </Box>
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={attendanceLoader}
        data={getAttendance?.data}
        columns={studentcolumns({
          openPopover,
          handleOpenPopover,
          paginationpage,
          setUserName,
          setUserImage,
          setOpenImageViewer,
          getAttendance,
        })}
        totalcount={getAttendance?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <CustomImageViewer
        {...{ getUserName, getUserImage, setOpenImageViewer, openImageViewer }}
      />

      {/*<MenuPopup
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        studentInfo={studentInfo}
        setSubscription={setSubscription}
        setMpin={setMpin}
      /> */}
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
