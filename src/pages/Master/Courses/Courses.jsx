import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { PATH_DASHBOARD } from "routes/paths";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { coursecolumns } from "./utils";
import MenuPopupCourse from "./component/MenuPopupCourse";
import { getcourseAsync } from "redux/course/course.async";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../../assets/excel/ExcelDownload.png";

export default function Course() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [courseinfo, setCourseInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchCourse, setSearchCourse] = useState("");
  const [isFind, setIsFind] = useState(false);
  const { courseLoader, course } = useSelector((state) => state.course);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialCourses = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        search: searchCourse,
      };
    }
    if (isReset) delete payload.search;
    dispatch(
      getcourseAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        status: "all",
        ...payload,
      })
    );
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchCourse("");
    InitialCourses({
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
    InitialCourses({});
  }, [paginationpage, perPageNumber]);

  console.log("course?.data", course?.data);

  const fetchDataAndConvertToXLSX = () => {
    const data = course?.data;
    
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
    link.download = "course.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Course | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Course"
        links={[{ name: "Master", href: "" }, { name: "Course" }]}
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
                sx={{ width: 150, mr: { xs: 20, sm: 2 }, mb: { xs: 1, sm: 0 } }}
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                placeholder="Course"
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
                sx={{ borderRadius: "7px", mr: 1 }}
                onClick={() => {
                  setIsFind(true);
                  InitialCourses({
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
                sx={{ borderRadius: "7px", mr: 1 }}
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1 }}
                to={PATH_DASHBOARD.createcourse}
                component={RouterLink}
                variant="contained"
                disabled={!Boolean(modulePermit?.add)}
              >
                <AddIcon />
              </Button>
            </Box>
            {/* <Box onClick={fetchDataAndConvertToXLSX} sx={{ cursor: "pointer" }}>
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
        loader={courseLoader}
        data={course?.data}
        columns={coursecolumns({
          openPopover,
          handleOpenPopover,
          setCourseInfo,
          paginationpage,
        })}
        totalcount={course?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupCourse
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        courseinfo={courseinfo}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => {
  return;
};
