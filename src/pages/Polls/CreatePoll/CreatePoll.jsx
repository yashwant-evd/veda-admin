import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TextField,
  FormControl,
} from "@mui/material";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { Container, Stack, Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  createPollAsync,
  getPollByUserIdAsync,
  getAllPollsByStatusIdAsync,
  updatePollByIdAsync,
  getPollByIdAsync,
} from "redux/polls/poll.async";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { pollPageValidate, _initialValues } from "./utils";
import { GenerateBase64 } from "utils/convertToBase64";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { PATH_DASHBOARD } from "routes/paths";
import { emptyPoll } from "redux/polls/poll.slice";
import "../styles.css";
import {
  addDaysToDate,
} from "utils/generateDateFromTo";
function Poll() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date30, setdate30] = useState();
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const {
    addPollData,
    getPollData,
    getPollsStatusData,
    updatePollData,
    getPollById,
    pollLoader,
  } = useSelector((state) => state?.pollsData);

  const onSubmit = async (values) => {
    const startmomentDate = moment(values?.fromDate);
    const endmomentDate = moment(values?.toDate);

    const startDate = startmomentDate.format("YYYY-MM-DDTHH:mm:ss");
    const endDate = endmomentDate.format("YYYY-MM-DDTHH:mm:ss");

    const payload = {
      Id: id,
      title: values?.title,
      message: values?.message,
      startDate: startDate,
      endDate: endDate,
      option1: values?.option1,
      option2: values?.option2,
      option3: values?.option3 || "",
      option4: values?.option4 || "",
    };

    if (id) {
      dispatch(updatePollByIdAsync(payload));
    } else {
      delete payload.Id;
      dispatch(createPollAsync(payload));
    }
  };
  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: pollPageValidate,
  });

  useEffect(() => {
    if (id) {
      dispatch(getPollByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (addPollData.status === 200) {
      toast.success(addPollData.message, toastoptions);
      formik.resetForm();
      dispatch(emptyPoll());
      navigate(PATH_DASHBOARD.poll);
    }
    if (updatePollData.status === 200) {
      toast.success(updatePollData.message, toastoptions);
      formik.resetForm();
      dispatch(emptyPoll());
      navigate(PATH_DASHBOARD.poll);
    }
  }, [addPollData, updatePollData]);

  useEffect(() => {
    if (id && getPollById) {
      formik.setFieldValue("title", getPollById?.data?.title);
      formik.setFieldValue(
        "fromDate",
        getPollById?.data?.startDate?.slice(0, 10)
      );
      formik.setFieldValue("toDate", getPollById?.data?.endDate?.slice(0, 10));
      formik.setFieldValue("message", getPollById?.data?.message);
      formik.setFieldValue("option1", getPollById?.data?.option1);
      formik.setFieldValue("option2", getPollById?.data?.option2);
      formik.setFieldValue("option3", getPollById?.data?.option3);
      formik.setFieldValue("option4", getPollById?.data?.option4);
    }
  }, [id, getPollById]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Poll | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        links={[
          { name: "Poll", href: PATH_DASHBOARD.poll },
          { name: id ? "Update Pole" : "Create Pole" },
        ]}
      />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <FormControl style={{ marginRight: "10px", width: "30%" }}>
                <TextField
                  name="title"
                  // label="Title"
                  label={
                    pollLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      " Title"
                    )
                  }
                  sx={{ mr: 2 }}
                  {...formik.getFieldProps("title")}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.title && formik.errors.title}
                />
              </FormControl>
              <span
                style={{
                  fontWeight: "bold",
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  marginRight: "10px",
                  display: "inline-block",
                  marginTop: "14px",
                }}
              >
                from:
              </span>
              <span className="dateHeight">
                <FormControl>
                  <TextField
                    size="small"
                    sx={{ width: 220, mr: 2, mb: { xs: 1, md: 1 }, height: 60 }}
                    type="date"
                    name="fromDate"
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                      max: "9999-12-31",
                      // max: new Date(date30).toISOString().split("T")[0],
                    }}
                    error={formik.touched.fromDate && formik.errors.fromDate}
                    {...formik.getFieldProps("fromDate")}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  marginRight: "10px",
                  display: "inline-block",
                  marginTop: "14px",
                }}
              >
                to:
              </span>
              <span className="dateHeight">
                <FormControl>
                  <TextField
                    size="small"
                    sx={{ width: 220, mr: 2, mb: { xs: 1, md: 0 }, height: 60 }}
                    type="date"
                    name="toDate"
                    fullWidth
                    inputProps={{
                      min: addDaysToDate(formik.values.fromDate, 0),
                      max:
                        date30 && new Date(date30).toISOString().split("T")[0],
                    }}
                    error={formik.touched.toDate && formik.errors.toDate}
                    {...formik.getFieldProps("toDate")}
                    onChange={formik.handleChange}
                    disabled={Boolean(formik.values.fromDate === "")}
                  />
                </FormControl>
              </span>
              <FormControl
                style={{
                  width: "81%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <TextField
                  name="message"
                  label="Message"
                  {...formik.getFieldProps("message")}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.message && formik.errors.message}
                />
              </FormControl>

              <FormControl
                style={{ marginRight: "10px", width: "20%", marginTop: "10px" }}
              >
                <TextField
                  name="option1"
                  label="Option 1"
                  sx={{ mr: 2 }}
                  {...formik.getFieldProps("option1")}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.option1 && formik.errors.option1}
                />
              </FormControl>

              <FormControl
                style={{ marginRight: "10px", width: "20%", marginTop: "10px" }}
              >
                <TextField
                  name="option2"
                  label="Option 2"
                  sx={{ mr: 2 }}
                  {...formik.getFieldProps("option2")}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.option2 && formik.errors.option2}
                />
              </FormControl>

              <FormControl
                style={{ marginRight: "10px", width: "20%", marginTop: "10px" }}
              >
                <TextField
                  name="option3"
                  label="Option 3"
                  sx={{ mr: 2 }}
                  {...formik.getFieldProps("option3")}
                  onChange={formik.handleChange}
                  fullWidth
                  // error={formik.touched.option3 && formik.errors.option3}
                />
              </FormControl>

              <FormControl style={{ width: "20%", marginTop: "10px" }}>
                <TextField
                  name="option4"
                  label="Option 4"
                  sx={{ mr: 2 }}
                  {...formik.getFieldProps("option4")}
                  onChange={formik.handleChange}
                  // fullWidth
                  // error={formik.touched.option4 && formik.errors.option4}
                />
              </FormControl>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={pollLoader}
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

export default Poll;
