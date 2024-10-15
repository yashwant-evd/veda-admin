import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { _initial, _validate } from "./utils";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { useNavigate, useParams } from "react-router";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { getcourseAsync } from "redux/course/course.async";
import moment from "moment";

import {
  createbatchTypesAsync,
  getBatchTypeByIdAsync,
  updatedBatchTypeByIdAsync,
  getAllTrainerDetailsAsync,
} from "redux/batchtype/batchtype.async";
import { emptybatch } from "redux/batchtype/batchtype.slice";
import { PATH_DASHBOARD } from "routes/paths";
import {
  addDaysToDate,
  generateDateFromTo,
  get30DateFromTodate,
} from "utils/generateDateFromTo";

function AddBatches() {
  const [date30, setdate30] = useState("");
  const [isDateTrue, setIsDateTrue] = useState(false);
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { courseLoader, course } = useSelector((state) => state.course);
  const { batchLoader, batchadd, batchById, batchupdate, allTrainers } =
    useSelector((state) => state.batch);

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const getCourseAsync = () => {
    dispatch(
      getcourseAsync({
        page: "",
        limit: "",
      })
    );
  };

  const onSubmit = (values) => {
    const payload = {
      batchTypeId: id,
      courseId: values.courseId,
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    if (id) {
      dispatch(updatedBatchTypeByIdAsync(payload));
    } else {
      delete payload.batchTypeId;
      dispatch(createbatchTypesAsync(payload));
      dispatch(getAllTrainerDetailsAsync());
    }
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  useEffect(() => {
    getCourseAsync();
  }, []);

  useEffect(() => {
    if (id) dispatch(getBatchTypeByIdAsync(id));
  }, [id]);

  useEffect(() => {
    if (id && batchById) {
      formik.setFieldValue("courseId", batchById.courseId);
      formik.setFieldValue("name", batchById.name);
      formik.setFieldValue("startDate", batchById?.startDate?.split(" ")[0]);
      formik.setFieldValue("endDate", batchById?.endDate?.split(" ")[0]);
    }
  }, [batchById, id]);

  useEffect(() => {
    dispatch(getAllTrainerDetailsAsync());
  }, []);

  useEffect(() => {
    if (batchadd.status === 200) {
      toast.success(batchadd.message, toastoptions);
      formik.setFieldValue("name", "");
      formik.setFieldValue("startDate", "");
      formik.setFieldValue("endDate", "");
      dispatch(emptybatch());
    }
    if (batchupdate.status === 200) {
      toast.success(batchupdate.message, toastoptions);
      navigate(PATH_DASHBOARD.batchtype);
      dispatch(emptybatch());
    }
  }, [batchadd, batchupdate]);

  const batchStartDate = formik?.values?.startDate;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const momentDate1 = moment(batchStartDate, "YYYY-MM-DD");
  const momentDate2 = moment(formattedDate, "YYYY-MM-DD");

  // if (momentDate1.isBefore(momentDate2)) {
  //   setIsDateTrue(true);
  // } else if (momentDate1.isAfter(momentDate2)) {
  //   setIsDateTrue(false);
  // } else {
  //   setIsDateTrue(false);
  // }



  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Batch | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading={id ? "Update Batch" : "Create Batch"}
        links={[
          { name: "Master", href: "" },
          {
            name: "Batch",
            href: `${PATH_DASHBOARD.batchtype}`,
          },
          { name: id ? "Update Batch" : "Create Batch" },
        ]}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <FormControl
                  fullWidth
                  disabled={courseLoader}
                  error={Boolean(
                    formik.touched.courseId && formik.errors.courseId
                  )}
                >
                  <InputLabel>
                    {courseLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Courses"
                    )}
                  </InputLabel>
                  <Select
                    label="Course"
                    name="courseId"
                    {...formik.getFieldProps("courseId")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem defaultValue value="">
                      Select Course
                    </MenuItem>
                    {course?.data?.map((ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={ev.index}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    name="name"
                    label="Batch Name"
                    fullWidth
                    {...formik.getFieldProps("name")}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    // disabled={id ? true : false}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="startDate"
                    label="Start Date"
                    style={{ color: id ? "white !important" : null }}
                    fullWidth
                    inputProps={{
                      // min: new Date().toISOString().split("T")[0],
                      // min: "2022-01-01",
                      max: "9999-12-31",
                    }}
                    {...formik.getFieldProps("startDate")}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.startDate && formik.errors.startDate
                    )}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    // disabled={id ? true : false}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="endDate"
                    label="End Date"
                    style={{ color: id ? "white !important" : null }}
                    fullWidth
                    inputProps={{
                      min: addDaysToDate(formik.values.startDate, 1),
                      max:
                        date30 && new Date(date30).toISOString().split("T")[0],
                    }}
                    {...formik.getFieldProps("endDate")}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.endDate && formik.errors.endDate
                    )}
                  />
                </FormControl>
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={batchLoader}
                >
                  {id ? "Update Batch" : "Create Batch"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddBatches;
