import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import CustomTable from "components/CustomTable";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { Container } from "@mui/system";
import { Grid, Box, Button, Card, Paper, Typography } from "@mui/material";
import { useSettingsContext } from "components/settings";
import UploadBox from "components/CustomUploads/UploadBox";
import { PATH_DASHBOARD } from "routes/paths";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { _initial, _validate } from "./validation";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/material/styles";
import { Bulkcolumns } from "./utils";
import {
  bulkquestionInAsync,
  bulkquestionOutAsync,
  bulkuploadquestionAsync,
  getAllBulkFilesAsync,
} from "redux/questionbank/questionbank.async";

export default function QuestionBulkUpload() {
  const dispatch = useDispatch();
  const [FileError, setFileError] = useState(false);
  const { themeStretch } = useSettingsContext();
  const [paginationpage, setPaginationpage] = useState(1);
  const [perPageNumber, setperPageNumber] = useState(10);
  const [isFind, setIsFind] = useState(false);

  const { questionBankLoader, qbbulkLoader, bulkOut, bulkIn, bulkFiles } =
    useSelector((state) => state.questionbank);
  const tabTitle = useSelector((state) => state?.admin?.adminSetting?.siteTitle);

  const InitialBulkQuestions = ({
    pageNo,
    paginateNo,
    isFindManual,
    isReset,
  }) => {
    if (pageNo && paginateNo) {
      setPaginationpage(pageNo);
      setperPageNumber(paginateNo);
    }
    let payload = {};
    if (isFind || isFindManual) {
      payload = {};
    }
    if (isReset) delete payload.classes;
    dispatch(
      getAllBulkFilesAsync({
        page: pageNo || paginationpage,
        limit: paginateNo || perPageNumber,
        ...payload,
      })
    );
  };

  const handleDrop = (acceptedFiles) => {
    var file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      if (!file.name.includes("docx")) {
        setFileError(true);
        return;
      } else {
        setFileError(false);
      }
      formik.setFieldValue("file", [newFile]);
    }
  };

  const onSubmit = async (values) => {
    const payload = new FormData();
    payload.set("file", values.file[0]);
    dispatch(bulkuploadquestionAsync(payload)).then(() => {
      formik.resetForm();
      InitialBulkQuestions({});
    });
    // dispatch(bulkquestionOutAsync(payload)).then((evv) => {
    //   dispatch(bulkquestionInAsync(evv.payload)).then(() => {
    //     formik.resetForm();
    //     InitialBulkQuestions({});
    //   });
    // });
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  const handlePerRowsChange = async (newPerPage, page) => {
    setperPageNumber(newPerPage);
  };
  const handlePageChange = (page) => {
    setPaginationpage(page);
  };

  useEffect(() => {
    InitialBulkQuestions({});
  }, [paginationpage, perPageNumber]);

  return (
    <Container maxWidth={themeStretch ? false : false}>
      <Helmet>
        <title> Question Bulk Upload | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading=" Upload Bulk Question"
        links={[
          { name: "Question Bank", href: "" },
          { name: "Upload Bulk Question" },
        ]}
      />
      <Card sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: 2,
              mb: 1,
            }}
          >
            <Box sx={{ minWidth: '700px', mb: { xs: 1, md: 1 } }}>
              <UploadBox
                otherFile={true}
                height={40}
                name="file"
                label=" Word File"
                accept={{
                  "file/*": [],
                }}
                onDrop={handleDrop}
                file={formik.values.file[0]}
                error={Boolean(formik.touched.file && formik.errors.file)}
              />
              {FileError && (
                <Paper
                  variant="outlined"
                  sx={{
                    py: 1,
                    px: 2,
                    mt: 3,
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                    borderColor: (theme) =>
                      alpha(theme.palette.error.main, 0.24),
                  }}
                >
                  <Box sx={{ my: 1 }}>
                    <Typography variant="subtitle2" noWrap></Typography>

                    <Box component="span" sx={{ typography: "caption" }}>
                      File type must be microsoft word
                    </Box>
                  </Box>
                </Paper>
              )}
            </Box>
            <LoadingButton
              sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 1 } }}
              type="submit"
              variant="contained"
              loading={qbbulkLoader}
            >
              Upload Bulk Question
            </LoadingButton>
            <Button
              sx={{ borderRadius: "7px", mr: 1, mb: { xs: 1, md: 1 } }}
              variant="contained"
              onClick={() =>
                window.open(
                  process.env.REACT_APP_QUESTION_BULK_FILE,
                  "_blank",
                  "noreferrer"
                )
              }
            >
              Download Demo File{" "}
            </Button>
          </Box>
        </form>
        <CustomTable
          columnheight="30px"
          loader={questionBankLoader}
          data={bulkFiles?.data}
          columns={Bulkcolumns({
            paginationpage,
          })}
          totalcount={bulkFiles?.count}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          expandableRows={false}
        />
      </Card>
    </Container>
  );
}
