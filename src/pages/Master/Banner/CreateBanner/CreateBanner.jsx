import React, { useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Container,
  Stack,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { UploadAvatar } from "components/upload";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { GenerateBase64, GenerateMultipleBase64 } from "utils/convertToBase64";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import {
  createBannerAsync,
  getBannerByIdAsync,
  updateBannerAsync,
} from "redux/banner/banner.async";
import { getcourseAsync } from "redux/course/course.async";
import { emptybanner } from "redux/banner/banner.slice";
import { PATH_DASHBOARD } from "routes/paths";
import { useFormik } from "formik";
import { _initial, _validate, _isCheckedValidate } from "./utils";

export default function CreateBanner() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bannerLoader, bannerById, banneradd, bannerupdate } = useSelector(
    (state) => state.banner
  );

  const { courseLoader, course } = useSelector((state) => state.course);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // const newFile = Object.assign(file, {
    //   preview: URL.createObjectURL(file),
    // });

    if (file) {
      formik.setFieldValue("image", acceptedFiles);
    }
  };

  useEffect(() => {
    if (id && bannerById) {
      formik.setFieldValue("image", [bannerById.image]);
      formik.setFieldValue("title", bannerById.title);
      formik.setFieldValue("type", bannerById?.type);
      formik.setFieldValue("bannerurl", bannerById?.backLink);
      formik.setFieldValue("courseId", {
        label: bannerById?.courseName,
        value: bannerById?.courseId,
      });
    }
  }, [id, bannerById]);

  useEffect(() => {
    if (banneradd.status === 200) {
      toast.success(banneradd.message, toastoptions);
      formik.resetForm();
      dispatch(emptybanner());
      navigate(PATH_DASHBOARD.banner);
    }
    if (bannerupdate.status === 200) {
      toast.success(bannerupdate.message, toastoptions);
      formik.resetForm();
      dispatch(emptybanner());
      navigate(PATH_DASHBOARD.banner);
    }
  }, [banneradd, bannerupdate]);

  const onSubmit = async (values) => {
    const ImageBase64 = await GenerateBase64(values.image[0]);
    const ImageMultipleBase64 = await GenerateMultipleBase64(values.image);

    let payload = {
      id: Number(id),
      image: ImageBase64,
      title: values.title,
      backLink: values.bannerurl,
      type: values.type,
      banners: ImageMultipleBase64,
      courseId: values.courseId.value,
    };

    if (id) {
      delete payload.banners;
      dispatch(updateBannerAsync(payload));
    } else {
      delete payload.id;
      delete payload.image;
      dispatch(createBannerAsync(payload));
    }
  };

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  useEffect(() => {
    if (id) {
      dispatch(getBannerByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getcourseAsync({}));
  }, []);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <CustomBreadcrumbs
        links={[
          { name: "Master", href: "" },
          {
            name: "Banner",
            href: `${PATH_DASHBOARD.banner}`,
          },
          { name: id ? "Update Banner" : "Create Banner" },
        ]}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <>
              <AutoCompleteCustom
                sx={{ mt: 2, mb: 3 }}
                name="courseId"
                loading={courseLoader}
                options={_.map(course?.data, (ev) => {
                  return { label: ev.name, value: ev.id };
                })}
                value={formik.values.courseId}
                onChange={(event, value) => {
                  formik.setFieldValue("courseId", value);
                }}
                label="Select Course"
                error={formik.touched.courseId && formik.errors.courseId}
              />
            </>

            <Card sx={{ pt: 5, pb: 3, px: 3 }}>
              <Box sx={{ mb: 2 }}>
                <UploadAvatar
                  name="image"
                  accept={{
                    "image/*": [],
                  }}
                  multiple={true}
                  file={formik.values.image[0]}
                  error={formik.touched.image && formik.errors.image}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color:
                          formik.touched.image && formik.errors.image
                            ? "red"
                            : "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, mt: 2 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    name="title"
                    label="Title"
                    {...formik.getFieldProps("title")}
                    onChange={formik.handleChange}
                    error={formik.touched.title && formik.errors.title}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Banner Type</InputLabel>
                  <Select
                    label="Banner Type"
                    name="type"
                    {...formik.getFieldProps("type")}
                    onChange={formik.handleChange}
                    error={formik.touched.type && formik.errors.type}
                  >
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Assessment">Assessment</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    name="bannerurl"
                    label="Banner URL"
                    {...formik.getFieldProps("bannerurl")}
                    onChange={formik.handleChange}
                    error={formik.touched.bannerurl && formik.errors.bannerurl}
                  />
                </FormControl>
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, pb: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={bannerLoader}
                >
                  {id ? "Update Banner" : "Create Banner"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
