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
import { langColumns } from "./utils";
import MenuPopupPoll from "./components/MenuPopupPoll";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptyLanguage } from "redux/language/language.slice";
import {
  getAllLanguageKeyValueAsync,
  getAllLanguageAsync,
  deleteLanguageKeyValueByIdAsync,
} from "redux/language/language.async";

import {
  pollPageValidate,
  _initialValues,
  statusOptions,
} from "./CreateLanguage/utils";
import ConfirmDialog from "../Shorts/component/DeleteShorts";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import _ from "lodash";

export default function Language() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [langInfo, setLangInfo] = useState("");
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [isFind, setIsFind] = useState(false);
  const { modulePermit } = useSelector((state) => state.menuPermission);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [searchStatus, setSearchStatus] = useState([]);

  const {
    languageLoader,
    adddLanguage,
    getLanguageLoader,
    getAllLanguage,
    getAllLang,
    getLangLoader,
    deleteLanaguageData,
  } = useSelector((state) => state?.languageData);

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
      page: paginationpage,
      limit: 10,
      language: newStatus || "",
    };
    dispatch(getAllLanguageKeyValueAsync(payload));
  };

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllLanguageAsync(payload));
  }, []);

  useEffect(() => {
    const payload = {
      page: paginationpage,
      limit: 10,
      language: "",
    };
    dispatch(getAllLanguageKeyValueAsync(payload));
  }, [paginationpage]);

  const resetFilter = () => {
    setIsFind(false);
    setSearchStatus([]);
    setPaginationpage(1);
    const payload = {
      page: 1,
      limit: 10,
      language: "",
    };
    dispatch(getAllLanguageKeyValueAsync(payload));
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
    if (deleteLanaguageData.status === 200) {
      toast.success(deleteLanaguageData.message, toastoptions);
      dispatch(emptyLanguage());
      setOpenConfirm(false);
      InitialPoll({});
    }
  }, [deleteLanaguageData]);

  return (
    <Container style={{ minWidth: "82vw" }}>
      <Helmet>
        <title>Language | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        links={[{ name: "Language", href: "" }]}
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            <AutoCompleteCustom
              size="small"
              sx={{ width: 150, mr: 2, mb: { xs: 1, md: 0 } }}
              loading={languageLoader}
              options={_.map(getAllLang?.data, (ev) => {
                return {
                  label: `${ev.language}`,
                  value: ev.id,
                };
              })}
              value={searchStatus}
              onChange={(event, value) => setSearchStatus(value)}
              label="Language"
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
              to={PATH_DASHBOARD.createLanguage}
              component={RouterLink}
              variant="contained"
              disabled={!Boolean(modulePermit?.add)}
            >
              <AddIcon />
            </Button>
          </Box>
        }
      />
      <CustomTable
        columnheight="30px"
        loader={getLanguageLoader}
        data={getAllLanguage?.data}
        columns={langColumns({
          openPopover,
          handleOpenPopover,
          setLangInfo,
          paginationpage,
        })}
        totalcount={getAllLanguage?.count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRows={false}
        expandableRowsComponent={ExpandedComponent}
      />
      <MenuPopupPoll
        openPopover={openPopover}
        handleClosePopover={handleClosePopover}
        langInfo={langInfo}
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
            loading={languageLoader}
            onClick={() =>
              dispatch(deleteLanguageKeyValueByIdAsync(langInfo.id))
            }
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
