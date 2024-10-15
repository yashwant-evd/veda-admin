import React, { useEffect, useMemo } from "react";
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
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import {
  getBatchByCourseBoardClassAsync,
  getBoardsByCourseIdAsync,
  getChapterBySubjectId,
  getClassByBoardAndCourseIdAsync,
  getSubjectByBatchTypeIdAsync,
  // getcourseAsync,
} from "redux/async.api";
import { useDispatch, useSelector } from "react-redux";
import { _initial, _validate } from "./utils";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { useParams } from "react-router";
import { PATH_DASHBOARD } from "routes/paths";
import { getcourseAsync } from "redux/course/course.async";
import {
  addSyllabusTopicAsync,
  getSyllausTopicByIdAsync,
  updateSyllausTopicByIdAsync,
  getSubjectByCourseIdAsync,
} from "redux/syllabuus/syllabus.async";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptysyllabusTopic } from "redux/syllabuus/syllabus.slice";
import { useNavigate } from "react-router-dom";

export default function AddTopics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { themeStretch } = useSettingsContext();
  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass } = useSelector(
    (state) => state.batch
  );
  const { subjectLoader, subjectCourseBoardClassBatch } = useSelector(
    (state) => state.subject
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const { chapterLoader, chapterdata } = useSelector((state) => state.chapter);
  const {
    syllabusLoader,
    syllabustopiccreate,
    syllabustopicId,
    syllabustopicupdate,
    subjectCourseLoader,
    subjectCourseData,
  } = useSelector((state) => state.syllabus);

  const onSubmit = (values) => {
    const payload = {
      topicId: id,
      courseId: values.courseId,
      subjectId: values.subjectId,
      chapterId: values.chapterId,
      name: values.name,
    };
    if (id) {
      dispatch(updateSyllausTopicByIdAsync(payload));
    } else {
      delete payload.topicId;
      dispatch(addSyllabusTopicAsync(payload));
    }
  };

  useEffect(() => {
    // GET ALL COURSE
    dispatch(getcourseAsync({}));
  }, []);

  useMemo(() => {
    if (id) dispatch(getSyllausTopicByIdAsync(id));
  }, [id]);

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  {
    /* useEffect(() => {
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
        })
      );
    }
  }, [formik.values.courseId]);

  useEffect(() => {
    if (formik.values.subjectId) {
      dispatch(
        getChapterBySubjectId({
          courseId: formik.values.courseId,
          subjectId: formik.values.subjectId,
        })
      );
    }
  }, [formik.values.subjectId]);

  useEffect(() => {
    if (id && syllabustopicId) {
      formik.setFieldValue("courseId", syllabustopicId.courseId);
      formik.setFieldValue("subjectId", syllabustopicId.subjectId);
      formik.setFieldValue("chapterId", syllabustopicId.chapterId);
      formik.setFieldValue("name", syllabustopicId.name);
    }
  }, [syllabustopicId, id]);

  useEffect(() => {
    if (syllabustopiccreate.status === 200) {
      toast.success(syllabustopiccreate.message, toastoptions);
      formik.setFieldValue("name", "");
      // dispatch(emptysyllabusTopic());
    }
    if (syllabustopicupdate.status === 200) {
      toast.success(syllabustopicupdate.message, toastoptions);
      formik.resetForm();
      dispatch(emptysyllabusTopic());
      navigate(PATH_DASHBOARD.topic);
    }
  }, [syllabustopiccreate, syllabustopicupdate]);

  return (
    <>
      <Helmet>
        <title>Topic | {`${tabTitle}`}</title>
      </Helmet>
      <Container maxWidth={themeStretch ? "lg" : false}>
        <CustomBreadcrumbs
          // heading="Create Topic"
          links={[
            { name: "Syllabus", href: "" },
            { name: "Topic", href: `${PATH_DASHBOARD.topic}` },
            { name: id ? "Update Topic" : "Create Topic" },
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
                    error={formik.touched.courseId && formik.errors.courseId}
                  >
                    <InputLabel>
                      {" "}
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
                      {course?.data?.map((ev) => {
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
                    disabled={subjectCourseLoader}
                    error={formik.touched.subjectId && formik.errors.subjectId}
                  >
                    <InputLabel>
                      {subjectLoader ? (
                        <CustomComponentLoader padding="0 0" size={20} />
                      ) : (
                        "Subject"
                      )}
                    </InputLabel>
                    <Select
                      label="Subject"
                      name="subjectId"
                      {...formik.getFieldProps("subjectId")}
                      onChange={formik.handleChange}
                    >
                      <MenuItem defaultValue value="">
                        Select Subject
                      </MenuItem>
                      {subjectCourseData?.data?.map((ev, index) => {
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
                    disabled={chapterLoader}
                    error={formik.touched.chapterId && formik.errors.chapterId}
                  >
                    <InputLabel>
                      {" "}
                      {chapterLoader ? (
                        <CustomComponentLoader padding="0 0" size={20} />
                      ) : (
                        "Chapter"
                      )}
                    </InputLabel>
                    <Select
                      label="chapterId"
                      name="chapterId"
                      {...formik.getFieldProps("chapterId")}
                      onChange={formik.handleChange}
                    >
                      <MenuItem defaultValue value="">
                        Select Chapter
                      </MenuItem>
                      {chapterdata?.map((ev) => {
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
                      label="Topic Name"
                      style={{ color: "transparent !important" }}
                      fullWidth
                      {...formik.getFieldProps("name")}
                      onChange={formik.handleChange}
                      error={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={syllabusLoader}
                  >
                    {id ? "Update Topic" : "Create Topic"}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
