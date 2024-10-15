import { Helmet } from "react-helmet-async";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { batchColumns } from "./utils";
import { getTestReportsByUserIdAsync } from "redux/batchWiseDetails/batchDetails.async";
import {
  TestReportsByUserIdExcelDownloadAsync,
  TestReportsByBatchExcelDownloadAsync,
} from "redux/downloadexcel/excel.async";
import excelDownload from "../../assets/excel/ExcelDownload.png";
import _ from "lodash";
import MenuPopupNotice from "./components/MenuPopupReport";
import { useSettingsContext } from "components/settings";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

export default function TestReports({ studentId, studentInfo }) {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const [openPopover, setOpenPopover] = useState(null);
  const [reportInfo, setReportInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [getType, setGetType] = useState("");

  const {
    batchDetailLoader,
    batchDetailData,
    getTetstReportByIdLoader,
    getTetstReportByIdData,
  } = useSelector((state) => state?.batchDetails);

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  useEffect(() => {
    const payload = {
      page: paginationpage,
      limit: 10,
      type: getType,
      status: "",
      studentId: studentId || "",
      batchId: studentInfo?.batchNameId || "",
    };
    dispatch(getTestReportsByUserIdAsync(payload));
  }, [paginationpage, getType]);

  // useEffect(() => {
  //   const payload = {
  //     pollId: pollId,
  //     page: paginationpage,
  //     limit: 10,
  //   };

  //   dispatch(getStudentPollByPollIdAsync(payload));
  // }, [paginationpage]);

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

  const handleChangeTestType = (ev) => {
    setGetType(ev?.target?.value);
  };

  const hanldleFilter = () => {
    const payload = {
      page: paginationpage,
      limit: 10,
      type: getType,
      status: "",
      studentId: studentId || "",
      batchId: studentInfo?.batchNameId || "",
    };
    dispatch(getTestReportsByUserIdAsync(payload));
  };

  const resetFilter = () => {
    setGetType("");
    const payload = {
      page: paginationpage,
      limit: 10,
      type: getType,
      status: "",
      studentId: studentId || "",
      batchId: studentInfo?.batchNameId || "",
    };
    dispatch(getTestReportsByUserIdAsync(payload));
  };

  return (
    <Container maxWidth={themeStretch ? "false" : false}>
      <Helmet>
        <title>Report | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        heading="Test Reports"
        links={
          [
            // { name: "Dashboard", href: PATH_DASHBOARD.root },
            // { name: "Poll", href: "" },
          ]
        }
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <FormControl size="small" sx={{ width: 200, mt: 3 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  value={getType}
                  onChange={handleChangeTestType}
                >
                  {[
                    { id: "1", name: "Final Test", value: "Final_Test" },
                    { id: "2", name: "Video Test", value: "Video Test" },
                  ].map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              {/*<Button
                variant="contained"
                onClick={hanldleFilter}
                sx={{
                  mt: 3,
                  mx: 3,
                  width: "150px",
                  height: "41px",
                }}
              >
                Filter
              </Button> */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "7px",
                  mr: 1,
                  mt: 3,
                  mx: 3,
                  mb: { xs: 1, md: 0 },
                  height: "41px",
                  width: "80px",
                }}
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
              </Button>
            </Box>
            <Box
              sx={{
                borderRadius: "40px",
                cursor: "pointer",
                marginLeft: "90%",
              }}
              onClick={() =>
                TestReportsByUserIdExcelDownloadAsync({
                  type: getType,
                  status: "",
                  studentId: studentId,
                  batchId: studentInfo?.batchNameId,
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
        }
      />
      <CustomTable
        columnheight="30px"
        loader={getTetstReportByIdLoader}
        data={getTetstReportByIdData?.data}
        columns={batchColumns({
          openPopover,
          handleOpenPopover,
          setReportInfo,
          paginationpage,
        })}
        totalcount={getTetstReportByIdData?.count || 0}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupNotice
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        reportInfo={getTetstReportByIdData}
        paginationpage={paginationpage}
        perPageNumber={perPageNumber}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
