import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AddIcon from "@mui/icons-material/Add";
import { PATH_DASHBOARD } from "routes/paths";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { getAllNoticeAsync, deleteNoticeAsync } from "redux/async.api";
import { noticecolumns } from "./utils";
import MenuPopupNotice from "./components/MenuPopupNotice";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptynotice } from "redux/slices/notice.slice";
import {
  getClassWithBatchFilterAsync,
  getClassWithBoardFilterAsync,
} from "redux/filter/filter.async";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import _ from "lodash";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Notice() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [noticeInfo, setNoticeinfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchClass, setSearchClass] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [isFind, setIsFind] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);

  const { noticeLoader, notices, deleteNotice } = useSelector(
    (state) => state.notice
  );

  const { filterLoader, classWithBatchFilter, classWithBoardFilter } =
    useSelector((state) => state.filterInfo);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialNotice = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        classes: searchClass?.value,
        search: searchTitle,
      };
    }
    if (isReset) delete payload.classes, delete payload.search;
    dispatch(
      getAllNoticeAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchClass([]);
    setSearchTitle("");
    InitialNotice({
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
    if (deleteNotice.status === 200) {
      toast.success(deleteNotice.message, toastoptions);
      dispatch(emptynotice());
      InitialNotice();
    }
  }, [deleteNotice]);

  useEffect(() => {
    InitialNotice({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(getClassWithBoardFilterAsync({}));
  }, []);

  const fetchDataAndConvertToXLSX = () => {
    const data = notices?.data;

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
    link.download = "notice.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Notice | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Notice"
        links={[
          // { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Notice", href: "" },
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
              <FormControl>
                <Autocomplete
                  filterSelectedOptions
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={filterLoader}
                  loadingText={
                    <CustomComponentLoader padding="0 0" size={20} />
                  }
                  value={searchClass}
                  options={_.map(classWithBoardFilter, (ev) => {
                    return {
                      label: `${ev.className} (${ev.board})`,
                      value: ev.id,
                    };
                  })}
                  onChange={(event, value) => setSearchClass(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Class" />
                  )}
                  isOptionEqualToValue={useCallback(
                    (option, value) => option.value === value.value
                  )}
                />
              </FormControl>

              <TextField
                size="small"
                sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Notice Title"
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
                  InitialNotice({
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
              <Button
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                to={PATH_DASHBOARD.createnotice}
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
        loader={noticeLoader}
        data={notices?.data}
        columns={noticecolumns({
          openPopover,
          handleOpenPopover,
          setNoticeinfo,
          paginationpage,
        })}
        totalcount={notices?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupNotice
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        noticeInfo={noticeInfo}
        paginationpage={paginationpage}
        perPageNumber={perPageNumber}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
