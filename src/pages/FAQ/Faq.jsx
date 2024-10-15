import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AddIcon from "@mui/icons-material/Add";
import { PATH_DASHBOARD } from "routes/paths";
// import { _userList } from "../../../_mock/arrays";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomTable from "components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllFaqAsync } from "redux/async.api";
import { faqcolumns } from "./utils";
import MenuPopup from "./component/MenuPopup";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Subject() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [faqinfo, setFaqinfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [searchType, setSearchType] = useState("");
  const [searchQuestion, setSearchQuestion] = useState("");
  const { faqLoader, faq } = useSelector((state) => state.faq);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialCourse = () => {
    dispatch(
      getAllFaqAsync({
        page: paginationpage,
        limit: perPageNumber,
        type: searchType,
        search: searchQuestion,
      })
    );
  };

  const Reset = () => {
    setSearchType("");
    setSearchQuestion("");
    dispatch(
      getAllFaqAsync({
        page: paginationpage,
        limit: perPageNumber,
        type: "",
        search: "",
      })
    );
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
    InitialCourse();
  }, [paginationpage, perPageNumber]);

  const fetchDataAndConvertToXLSX = () => {
    const data = faq?.data;

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
    link.download = "faq.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>FAQ | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="FAQ"
        links={[
          { name: "FAQ", href: "" },
          // { name: "FAQ", href: "" },
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
              <TextField
                size="small"
                sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                value={searchQuestion}
                onChange={(e) => setSearchQuestion(e.target.value)}
                placeholder="Question"
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
              <FormControl size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  Select Type
                </InputLabel>
                <Select
                  label="Select Type"
                  size="small"
                  sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <MenuItem value="Scholarship">Scholarship</MenuItem>
                  <MenuItem value="Mentorship">Mentorship</MenuItem>
                  <MenuItem value="Help">Help</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={() => InitialCourse()}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                onClick={Reset}
              >
                <AutorenewRoundedIcon />
              </Button>
              <Button
                sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 0 } }}
                to={PATH_DASHBOARD.createfaq}
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
        loader={faqLoader}
        data={faq?.data}
        columns={faqcolumns({
          openPopover,
          handleOpenPopover,
          setFaqinfo,
          paginationpage,
        })}
        totalcount={faq?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopup
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        faqinfo={faqinfo}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
