import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import {
  Card,
  Grid,
  MenuItem,
  TextField,
  Box,
  Container,
  Stack
} from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import {
  _initial,
  _initialValues,
  _time,
  _type,
  _validate,
  _validation
} from "./utils";
import { useFormik } from "formik";
import {
  createLiveEventAsync,
  getLiveEventByIdAsync,
  updateLiveEventByIdAsync,
  getSubjectByOnlyBatchTypeIdAsync,
  getChapterByOnlySubjectIdAsync,
  getAllMentorTeacherAsync
} from "redux/liveclass/liveclass.async";
import { useSelector, useDispatch } from "react-redux";
import { toastoptions } from "utils/toastoptions";
import { toast } from "react-hot-toast";
import { emptyliveclass } from "redux/liveclass/liveclass.slice";
import { useNavigate, useParams } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";
import SelectMenuItem from "components/SelectMenuItem/index";
import _ from "lodash";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";

export default function CreateLiveClass() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );
  const { batchLoader, batches } = useSelector((state) => state.batch);
  const { userinfo } = useSelector((state) => state.userinfo);
  const {
    MentorTeacherLoader,
    allStaffMentorTeacher,
    liveclassLoader,
    liveclassadd,
    liveclassId,
    liveclassUpdate,
    liveclassSubjectId,
    liveclassChapterId
  } = useSelector((state) => state.liveclass);

  const onSubmit = (values) => {
    const selectedDateTime = new Date(values.attemptBy);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      toast.error(
        "The selected date and time is earlier than the current date and time.",
        toastoptions
      );
      return;
    }

    const payload = {
      eventId: id,
      batchTypeId: values.batchTypeId.value,
      subjectId: values.subjectId.value,
      chapterId: values.chapterId.value,
      teacherId: values.teacherId.value,
      type: values.type,
      attemptBy: `${values.attemptBy}:00`,
      time: values.time
    };
    if (id) {
      dispatch(updateLiveEventByIdAsync(payload));
    } else {
      delete payload.eventId;
      dispatch(createLiveEventAsync(payload));
    }
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate
  }); // FOMRIK

  useEffect(() => {
    dispatch(getAllBatchTypes({}));
    dispatch(getAllMentorTeacherAsync({}));
  }, []);

  useEffect(() => {
    if (formik.values?.batchTypeId?.value) {
      dispatch(
        getSubjectByOnlyBatchTypeIdAsync({
          batchTypeId: formik.values?.batchTypeId?.value
        })
      );
    }
  }, [formik.values.batchTypeId]);

  useEffect(() => {
    if (formik.values.subjectId) {
      dispatch(
        getChapterByOnlySubjectIdAsync({
          subjectId: formik.values?.subjectId?.value
        })
      );
    }
  }, [formik.values.subjectId]);

  useEffect(() => {
    if (id) dispatch(getLiveEventByIdAsync(id));
  }, [id]);

  useEffect(() => {
    if (id && liveclassId) {
      formik.setFieldValue("batchTypeId", {
        label: liveclassId?.batchType,
        value: liveclassId?.batchTypeId
      });

      formik.setFieldValue("subjectId", {
        label: liveclassId?.subject,
        value: liveclassId?.subjectId
      });

      formik.setFieldValue("chapterId", {
        label: liveclassId?.chapter,
        value: liveclassId?.chapterId
      });
      formik.setFieldValue("zoomApiKey", liveclassId?.zoomApiKey);
      formik.setFieldValue("zoomApiSecret", liveclassId?.zoomApiSecret);
      formik.setFieldValue("meetingNumber", liveclassId?.meetingNumber);
      formik.setFieldValue("password", liveclassId?.password);
      formik.setFieldValue("type", liveclassId?.type);

      formik.setFieldValue("teacherId", {
        label: liveclassId?.teacherName,
        value: liveclassId?.teacherId
      });

      if (liveclassId?.attemptBy) {
        const attempt = liveclassId?.attemptBy.split(":");
        formik.setFieldValue("attemptBy", `${attempt[0]}:${attempt[1]}`);
      }
      formik.setFieldValue("time", liveclassId?.time);
    }
  }, [liveclassId, id]);

  useEffect(() => {
    if (liveclassadd.status === 200) {
      toast.success(liveclassadd.message, toastoptions);
      dispatch(emptyliveclass());
      formik.resetForm();
      navigate(PATH_DASHBOARD.liveclass);
    }
    if (liveclassUpdate.status === 200) {
      toast.success(liveclassUpdate.message, toastoptions);
      dispatch(emptyliveclass());
      navigate(PATH_DASHBOARD.liveclass);
    }
  }, [liveclassadd, liveclassUpdate]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>

      <Helmet>
        <title>Live Class | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading={id ? "Update Live Class" : "Create Live Class"}
        links={[
          // { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Academic", href: "" },
          {
            name: "Live Class",
            href: PATH_DASHBOARD.liveclass
          },
          { name: id ? "Update Live Class" : "Create Live Class" }
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
                  sm: "repeat(2, 1fr)"
                }}
              >
                <AutoCompleteCustom
                  name="batchTypeId"
                  loading={batchLoader}
                  options={_.map(batches?.data, (ev) => {
                    return {
                      label: `${ev?.batchTypeName} (${ev?.course}) (${ev?.board}) (${ev?.class}) `,
                      value: ev.id
                    };
                  })}
                  value={formik.values.batchTypeId}
                  onChange={(event, value) => {
                    formik.setFieldValue("batchTypeId", value);
                  }}
                  label="Batch Type"
                  error={
                    formik.touched.batchTypeId && formik.errors.batchTypeId
                  }
                />
                <AutoCompleteCustom
                  name="subjectId"
                  disabled={liveclassLoader}
                  InputLabelLoader={liveclassLoader}
                  options={_.map(liveclassSubjectId?.data, (ev) => {
                    return {
                      label: `${ev.name}`,
                      value: ev.id
                    };
                  })}
                  value={formik.values.subjectId}
                  onChange={(event, value) => {
                    formik.setFieldValue("subjectId", value);
                  }}
                  label="Subject"
                  error={formik.touched.subjectId && formik.errors.subjectId}
                />

                <AutoCompleteCustom
                  name="chapterId"
                  disabled={liveclassLoader}
                  InputLabelLoader={liveclassLoader}
                  options={_.map(liveclassChapterId?.data, (ev) => {
                    return {
                      label: ev.name,
                      value: ev.id
                    };
                  })}
                  value={formik.values.chapterId}
                  onChange={(event, value) => {
                    formik.setFieldValue("chapterId", value);
                  }}
                  label="Chapter"
                  error={formik.touched.chapterId && formik.errors.chapterId}
                />
                <SelectMenuItem
                  fullWidth
                  error={formik.touched.type && formik.errors.type}
                  InputLabelLabel="Type"
                  InputLabelSize={20}
                  label="Type"
                  name="type"
                  {...formik.getFieldProps("type")}
                  onChange={formik.handleChange}
                  defaultItemLabel="Select Chapter"
                  data={_.map(_type, (ev, index) => {
                    return (
                      <MenuItem value={ev.value} key={index}>
                        {ev.label}
                      </MenuItem>
                    );
                  })}
                />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  name="attemptBy"
                  type="datetime-local"
                  label="Starts By"
                  inputProps={{
                    min: new Date().toISOString().slice(0, 16),
                    max: "9999-12-31T23:59"
                  }}
                  fullWidth
                  {...formik.getFieldProps("attemptBy")}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.attemptBy && formik.errors.attemptBy
                  )}
                />

                <SelectMenuItem
                  fullWidth
                  error={formik.touched.time && formik.errors.time}
                  InputLabelLabel="Live Class Duration"
                  InputLabelSize={20}
                  label="Live Class Duration"
                  name="time"
                  {...formik.getFieldProps("time")}
                  onChange={formik.handleChange}
                  defaultItemLabel="Select Duration"
                  data={_.map(_time, (ev, index) => {
                    return (
                      <MenuItem value={ev.value} key={index}>
                        {ev.label}
                      </MenuItem>
                    );
                  })}
                />

                <AutoCompleteCustom
                  name="teacherId"
                  loading={{ MentorTeacherLoader }}
                  options={_.map(allStaffMentorTeacher?.data, (ev) => {
                    return {
                      label: ev.name,
                      value: ev.id
                    };
                  })}
                  value={formik.values.teacherId}
                  onChange={(event, value) => {
                    formik.setFieldValue("teacherId", value);
                  }}
                  label="Teacher"
                  error={formik.touched.teacherId && formik.errors.teacherId}
                />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={liveclassLoader}
                >
                  {Boolean(id) ? "Update Live Class" : "Create Live Class"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
