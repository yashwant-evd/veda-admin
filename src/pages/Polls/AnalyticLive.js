import { Helmet } from "react-helmet-async";
import { Container, Box } from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { pollReports } from "./utils";
import {
  getAllPollsByStatusIdAsync,
  getStudentPollByPollIdAsync,
} from "redux/polls/poll.async";
import { pollReportExcelDownloadAsync } from "redux/downloadexcel/excel.async";
import excelDownload from "../../assets/excel/ExcelDownload.png";
import _ from "lodash";

export default function Poll({ pollId }) {
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [pollInfo, setPollInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);

  const { getAllReportById, getAllReportLoader } = useSelector(
    (state) => state?.pollsData
  );

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  useEffect(() => {
    const payload = {
      status: "",
      page: paginationpage,
      limit: 10,
    };

    dispatch(getAllPollsByStatusIdAsync(payload));
  }, [paginationpage]);

  useEffect(() => {
    const payload = {
      pollId: pollId,
      page: paginationpage,
      limit: 10,
    };

    dispatch(getStudentPollByPollIdAsync(payload));
  }, [paginationpage]);

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
    <Container style={{ width: "48vw" }}>
      <Helmet>
        <title>Poll | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        heading="Reports for above Poll"
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
              }}
              onClick={() =>
                pollReportExcelDownloadAsync({
                  pollId: pollId || "",
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
        loader={getAllReportLoader}
        data={getAllReportById?.data}
        columns={pollReports({
          openPopover,
          handleOpenPopover,
          setPollInfo,
          paginationpage,
        })}
        totalcount={getAllReportById?.count || 0}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
