import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  FormControl,
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { PATH_DASHBOARD } from "routes/paths";
import { useSettingsContext } from "components/settings";
import { getAllDoubtsAsync } from "redux/async.api";
import { getFilterAsync } from "redux/filter/subject/subject.async";
import { doubtscolumns } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import MenuPopupEvents from "./componenets/MenuPopup";
import CustomTable from "components/CustomTable";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import _ from "lodash";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Doubts() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  const [openPopover, setOpenPopover] = useState(null);
  const [replyinfo, setreplyinfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchSubject, setSearchSubject] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const { doubts, doubtsLoader } = useSelector((state) => state.doubts);
  const { subjectfilterLoader, subjectFilter } = useSelector(
    (state) => state.subjectFilter
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialDoubtAsync = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        subject: searchSubject?.value,
      };
    }
    if (isReset) delete payload.subject;
    dispatch(
      getAllDoubtsAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  const resetFilter = () => {
    setIsFind(false);
    setSearchSubject();
    InitialDoubtAsync({
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
    InitialDoubtAsync({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(getFilterAsync({}));
  }, []);

  const fetchDataAndConvertToXLSX = () => {
    const data = doubts?.data;

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
    link.download = "doubts.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Doubts | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Doubts"
        links={[
          // { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Doubts", href: "" },
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
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={subjectfilterLoader}
                  loadingText={
                    <CustomComponentLoader padding="0 0" size={20} />
                  }
                  value={searchSubject}
                  options={_.map(subjectFilter, (ev) => {
                    return {
                      label: `${ev.subjectName} (${ev.class})`,
                      value: ev.id,
                    };
                  })}
                  onChange={(event, value) => setSearchSubject(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Subject" />
                  )}
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={() => {
                  setIsFind(true);
                  InitialDoubtAsync({
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
        loader={doubtsLoader}
        data={doubts?.data}
        columns={doubtscolumns({
          openPopover,
          handleOpenPopover,
          setreplyinfo,
          paginationpage,
        })}
        totalcount={doubts?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupEvents
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        replyinfo={replyinfo}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
