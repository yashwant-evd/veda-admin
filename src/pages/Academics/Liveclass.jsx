import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

import { Button, Container, FormControl, Box } from "@mui/material";
import { PATH_DASHBOARD } from "routes/paths";
import Iconify from "components/iconify";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLiveEventAsync,
  deleteLiveEventAsync,
} from "redux/liveclass/liveclass.async";
import { getAllStaffFilterAsync } from "redux/filter/filter.async";
import { useEffect, useState } from "react";
import CustomTable from "components/CustomTable";
import { liveclasscolumns } from "./utils";
import MenuPopup from "./component/MenuPopup";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptyliveclass } from "redux/liveclass/liveclass.slice";
import { LoadingButton } from "@mui/lab";
import ConfirmDialog from "components/confirm-dialog/ConfirmDialog";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import _ from "lodash";
import { capitalize } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { write, writeFile, utils } from "xlsx";
import excelDownload from "../../assets/excel/ExcelDownload.png";

export default function Liveclass() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [openPopover, setOpenPopover] = useState(null);
  const [liveclassinfo, setliveclassInfo] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  const [searchStaff, setSearchStaff] = useState([]);
  const [searchRoles, setSearchRoles] = useState([]);

  const [isFind, setIsFind] = useState(false);

  const { modulePermit } = useSelector((state) => state.menuPermission);
  const { liveclassLoader, liveclass, liveclassdelete } = useSelector(
    (state) => state.liveclass
  );
  const { filterLoader, allStaff } = useSelector((state) => state.filterInfo);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const InitialLiveClass = ({ pageNo, paginateNo, isFindManual, isReset }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {
        teacherId: searchStaff?.value,
      };
    }
    if (isReset) {
      delete payload.teacherId;
    }
    dispatch(
      getAllLiveEventAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };
  const resetFilter = () => {
    setIsFind(false);
    setSearchStaff([]);
    InitialLiveClass({
      pageNo: 1,
      paginateNo: 10,
      isReset: true,
    });
  };

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
    InitialLiveClass({});
  }, [paginationpage, perPageNumber]);

  useEffect(() => {
    dispatch(getAllStaffFilterAsync({}));
  }, []);

  useEffect(() => {
    if (liveclassdelete.status === 200) {
      toast.success(liveclassdelete.message, toastoptions);
      dispatch(emptyliveclass());
      setOpenConfirm(false);
      InitialLiveClass({});
    }
  }, [liveclassdelete]);

  const fetchDataAndConvertToXLSX = () => {
    const data = liveclass?.data;

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
    link.download = "liveclass.xlsx";
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Container maxWidth={themeStretch ? "lg" : false}>
        <Helmet>
          <title>Live Class | {`${tabTitle}`}</title>
        </Helmet>

        <CustomBreadcrumbs
          // heading=" Live Class"
          links={[
            // { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Academic", href: "" },
            { name: "Live Class" },
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
                    sx={{
                      width: 150,
                      mr: { xs: 20, sm: 2 },
                      mb: { xs: 1, sm: 0 },
                    }}
                    loading={filterLoader}
                    options={_.map(allStaff, (ev) => {
                      return {
                        label: `${ev.name} (${_?.capitalize?.(ev.department)})`,
                        value: ev.id,
                      };
                    })}
                    value={searchStaff}
                    onChange={(event, value) => setSearchStaff(value)}
                    label="Staff"
                  />
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "7px", mr: 1 }}
                  onClick={() => {
                    setIsFind(true);
                    InitialLiveClass({
                      pageNo: 1,
                      paginateNo: 10,
                      isFindManual: true,
                    });
                  }}
                >
                  {" "}
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
                  to={PATH_DASHBOARD.createlive}
                  component={RouterLink}
                  variant="contained"
                  disabled={!Boolean(modulePermit?.add)}
                >
                  <AddIcon />
                </Button>
              </Box>
              {/*<Box
                onClick={fetchDataAndConvertToXLSX}
                sx={{ cursor: "pointer" }}
              >
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
          columnheight="60px"
          loader={liveclassLoader}
          data={liveclass?.data}
          columns={liveclasscolumns({
            openPopover,
            handleOpenPopover,
            setliveclassInfo,
            paginationpage,
          })}
          totalcount={liveclass?.count}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          expandableRows={false}
          expandableRowsComponent={ExpandedComponent}
        />
        <MenuPopup
          openPopover={openPopover}
          handleClosePopover={handleClosePopover}
          liveclassinfo={liveclassinfo}
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
              loading={liveclassLoader}
              onClick={() => dispatch(deleteLiveEventAsync(liveclassinfo.id))}
            >
              Delete
            </LoadingButton>
          }
        />
      </Container>
    </>
  );
}

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
