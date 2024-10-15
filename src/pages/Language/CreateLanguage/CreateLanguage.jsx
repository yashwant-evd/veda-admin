import React, { useState, useEffect } from "react";
import { Card, Grid, TextField, FormControl, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { Container, Stack, Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  addLanguageKeyValueAsync,
  getAllLanguageKeyValueAsync,
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
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";

function CreateLanguage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState([{ key: "", value: "" }]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const {
    languageLoader,
    adddLanguage,
    getLanguageLoader,
    getAllLanguage,
    getAllLang,
    getLangLoader,
    getLangKeyValueById,
  } = useSelector((state) => state?.languageData);

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllLanguageAsync(payload));
  }, []);

  useEffect(() => {
    if (adddLanguage.status === 200) {
      toast.success(adddLanguage.message, toastoptions);
      // formik.resetForm();
      dispatch(emptyLanguage());
      navigate(PATH_DASHBOARD.language);
    }
  }, [adddLanguage]);

  // useEffect(() => {
  //   if (id && getPollById) {
  //     formik.setFieldValue("title", getPollById?.data?.title);
  //     formik.setFieldValue(
  //       "fromDate",
  //       getPollById?.data?.startDate?.slice(0, 10)
  //     );
  //     formik.setFieldValue("toDate", getPollById?.data?.endDate?.slice(0, 10));
  //     formik.setFieldValue("message", getPollById?.data?.message);
  //     formik.setFieldValue("option1", getPollById?.data?.option1);
  //     formik.setFieldValue("option2", getPollById?.data?.option1);
  //     formik.setFieldValue("option3", getPollById?.data?.option1);
  //     formik.setFieldValue("option4", getPollById?.data?.option1);
  //   }
  // }, [id, getPollById]);

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const handleAddFields = () => {
    setFormFields([...formFields, { key: "", value: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...formFields];
    values.splice(index, 1);
    setFormFields(values);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload1 = {
      languageId: selectedLanguage?.value,
      keys: formFields,
    };

    dispatch(addLanguageKeyValueAsync(payload1));
  };

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Poll | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        links={[
          { name: "Language", href: PATH_DASHBOARD.language },
          { name: "Create Language" },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <FormControl>
                <AutoCompleteCustom
                  size="small"
                  sx={{ width: 130, mr: 2, mb: { xs: 1, md: 0 } }}
                  loading={getLangLoader}
                  options={_.map(getAllLang?.data, (ev) => {
                    return {
                      label: `${ev.language}`,
                      value: ev.id,
                    };
                  })}
                  value={selectedLanguage}
                  onChange={(event, value) => setSelectedLanguage(value)}
                  label="Language"
                />
              </FormControl>

              {formFields.map((field, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap="15px"
                  sx={{ width: "700px", margin: "0 auto" }}
                >
                  <TextField
                    name="key"
                    loading={languageLoader}
                    value={id ? getLangKeyValueById?.data?.key : field.key}
                    onChange={(event) => handleInputChange(index, event)}
                    label="Key"
                    variant="outlined"
                    sx={{ width: "330px", marginBottom: "20px" }}
                  />
                  <TextField
                    name="value"
                    value={id ? getLangKeyValueById?.data?.value : field.value}
                    onChange={(event) => handleInputChange(index, event)}
                    label="Value"
                    variant="outlined"
                    sx={{ width: "330px", marginBottom: "20px" }}
                  />
                  {index === formFields.length - 1 ? (
                    <IconButton
                      onClick={handleAddFields}
                      sx={{ marginBottom: "20px" }}
                    >
                      <Add />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleRemoveFields(index)}
                      sx={{ marginBottom: "20px" }}
                    >
                      <Remove />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={languageLoader}
                >
                  {/* {id ? "Update Language" : "Create Language"} */}
                  {"Create Language"}
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
