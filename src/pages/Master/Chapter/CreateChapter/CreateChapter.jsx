import { Helmet } from "react-helmet-async";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  MenuItem,
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
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { useNavigate, useParams } from "react-router";
import { getcourseAsync } from "redux/course/course.async";
import {
  addChapterAsync,
  getChapterByIdAsync,
  updateChapterAsync,
} from "redux/chapter/chapter.async";
import { getBoardsByCourseIdAsync } from "redux/board/board.async";
import { getClassByBoardAndCourseIdAsync } from "redux/class/class.async";
import { getBatchByCourseBoardClassAsync } from "redux/batchtype/batchtype.async";
import {
  getSubjectByBatchTypeIdAsync,
  getSubjectByCourseIdAsync,
} from "redux/subject/subject.async";
import { emptychapter } from "redux/chapter/chapter.slice";
import { PATH_DASHBOARD } from "routes/paths";
import SelectMenuItem from "components/SelectMenuItem";
import _ from "lodash";

export default function CreateChapter() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { chapterLoader, chapteradd, chapterById, chapterupdate } = useSelector(
    (state) => state.chapter
  );
  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const {
    subjectLoader,
    subjectCourseBoardClassBatch,
    subjectCourseLoader,
    subjectCourseData,
  } = useSelector((state) => state.subject);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass } = useSelector(
    (state) => state.batch
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const onSubmit = (values) => {
    const payload = {
      chapterId: id,
      courseId: values.courseId,
      // boardId: values.boardId,
      // classId: values.classId,
      // batchTypeId: values.batchTypeId,
      subjectId: values.subjectId,
      name: values.name,
    };
    if (id) {
      dispatch(updateChapterAsync(payload));
    } else {
      dispatch(addChapterAsync(payload));
    }
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  }); // FOMRIK

  useEffect(() => {
    dispatch(getcourseAsync({}));
  }, []);

  useEffect(() => {
    if (id) dispatch(getChapterByIdAsync(id));
  }, [id]);

  useEffect(() => {
    if (id && chapterById) {
      formik.setFieldValue("courseId", chapterById.courseId);
      // formik.setFieldValue("boardId", chapterById.boardId);
      // formik.setFieldValue("classId", chapterById.classId);
      // formik.setFieldValue("batchTypeId", chapterById.batchTypeId);
      formik.setFieldValue("subjectId", chapterById.subjectId);
      formik.setFieldValue("name", chapterById.name);
    }
  }, [chapterById, id]);

  {
    /*useEffect(() => {
    if (formik.values.courseId) {
      dispatch(
        getBoardsByCourseIdAsync({
          courseId: formik.values.courseId,
        })
      );
    }
  }, [formik.values.courseId]);

  useEffect(() => {
    if (formik.values.boardId) {
      dispatch(
        getClassByBoardAndCourseIdAsync({
          courseId: formik.values.courseId,
          boardId: formik.values.boardId,
        })
      );
    }
  }, [formik.values.boardId]);

  useEffect(() => {
    if (formik.values.classId) {
      dispatch(
        getBatchByCourseBoardClassAsync({
          courseId: formik.values.courseId,
          boardId: formik.values.boardId,
          classId: formik.values.classId,
        })
      );
    }
  }, [formik.values.classId]); */
  }

  useEffect(() => {
    if (formik.values.courseId) {
      dispatch(
        getSubjectByCourseIdAsync({
          courseId: formik.values.courseId,
          // boardId: formik.values.boardId,
          // classId: formik.values.classId,
          // batchTypeId: formik.values.batchTypeId,
        })
      );
    }
  }, [formik.values.courseId]);

  useEffect(() => {
    if (chapteradd.status === 200) {
      toast.success(chapteradd.message, toastoptions);
      formik.setFieldValue("name", "");
      dispatch(emptychapter());
    }
    if (chapterupdate.status === 200) {
      toast.success(chapterupdate.message, toastoptions);
      dispatch(emptychapter());
      formik.resetForm();
      navigate(PATH_DASHBOARD.chapter);
    }
  }, [chapteradd, chapterupdate]);

  console.log("subjectCourseData...", subjectCourseData)

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Chapter | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading={id ? "Update Chapter" : "Create Chapter"}
        links={[
          { name: "Master", href: "" },
          {
            name: "Chapter",
            href: `${PATH_DASHBOARD.chapter}`,
          },
          { name: id ? "Update Chapter" : "Create Chapter" },
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
                <FormControl>
                  <SelectMenuItem
                    fullWidth
                    disabled={courseLoader}
                    error={formik.touched.courseId && formik.errors.courseId}
                    InputLabelLoader={courseLoader}
                    InputLabelLabel="Courses"
                    InputLabelSize={20}
                    label="Course"
                    name="courseId"
                    {...formik.getFieldProps("courseId")}
                    onChange={formik.handleChange}
                    defaultItemLabel="Select Course"
                    data={_.map(course?.data, (ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={index}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  />
                </FormControl>
                {/*<FormControl >
                  <SelectMenuItem
                    fullWidth
                    disabled={boardLoader}
                    error={formik.touched.boardId && formik.errors.boardId}
                    InputLabelLoader={boardLoader}
                    InputLabelLabel="Boards"
                    InputLabelSize={20}
                    label="Boards"
                    name="boardId"
                    {...formik.getFieldProps("boardId")}
                    onChange={formik.handleChange}
                    defaultItemLabel="Select Board"
                    data={_.map(boardByCourse, (ev, index) => {
                      return (
                        <MenuItem value={ev.id} key={index}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  />
                </FormControl>
                <SelectMenuItem
                  fullWidth
                  disabled={classLoader}
                  error={formik.touched.classId && formik.errors.classId}
                  InputLabelLoader={classLoader}
                  InputLabelLabel="Classes"
                  InputLabelSize={20}
                  label="Classes"
                  name="classId"
                  {...formik.getFieldProps("classId")}
                  onChange={formik.handleChange}
                  defaultItemLabel="Select Class"
                  data={_.map(classbycourseboard, (ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={index}>
                        {ev.name}
                      </MenuItem>
                    );
                  })}
                />

                <SelectMenuItem
                  fullWidth
                  disabled={batchLoader}
                  error={
                    formik.touched.batchTypeId && formik.errors.batchTypeId
                  }
                  InputLabelLoader={batchLoader}
                  InputLabelLabel="Batches"
                  InputLabelSize={20}
                  label="Batches"
                  name="batchTypeId"
                  {...formik.getFieldProps("batchTypeId")}
                  onChange={formik.handleChange}
                  defaultItemLabel="Select Batch"
                  data={_.map(batchByCourseBoardClass, (ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={index}>
                        {ev.name}
                      </MenuItem>
                    );
                  })}
                /> */}

                <SelectMenuItem
                  fullWidth
                  disabled={subjectCourseLoader}
                  error={formik.touched.subjectId && formik.errors.subjectId}
                  InputLabelLoader={subjectCourseLoader}
                  InputLabelLabel="Subject"
                  InputLabelSize={20}
                  label="Subject"
                  name="subjectId"
                  {...formik.getFieldProps("subjectId")}
                  onChange={formik.handleChange}
                  defaultItemLabel="Select Subject"
                  data={_.map(subjectCourseData?.data, (ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={index}>
                        {ev.name}
                      </MenuItem>
                    );
                  })}
                />
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    label="Chapter"
                    style={{ color: "transparent !important" }}
                    fullWidth
                    {...formik.getFieldProps("name")}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                  />
                </FormControl>
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={chapterLoader}
                >
                  {id ? "Update Chapter" : "Create Chapter"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
