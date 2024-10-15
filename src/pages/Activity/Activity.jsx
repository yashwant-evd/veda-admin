import { Helmet } from "react-helmet-async";
import { Button, Container, Box, FormControl } from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllActivityAsync } from "redux/activity/activity.async";
import { getFilterAsync } from "redux/filter/student/student.async";
import { activitycolumns } from "./utils";
import _ from "lodash";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Activity() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchStudent, setSearchStudent] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const { activityLoader, activity } = useSelector((state) => state.activity);
  const { studentFilterLoader, studentFilter } = useSelector(
    (state) => state.studentFilter
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialActivity = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        search: searchStudent?.value,
      };
    }
    if (isReset) delete payload.search;
    dispatch(
      getAllActivityAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchStudent([]);
    InitialActivity({
      pageNo: 1,
      paginateNo: 10,
      isReset: true,
    });
  };

  // PAGINATION
  const handlePageChange = (page) => {
    setPaginationpage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setperPageNumber(newPerPage);
  };

  useEffect(() => {
    InitialActivity({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(getFilterAsync({}));
  }, []);

  const fetchDataAndConvertToXLSX = () => {
    const data = activity?.data;

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
    link.download = "question-bank.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Activity Log | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Activity Log"
        links={[
          // { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Activity Log", href: "" },
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
                <AutoCompleteCustom
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { sm: 0 }, mt: { xs: 0.5 } }}
                  loading={studentFilterLoader}
                  options={_.map(studentFilter, (ev) => {
                    return { label: `${ev.name} (${ev.class})`, value: ev.id };
                  })}
                  value={searchStudent}
                  onChange={(event, value) => setSearchStudent(value)}
                  label="Student"
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mt: 1 }}
                onClick={() => {
                  setIsFind(true);
                  InitialActivity({
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
                sx={{ borderRadius: "7px", mr: 1, mt: 1 }}
                onClick={resetFilter}
              >
                <AutorenewRoundedIcon />
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
        loader={activityLoader}
        data={activity?.data}
        columns={activitycolumns({
          paginationpage,
        })}
        totalcount={activity?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => {
  return;
};
