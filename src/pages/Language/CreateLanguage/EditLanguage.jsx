import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { Container, Stack, Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLanguageAsync,
  getLanguageKeyValueByIdAsync,
  updateLanguageKeyValueByIdAsync,
} from "redux/language/language.async";

import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { pollPageValidate, _initialValues } from "./utils";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { PATH_DASHBOARD } from "routes/paths";
import { emptyLanguage } from "redux/language/language.slice";
import "../styles.css";

function CreateLanguage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );
  const { updateLangKeyValueById } = useSelector(
    (state) => state?.languageData
  );

  const { languageLoader, getAllLang, getLangLoader, getLangKeyValueById } =
    useSelector((state) => state?.languageData);

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllLanguageAsync(payload));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getLanguageKeyValueByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && getLangKeyValueById) {
      formik.setFieldValue("lang", getLangKeyValueById?.data?.languageId);
      formik.setFieldValue("key", getLangKeyValueById?.data?.key);
      formik.setFieldValue("value", getLangKeyValueById?.data?.value);
    }
  }, [id, getLangKeyValueById]);

  const onSubmit = async (values) => {
    const payload = {
      ID: getLangKeyValueById?.data?.id,
      languageId: values.lang,
      key: values?.key,
      value: values?.value,
    };
    dispatch(updateLanguageKeyValueByIdAsync(payload));
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: pollPageValidate,
  });

  useEffect(() => {
    if (updateLangKeyValueById.status === 200) {
      toast.success(updateLangKeyValueById.message, toastoptions);
      formik.resetForm();
      dispatch(emptyLanguage());
      navigate(PATH_DASHBOARD.language);
    }
  }, [updateLangKeyValueById]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Language | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        links={[
          { name: "Language", href: PATH_DASHBOARD.language },
          { name: "Update Language" },
        ]}
      />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                display="flex"
                alignItems="center"
                gap="15px"
                sx={{ minWidth: "600px", margin: "0 auto" }}
              >
                <FormControl
                  // fullWidth
                  style={{
                    width: "20%",
                    marginTop: "10px",
                    marginBottom: "40px",
                  }}
                  disabled={getLangLoader}
                  error={Boolean(formik.touched.lang && formik.errors.lang)}
                >
                  <InputLabel>
                    {getLangLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Language"
                    )}
                  </InputLabel>
                  <Select
                    label="Language"
                    name="lang"
                    {...formik.getFieldProps("lang")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem defaultValue value="">
                      Language
                    </MenuItem>
                    {getAllLang?.data?.map((ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={ev.id}>
                          {ev.language}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl
                  style={{
                    marginRight: "10px",
                    width: "25%",
                    marginTop: "10px",
                    marginBottom: "40px",
                  }}
                >
                  <TextField
                    name="key"
                    label="Key"
                    sx={{ mr: 2 }}
                    {...formik.getFieldProps("key")}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.key && formik.errors.key}
                  />
                </FormControl>
                <FormControl
                  style={{
                    marginRight: "10px",
                    width: "25%",
                    marginTop: "10px",
                    marginBottom: "40px",
                  }}
                >
                  <TextField
                    name="value"
                    label="Value"
                    sx={{ mr: 2 }}
                    {...formik.getFieldProps("value")}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.value && formik.errors.value}
                  />
                </FormControl>
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={languageLoader}
                  disabled={formik.isSubmitting}
                >
                  {id ? "Update Pole" : "Create Pole"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateLanguage;
