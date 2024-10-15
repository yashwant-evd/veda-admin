import { Helmet } from "react-helmet-async";
import React from "react";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Container,
  Stack,
} from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { _initial, _validate } from "./utils";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { getcourseAsync } from "redux/course/course.async";
import {
  addBatchDateAsync,
  getBatchDateByIdAsync,
  updatedBatchDateByIdAsync,
} from "redux/batchdate/batchdate.async";
import { getBoardsByCourseIdAsync } from "redux/board/board.async";
import { getClassByBoardAndCourseIdAsync } from "redux/class/class.async";
import { getBatchByCourseBoardClassAsync } from "redux/batchtype/batchtype.async";
import { emptybatchdate } from "redux/batchdate/batchdate.slice";
import { PATH_DASHBOARD } from "routes/paths";

function AddBatchDate() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass } = useSelector(
    (state) => state.batch
  );
  const {
    batchdate,
    batchdateLoader,
    batchdateadd,
    batchDateById,
    batchDateupdate,
  } = useSelector((state) => state.batchdate);
  const tabTitle = useSelector((state) => state?.admin?.adminSetting?.siteTitle)
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
      batchDateId: id,
      courseId: values.course,
      boardId: values.boards,
      classId: values.class,
      batchTypeId: values.batch,
      date: values.batchDate,
    };
    if (id) {
      dispatch(updatedBatchDateByIdAsync(payload));
    } else {
      delete payload.batchDateId;
      dispatch(addBatchDateAsync(payload));
    }
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  }); // FOMRIK

  useEffect(() => {
    getCourseAsync();
  }, []);

  useEffect(() => {
    if (id) dispatch(getBatchDateByIdAsync(id));
  }, [id]);

  useEffect(() => {
    if (id && batchDateById) {
      formik.setFieldValue("course", batchDateById.courseId);
      formik.setFieldValue("boards", batchDateById.boardId);
      formik.setFieldValue("class", batchDateById.classId);
      formik.setFieldValue("batch", batchDateById.batchTypeId);
      formik.setFieldValue("batchDate", batchDateById?.date?.split("T")[0]);
    }
  }, [batchDateById, id]);

  // useEffect(() => {
  //   if (formik.values.course) {
  //     dispatch(
  //       getBoardsByCourseIdAsync({
  //         courseId: formik.values.course,
  //       })
  //     );
  //   }
  // }, [formik.values.course]);

  useEffect(() => {
    if (formik.values.boards) {
      dispatch(
        getClassByBoardAndCourseIdAsync({
          courseId: formik.values.course,
          boardId: formik.values.boards,
        })
      );
    }
  }, [formik.values.boards]);

  useEffect(() => {
    if (formik.values.class) {
      dispatch(
        getBatchByCourseBoardClassAsync({
          courseId: formik.values.course,
          boardId: formik.values.boards,
          classId: formik.values.class,
        })
      );
    }
  }, [formik.values.class]);

  useEffect(() => {
    if (batchdateadd.status === 200) {
      toast.success(batchdateadd.message, toastoptions);
      dispatch(emptybatchdate());
      formik.setFieldValue("batchDate", "");
    }
    if (batchDateupdate.status === 200) {
      toast.success(batchDateupdate.message, toastoptions);
      dispatch(emptybatchdate());
      navigate(PATH_DASHBOARD.batchdate);
    }
  }, [batchdateadd, batchDateupdate]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Batch Date | {`${tabTitle}`}</title>
      </Helmet>

      <CustomBreadcrumbs
        // heading={id ? "Update Batch Date" : "Create Batch Date"}
        links={[
          { name: "Master", href: "" },
          {
            name: "Batch Date",
            href: `${PATH_DASHBOARD.batchdate}`,
          },
          { name: id ? "Update Batch Date" : "Create Batch Date" },
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
                    formik.touched.course && formik.errors.course
                  )}
                >
                  <InputLabel id="demo-simple-select-label">
                    {courseLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Courses"
                    )}
                  </InputLabel>
                  <Select
                    label="Course"
                    name="course"
                    {...formik.getFieldProps("course")}
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

                <FormControl
                  fullWidth
                  disabled={boardLoader}
                  error={Boolean(
                    formik.touched.boards && formik.errors.boards
                  )}
                >
                  <InputLabel id="demo-simple-select-label">
                    {boardLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Boards"
                    )}
                  </InputLabel>
                  <Select
                    label="Boards"
                    name="boards"
                    {...formik.getFieldProps("boards")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem defaultValue value="">
                      Select Board
                    </MenuItem>
                    {boardByCourse?.map((ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={ev.index}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  disabled={classLoader}
                  error={Boolean(formik.touched.class && formik.errors.class)}
                >
                  <InputLabel id="demo-simple-select-label">
                    {classLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Classes"
                    )}
                  </InputLabel>
                  <Select
                    label="Classes"
                    name="class"
                    {...formik.getFieldProps("class")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem defaultValue value="">
                      Select Class
                    </MenuItem>
                    {classbycourseboard?.map((ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={ev.index}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  disabled={batchLoader}
                  error={Boolean(formik.touched.batch && formik.errors.batch)}
                >
                  <InputLabel id="demo-simple-select-label">
                    {batchLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Batches"
                    )}
                  </InputLabel>
                  <Select
                    label="Batches"
                    name="batch"
                    {...formik.getFieldProps("batch")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem defaultValue value="">
                      Select Batch
                    </MenuItem>
                    {batchByCourseBoardClass?.map((ev, index) => {
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
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="batchDate"
                    label="Batch Date"
                    style={{ color: id ? "white !important" : null }}
                    fullWidth
                    {...formik.getFieldProps("batchDate")}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.batchDate && formik.errors.batchDate
                    )}
                  />
                </FormControl>
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={batchdateLoader}
                >
                  {id ? "Update Batch Date" : "Create Batch Date"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddBatchDate;
