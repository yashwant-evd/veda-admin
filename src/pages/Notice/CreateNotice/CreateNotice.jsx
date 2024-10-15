import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Container, Stack, Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Upload } from "components/upload";
import Editor from "components/editor/Editor";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardsByCourseIdAsync,
  getClassByBoardAndCourseIdAsync,
  getBatchByCourseBoardClassAsync,
  getStudentsForNoticeAsync,
  createNoticeAsync,
} from "redux/async.api";
import { getAllBackLinkAsync } from "redux/slices/NoticeBackLinkSlice/NoticeBackLinkAsync";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { noticePageValidate, _initialValues } from "./utils";
import { GenerateBase64 } from "utils/convertToBase64";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { emptynotice } from "redux/slices/notice.slice";
import { getcourseAsync } from "redux/course/course.async";
import { PATH_DASHBOARD } from "routes/paths";

function Notice() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseIdBoard, setCourseIdBoard] = useState("");
  const [boardIdCourse, setBoardIdCourse] = useState("");
  const [classIdBatch, setClassIdBatch] = useState("");
  const [getBatchID, setBatchID] = useState("");
  const [getCheckedValue, setCheckedValue] = useState([]);
  const [getCheckedAll, setCheckedAll] = useState(false);

  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass } = useSelector(
    (state) => state.batch
  );
  const { studentLoader, StudentsByCBCB } = useSelector(
    (state) => state.student
  );
  const { noticeLoader, sendNotice } = useSelector((state) => state.notice);
  const { NoticeBackLinkLoader, NoticeBackLink } = useSelector(
    (state) => state.NoticeBackLink
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const [isother, setIsother] = useState(false);

  useEffect(() => {
    dispatch(
      getcourseAsync({
        page: "",
        limit: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllBackLinkAsync({
        page: "",
        limit: "",
      })
    );
  }, []);

  // useEffect(() => {
  //   if (courseIdBoard) {
  //     dispatch(
  //       getBoardsByCourseIdAsync({
  //         courseId: courseIdBoard,
  //       })
  //     );
  //   }
  // }, [courseIdBoard]);

  useEffect(() => {
    if (boardIdCourse) {
      dispatch(
        getClassByBoardAndCourseIdAsync({
          courseId: courseIdBoard,
          boardId: boardIdCourse,
        })
      );
    }
  }, [boardIdCourse]);

  useEffect(() => {
    if (classIdBatch) {
      dispatch(
        getBatchByCourseBoardClassAsync({
          courseId: courseIdBoard,
          boardId: boardIdCourse,
          classId: classIdBatch,
          batchTypeId: getBatchID,
        })
      );
    }
  }, [classIdBatch]);

  useEffect(() => {
    if (getBatchID) {
      dispatch(
        getStudentsForNoticeAsync({
          courseId: courseIdBoard,
          boardId: boardIdCourse,
          classId: classIdBatch,
          batchTypeId: getBatchID,
        })
      );
    }
  }, [getBatchID]);

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    formik.setFieldValue("image", [...formik.values.image, ...newFiles]);
  };

  const onSubmit = async (values) => {
    const imageBase64 = await GenerateBase64(values.image[0]);
    let payload;
    if (isother) {
      payload = {
        Id: id,
        image: imageBase64,
        courseId: values.course,
        boardId: values.boards,
        classId: values.class,
        batchTypeId: values.batch,
        student: values?.student?.map((students) => {
          return students.id;
        }),
        title: values.title,
        description: values.description,

        backLinkId: values.backLinkId,
        otherLink: values.otherLink,
      };
    } else {
      payload = {
        image: imageBase64,
        courseId: values.course,
        boardId: values.boards,
        classId: values.class,
        batchTypeId: values.batch,
        student: values?.student?.map((students) => {
          return JSON.parse(students).id;
        }),
        title: values.title,
        description: values.description,

        backLinkId: values.backLinkId,
      };
    }

    dispatch(createNoticeAsync(payload));
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: noticePageValidate,
  });

  useEffect(() => {
    if (sendNotice.status === 200) {
      toast.success(sendNotice.message, toastoptions);
      formik.resetForm();
      dispatch(emptynotice());
      navigate(PATH_DASHBOARD.notice);
    }
  }, [sendNotice]);

  useEffect(() => {
    if (NoticeBackLink?.data?.length > 0 && formik.values.backLinkId) {
      setIsother(
        // .backLink === "Other"
        NoticeBackLink?.data?.find((ev) => formik.values.backLinkId === ev.id)
          .backLink === ""
      );
    }
  }, [NoticeBackLink, formik.values]);

  const handleChangeCheckbox = (data) => {
    formik.handleChange(data);
    setCheckedAll(false);
    const index = getCheckedValue.indexOf(data);
    if (index === -1) {
      setCheckedValue([...getCheckedValue, data]);
      formik.setFieldValue("student", [...getCheckedValue, data]);
    } else {
      setCheckedValue(getCheckedValue.filter((item) => item != data));
      formik.setFieldValue(
        "student",
        getCheckedValue.filter((item) => item != data)
      );
    }
  };

  const studentList = StudentsByCBCB;
  const handleCheckedAll = (data) => {
    setCheckedAll(data);
    if (data === true) {
      const ids = studentList.map((i) =>
        JSON.stringify({ id: i.id, name: i.name, phone: i.phone })
      );
      setCheckedValue(ids);
      formik.setFieldValue("student", ids);
    } else {
      setCheckedValue([]);
      formik.setFieldValue("student", []);
    }
  };

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Notice | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading={id ? "Update Notice" : "Create Notice"}
        links={[
          { name: "Notice", href: PATH_DASHBOARD.notice },
          { name: id ? "Update Notice" : "Create Notice" },
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
                  error={formik.touched.course && formik.errors.course}
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
                    name="course"
                    {...formik.getFieldProps("course")}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setCourseIdBoard(event.target.value);
                    }}
                  >
                    <MenuItem defaultValue value="">
                      Select Course
                    </MenuItem>
                    {course?.data?.map((ev, index) => {
                      return (
                        <MenuItem key={ev.index} value={ev.id}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  disabled={boardLoader}
                  error={formik.touched.boards && formik.errors.boards}
                >
                  <InputLabel>
                    {boardLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Board"
                    )}
                  </InputLabel>

                  <Select
                    label="Board"
                    name="boards"
                    {...formik.getFieldProps("boards")}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setBoardIdCourse(event.target.value);
                    }}
                  >
                    <MenuItem defaultValue value="">
                      Select Board
                    </MenuItem>
                    {boardByCourse?.map((ev, index) => {
                      return (
                        <MenuItem key={ev.index} value={ev.id}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  disabled={classLoader}
                  error={formik.touched.class && formik.errors.class}
                >
                  <InputLabel id="demo-simple-select-label">
                    {classLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Class"
                    )}
                  </InputLabel>
                  <Select
                    label="Class"
                    name="class"
                    {...formik.getFieldProps("class")}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setClassIdBatch(event.target.value);
                    }}
                  >
                    <MenuItem defaultValue value="">
                      Select Class
                    </MenuItem>
                    {classbycourseboard?.map((ev, index) => {
                      return (
                        <MenuItem key={ev.index} value={ev.id}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  disabled={batchLoader}
                  error={formik.touched.batch && formik.errors.batch}
                >
                  <InputLabel id="demo-simple-select-label">
                    {batchLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Batch"
                    )}
                  </InputLabel>
                  <Select
                    label="Batch"
                    name="batch"
                    // value={getBatchID}
                    {...formik.getFieldProps("batch")}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setBatchID(event.target.value);
                    }}
                  >
                    <MenuItem defaultValue value="">
                      Select Batch
                    </MenuItem>
                    {batchByCourseBoardClass?.map((ev, index) => {
                      return (
                        <MenuItem key={ev.index} value={ev.id}>
                          {ev.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  error={formik.touched.student && formik.errors.student}
                >
                  <InputLabel>
                    {studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Select Student(s)"
                    )}
                  </InputLabel>
                  <Select
                    name="student"
                    label="Select Student(s)"
                    select
                    multiple
                    value={getCheckedValue}
                    onChange={handleCheckedAll}
                    renderValue={(setCheckedValue) =>
                      setCheckedValue
                        .map((item) => {
                          const passedItem = JSON.parse(item);
                          return `${passedItem.name} (${passedItem.phone})`;
                        })
                        .join(" , ")
                    }
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <Checkbox
                          value={getCheckedAll}
                          checked={getCheckedAll}
                          onChange={(event) =>
                            handleCheckedAll(event.target.checked)
                          }
                        />
                        <ListItemText
                          style={{ marginTop: "8px" }}
                          primary="Select All"
                        />
                      </ListItemIcon>
                    </MenuItem>
                    {StudentsByCBCB?.map((ev, index) => (
                      <MenuItem key={ev.id}>
                        <ListItemIcon>
                          <Checkbox
                            value={JSON.stringify({
                              id: ev.id,
                              name: ev.name,
                              phone: ev.phone,
                            })}
                            checked={
                              getCheckedValue.findIndex(
                                (i) => JSON.parse(i).id == ev.id
                              ) != -1
                            }
                            onChange={(event) =>
                              handleChangeCheckbox(event.target.value)
                            }
                          />
                        </ListItemIcon>
                        <ListItemText>
                          {ev.name} {""}({ev.phone})
                        </ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Title"
                    name="title"
                    {...formik.getFieldProps("title")}
                    onChange={formik.handleChange}
                    error={formik.touched.title && formik.errors.title}
                  />
                </FormControl>
              </Box>
              <FormControl
                sx={{
                  mt: "20px",
                }}
                fullWidth
                disabled={NoticeBackLinkLoader}
                error={Boolean(
                  formik.touched.buttonLink && formik.errors.buttonLink
                )}
              >
                <InputLabel>
                  {NoticeBackLinkLoader ? (
                    <CustomComponentLoader padding="0 0" size={20} />
                  ) : (
                    "Back Link"
                  )}
                </InputLabel>
                <Select
                  label="buttonLink"
                  name="backLinkId"
                  {...formik.getFieldProps("backLinkId")}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Select</MenuItem>

                  {NoticeBackLink?.data?.map((ev, index) => {
                    return (
                      <MenuItem key={ev.index} value={ev.id}>
                        {ev.page}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* backlink */}
              {isother ? (
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <TextField
                    label="otherLink"
                    name="otherLink"
                    {...formik.getFieldProps("otherLink")}
                    onChange={formik.handleChange}
                    error={formik.touched.otherLink && formik.errors.otherLink}
                  />
                </FormControl>
              ) : (
                ""
              )}

              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", mt: "10px", mb: "10px" }}
              >
                Notice Description
              </Typography>

              <Editor
                name="description"
                value={formik.values.description}
                onChange={(e) => {
                  formik.setFieldValue("description", e);
                }}
                error={formik.touched.description && formik.errors.description}
              />

              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", mt: "10px", mb: "10px" }}
              >
                Notice Image
              </Typography>
              <Upload
                name="image"
                multiple
                thumbnail
                maxSize={3145728}
                accept={{ "image/*": [] }}
                files={formik.values.image}
                onDrop={handleDrop}
                onRemove={() => {
                  formik.setFieldValue("image", "");
                }}
                error={formik.touched.image && formik.errors.image}
              />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={noticeLoader}
                >
                  {id ? "Update Notice" : "Create Notice"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Notice;
