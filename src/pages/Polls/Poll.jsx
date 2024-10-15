import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AddIcon from "@mui/icons-material/Add";
import { PATH_DASHBOARD } from "routes/paths";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { pollColumns } from "./utils";
import MenuPopupPoll from "./components/MenuPopupPoll";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptyPoll } from "redux/polls/poll.slice";
import {
  createPollAsync,
  getPollByUserIdAsync,
  getAllPollsByStatusIdAsync,
  deletePollByIdAsync,
} from "redux/polls/poll.async";
import {
  pollPageValidate,
  _initialValues,
  statusOptions,
} from "./CreatePoll/utils";
import ConfirmDialog from "../Shorts/component/DeleteShorts";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import _ from "lodash";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Poll() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [pollInfo, setPollInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [isFind, setIsFind] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [searchStatus, setSearchStatus] = useState([]);

  const {
    addPollData,
    getPollData,
    getPollsStatusData,
    getPollsStatusLoader,
    deletePollData,
    updatePollData,
    pollLoader,
  } = useSelector((state) => state?.pollsData);

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialPoll = ({
    pageNo,
    paginateNo,
    isFindManual,
    isReset,
    newStatus,
  }) => {
    const payload = {
      status: newStatus || "",
      page: pageNo || paginationpage,
      limit: 10,
    };
    dispatch(getAllPollsByStatusIdAsync(payload));
  };

  useEffect(() => {
    const payload = {
      status: searchStatus?.value || "",
      page: paginationpage,
      limit: 10,
    };

    dispatch(getAllPollsByStatusIdAsync(payload));
  }, [paginationpage]);

  const resetFilter = () => {
    setIsFind(false);
    setSearchStatus([]);
    InitialPoll({
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
    if (deletePollData.status === 200) {
      toast.success(deletePollData.message, toastoptions);
      dispatch(emptyPoll());
      setOpenConfirm(false);
      InitialPoll({});
    }
  }, [deletePollData]);

  const fetchDataAndConvertToXLSX = () => {
    const data = getPollsStatusData?.data;

    if (!data || data.length === 0) {
      console.log("No data available.");
      return;
    }

    const worksheet = utils.aoa_to_sheet([
      Object.keys(data[0]),
      ...data.map(Object.values),
    ]);

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const xlsxBuffer = write(workbook, { type: "buffer", bookType: "xlsx" });

    const blob = new Blob([xlsxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "poll.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container style={{ minWidth: "82vw" }}>
      <Helmet>
        <title>Poll | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Notice"
        links={[
          // { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Poll", href: "" },
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <AutoCompleteCustom
                size="small"
                sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                loading={getPollsStatusLoader}
                options={_.map(statusOptions, (ev) => {
                  return {
                    label: `${ev.name}`,
                    value: ev.name,
                  };
                })}
                value={searchStatus}
                onChange={(event, value) => setSearchStatus(value)}
                label="Status"
              />
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={() => {
                  setIsFind(true);
                  InitialPoll({
                    pageNo: 1,
                    paginateNo: 10,
                    isFindManual: true,
                    newStatus: searchStatus?.value,
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
              <Button
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                to={PATH_DASHBOARD.createPoll}
                component={RouterLink}
                variant="contained"
                disabled={!Boolean(modulePermit?.add)}
              >
                <AddIcon />
              </Button>
            </Box>
            {/*<Box onClick={fetchDataAndConvertToXLSX} sx={{ cursor: "pointer" }}>
              <img
                src={excelDownload}
                alt="Download Excel"
                width="50px"
                height="50px"
                borderRadius="40px"
              />
              </Box> */}
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={getPollsStatusLoader}
        data={getPollsStatusData?.data}
        columns={pollColumns({
          openPopover,
          handleOpenPopover,
          setPollInfo,
          paginationpage,
        })}
        totalcount={getPollsStatusData?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupPoll
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        pollInfo={pollInfo}
        setOpenConfirm={setOpenConfirm}
      />
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            // loading={bannerLoader}
            onClick={() => dispatch(deletePollByIdAsync(pollInfo.id))}
          >
            Delete
          </LoadingButton>
        }
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
