import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "components/CustomTable";
import { boardcolumns } from "./utils";
import MenuPopupBoard from "./component/MenuPopupBoard";
// import { getboardAsync } from "redux/board/board.async";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../../assets/excel/ExcelDownload.png";

export default function Board() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [openPopover, setOpenPopover] = useState(null);
  const [boardinfo, setBoardInfo] = useState("");
  const [searchBoard, setSearchBoard] = useState("");
  const [isFind, setIsFind] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);

  const { boardLoader, boards } = useSelector((state) => state.board);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialBoard = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        search: searchBoard,
      };
    }
    if (isReset) delete payload.search;
    // dispatch(
    //   getboardAsync({
    //     page: pageNo || paginationpage,
    //     limit: paginateNo || perPageNumber,
    //     status: "all",
    //     ...payload,
    //   })
    // );
  };
  const resetFilter = () => {
    setIsFind(false);
    setSearchBoard("");
    InitialBoard({
      pageNo: 1,
      paginateNo: 10,
      status: "all",
      isReset: true,
    });
  };

  const handlePageChange = (page) => {
    setPaginationpage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setperPageNumber(newPerPage);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    InitialBoard({});
  }, [paginationpage, perPageNumber]);

  const fetchDataAndConvertToXLSX = () => {
    const data = boards?.data;

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
    link.download = "board.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title>Board | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading="Board"
        links={[{ name: "Master", href: "" }, { name: "Board" }]}
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
                value={searchBoard}
                onChange={(e) => setSearchBoard(e.target.value)}
                placeholder="Board"
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
                  InitialBoard({
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
                to={PATH_DASHBOARD.createboard}
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
        loader={boardLoader}
        data={boards?.data}
        columns={boardcolumns({
          openPopover,
          handleOpenPopover,
          setBoardInfo,
          paginationpage,
        })}
        totalcount={boards?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupBoard
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        boardinfo={boardinfo}
      />
    </Container>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
