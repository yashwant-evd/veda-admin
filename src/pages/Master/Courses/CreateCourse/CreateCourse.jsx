import {
  Card,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify/Iconify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { isJson } from "utils/isJson";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { GenerateBase64 } from "utils/convertToBase64";
import Editor from "components/editor/Editor";

import {
  createcourseAsync,
  getcoursebyidAsync,
  updatecoursebyidAsync,
} from "redux/course/course.async";
import { emptycourse } from "redux/course/course.slice";
import UploadBox from "components/CustomUploads/UploadBox";
import { useFormik } from "formik";
import { _initial, _validation } from "./utils";
import { PATH_DASHBOARD } from "routes/paths";

const AddCourses = ({}) => {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { courseLoader, courseadd, courseId, updateId } = useSelector(
    (state) => state.course
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const handleDrop = (acceptedFiles) => {
    // HANDLE FILES
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      formik.setFieldValue("image", [newFile]);
    }
  };

  const onSubmit = async (values) => {
    const ImageBase64 = await GenerateBase64(values.image[0]);

    const listinfo = [];
    for (let value of values.list) {
      if (value.list !== "") {
        listinfo.push(value.list);
      }
    }
    // PAYLOAD
    const payload = {
      courseId: Number(id),
      name: values.name,
      // shortDescription: values.shortDescription,
      image: ImageBase64,
      // list: JSON.stringify(listinfo),
    };
    if (id) {
      dispatch(updatecoursebyidAsync(payload));
    } else {
      delete payload.courseId;
      dispatch(createcourseAsync(payload)).then((res) => {
        if (res.payload.status === 200) {
          toast.success(res.payload.message, toastoptions);
          navigate(PATH_DASHBOARD.courses);
        }
      });;;
    }
  };

  useEffect(() => {
    if (id) dispatch(getcoursebyidAsync(id));
  }, []);

  useEffect(() => {
    // VALUE SET
    if (id && courseId) {
      if (isJson(courseId.list)) {
        const maplist = JSON.parse(courseId.list).map((ev) => {
          return {
            list: ev,
          };
        });
        formik.setFieldValue("list", maplist);
      }
      formik.setFieldValue("image", [courseId.image]);
      formik.setFieldValue("name", courseId.name);
      formik.setFieldValue("shortDescription", courseId.shortDescription);
    }
  }, [courseId, id]);

  useEffect(() => {
    if (courseadd.status === 200) {
      toast.success(courseadd.message, toastoptions);
      dispatch(emptycourse());
      formik.resetForm();
      formik.setFieldValue("list", [{ list: "" }]);
    }
    if (updateId.status === 200) {
      toast.success(updateId.message, toastoptions);
      dispatch(emptycourse());
      formik.resetForm();
      navigate(PATH_DASHBOARD.courses);
    }
  }, [courseadd, updateId]);

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validation,
  });

  console.log(
    "formik.values.shortDescription...",
    formik.values.shortDescription
  );

  return (
    <>
      <Container maxWidth={themeStretch ? "lg" : false}>
        <CustomBreadcrumbs
          // heading={Boolean(id) ? "Update Course" : "Create Course"}
          links={[
            { name: "Master", href: "" },
            {
              name: "Course",
              href: "/app/master/course",
            },
            { name: Boolean(id) ? "Update Course" : "Create Course" },
          ]}
        />

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth disabled={courseLoader}>
                        <TextField
                          sx={{ mb: "15px" }}
                          name="name"
                          label={
                            courseLoader ? (
                              <CustomComponentLoader padding="0 0" size={20} />
                            ) : (
                              "Course Name"
                            )
                          }
                          fullWidth
                          {...formik.getFieldProps("name")}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.name && formik.errors.name
                          )}
                        />
                      </FormControl>

                      {/*formik.values.list.map((listI, index) => (
                        <Box key={index} sx={{ mb: "15px" }}>
                          <Grid item xs={12} md={12}>
                            <FormControl fullWidth disabled={courseLoader}>
                              <TextField
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {formik.values.list.length !== 0 && (
                                        <div>
                                          {index !== 0 ||
                                          formik.values.list.length > 1 ? (
                                            <Iconify
                                              icon="eva:trash-2-outline"
                                              onClick={() => {
                                                if (
                                                  formik.values.list.length > 1
                                                ) {
                                                  formik.values.list.splice(
                                                    index,
                                                    1
                                                  );
                                                  formik.setFieldValue(
                                                    "list",
                                                    formik.values.list
                                                  );
                                                }
                                              }}
                                              style={{
                                                cursor: "pointer",
                                                marginRight: "10px",
                                              }}
                                            />
                                          ) : null}
                                          {formik.values.list.length - 1 ===
                                            index && (
                                            <Iconify
                                              icon="eva:plus-fill"
                                              onClick={() => {
                                                formik.setFieldValue("list", [
                                                  ...formik.values.list,
                                                  { list: "" },
                                                ]);
                                              }}
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            />
                                          )}
                                        </div>
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                                fullWidth
                                label={
                                  courseLoader ? (
                                    <CustomComponentLoader
                                      padding="0 0"
                                      size={20}
                                    />
                                  ) : (
                                    "List*"
                                  )
                                }
                                sx={{ background: "#F9F9F9" }}
                                name="list"
                                type="text"
                                value={listI.list}
                                onChange={(e) => {
                                  formik.values.list[index][e.target.name] =
                                    e.target.value;
                                  formik.setFieldValue(
                                    "list",
                                    formik.values.list
                                  );
                                }}
                                error={Boolean(
                                  formik.touched.list && formik.errors.list
                                )}
                              />
                            </FormControl>
                          </Grid>
                        </Box>
                                )) */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: "15px" }}>
                        <UploadBox
                          height={58}
                          name="image"
                          label="Thumbnail"
                          accept={{
                            "image/*": [],
                          }}
                          onDrop={handleDrop}
                          file={formik.values.image[0]}
                          error={Boolean(
                            formik.touched.image && formik.errors.image
                          )}
                        />
                      </Box>
                    </Grid>
                    {/*<Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", mb: "10px" }}
                      >
                        Short Description
                      </Typography>
                      <Editor
                        id="shortDescription"
                        name="shortDescription"
                        value={formik.values.shortDescription}
                        onChange={(e) => {
                          formik.setFieldValue("shortDescription", e);
                        }}
                        error={
                          formik.touched.shortDescription &&
                          formik.errors.shortDescription
                        }
                      />
                      </Grid> */}
                  </Grid>
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={courseLoader}
                  >
                    {id ? "Update Course" : "Create Course"}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddCourses;
