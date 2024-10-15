import { Helmet } from "react-helmet-async";
import { Container, Box } from "@mui/material";
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

export default function TestReports({ studentId }) {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const [openPopover, setOpenPopover] = useState(null);
  const [reportInfo, setReportInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);

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
      type: "test",
      status: "",
      studentId: studentId || "",
    };
    dispatch(getTestReportsByUserIdAsync(payload));
  }, [paginationpage]);

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
            <Box
              sx={{
                borderRadius: "40px",
                cursor: "pointer",
                marginLeft: "90%",
                // zIndex: "87787"
              }}
              onClick={() =>
                TestReportsByUserIdExcelDownloadAsync({
                  type: "test",
                  status: "",
                  studentId: studentId,
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
