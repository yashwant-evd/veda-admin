import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import excelDownload from "../../../assets/excel/ExcelDownload.png";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { PATH_DASHBOARD } from "routes/paths";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { studentcolumns } from "./utils";
import MenuPopupStudent from "./component/MenuPopupStudent";
import { getAllSubjectsAsync } from "redux/subject/subject.async";
import { subjectExcelDownloadAsync } from "redux/downloadexcel/excel.async";
import {
  getSubjectFilterAsync,
  getClassWithBoardFilterAsync,
} from "redux/filter/filter.async";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import _ from "lodash";

export default function Subject() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [subjectinfo, setSubjectinfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);

  const [searchSubject, setSearchSubject] = useState([]);
  const [searchClass, setSearchClass] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const { subjectLoader, subject } = useSelector((state) => state.subject);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const {
    filterLoader,
    classWithBatchFilter,
    subjectFilter,
    classWithBoardFilter,
  } = useSelector((state) => state.filterInfo);

  const InitialSubject = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        // classes: searchClass?.value,
        search: searchSubject?.value,
      };
    }
    if (isReset) delete payload.search;
    dispatch(
      getAllSubjectsAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        status: "all",
        ...payload,
      })
    );
  };
  const resetFilter = () => {
    setIsFind(false);
    // setSearchClass([]);
    setSearchSubject([]);
    InitialSubject({
      pageNo: 1,
      paginateNo: 10,
      status: "all",
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
    InitialSubject({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(getClassWithBoardFilterAsync({}));
    dispatch(getSubjectFilterAsync({}));
  }, []);

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Subject | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading="Subject"
        links={[
          { name: "Master", href: "" },
          { name: "Subject", href: "" },
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
              {/*<FormControl>
                <Autocomplete
                  filterSelectedOptions
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, sm: 0 } }}
                  loading={filterLoader}
                  loadingText={<CustomComponentLoader padding="0 0" size={20} />}
                  value={searchClass}
                  options={_.map(classWithBoardFilter, (ev) => {
                    return {
                      label: `${ev.className} (${ev.board})`,
                      value: ev.id
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
                  </FormControl> */}
              <FormControl>
                <Autocomplete
                  filterSelectedOptions
                  size="small"
                  sx={{
                    width: 150,
                    mr: { xs: 20, sm: 2 },
                    mb: { xs: 1, sm: 0 },
                  }}
                  loading={filterLoader}
                  loadingText={
                    <CustomComponentLoader padding="0 0" size={20} />
                  }
                  value={searchSubject}
                  options={_.map(subjectFilter, (ev) => {
                    return {
                      label: `${ev.subjectName}`,
                      value: ev.subjectName,
                    };
                  })}
                  onChange={(event, value) => setSearchSubject(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Subject" />
                  )}
                  isOptionEqualToValue={useCallback(
                    (option, value) => option.value === value.value
                  )}
                />
              </FormControl>
              <Button
                sx={{ borderRadius: "7px", mr: 1 }}
                variant="contained"
                onClick={() => {
                  setIsFind(true);
                  InitialSubject({
                    pageNo: 1,
                    paginateNo: 10,
                    isFindManual: true,
                  });
                }}
              >
                Filter
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1 }}
                variant="contained"
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1 }}
                to={PATH_DASHBOARD.createsubject}
                component={RouterLink}
                variant="contained"
                disabled={!Boolean(modulePermit?.add)}
              >
                <AddIcon />
              </Button>
            </Box>
            {/*<Box
              onClick={() =>
                subjectExcelDownloadAsync({
                  search: searchSubject?.value || '',
                })
              }
              sx={{cursor:"pointer"}}
            >
              <img src={excelDownload} alt="Download Excel" width='50px' height='50px' borderRadius="40px" />
            </Box> */}
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={subjectLoader}
        data={subject?.data}
        columns={studentcolumns({
          openPopover,
          handleOpenPopover,
          setSubjectinfo,
          paginationpage,
        })}
        totalcount={subject?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupStudent
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        subjectinfo={subjectinfo}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
