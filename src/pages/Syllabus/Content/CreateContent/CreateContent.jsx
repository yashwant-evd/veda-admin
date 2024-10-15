import { Box, Container, Stack } from "@mui/system";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  _initial,
  _tag,
  _language,
  _topic,
  _validate,
  helpContentType,
  _validateAllClass,
  _validateAllBatch,
  _validateAllSubject,
  _validateAllChapter,
  _validateAllTopic,
} from "./utils";
import {
  addSyllabusContentAsync,
  getAllSyllabusTopicAsync,
  getChapterByMultipleClassBatchSubjectAsync,
  getSubjectByMultipleClassBatchAsync,
  getSyllausContentByIdAsync,
  getTopicByMultipleClassBatchSubjectChapterAsync,
  updateSyllabusContentAsync,
} from "redux/syllabuus/syllabus.async";
import { getSubjectByCourseIdAsync } from "redux/subject/subject.async";
import {
  getBatchByCourseBoardClassAsync,
  getChapterBySubjectId,
  getClassByBoardAndCourseIdAsync,
  getSubjectByBatchTypeIdAsync,
} from "redux/async.api";
import { getChapterBySubjectIdFilterAsync } from "redux/filter/filter.async";

import { useDispatch, useSelector } from "react-redux";

import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import CustomCheckboxDropdown from "components/CustomCheckboxDropdown/CustomCheckboxDropdown";
import CustomComponentLoader from "components/CustomComponentLoader/CustomComponentLoader";
import { GenerateBase64 } from "utils/convertToBase64";
import { Helmet } from "react-helmet-async";
import Label from "components/label/Label";
import { LoadingButton } from "@mui/lab";
import { PATH_DASHBOARD } from "routes/paths";
import UploadBox from "components/CustomUploads/UploadBox";
import UploadMultipleCustom from "components/CustomUploads/UploadMultiple";
import _ from "lodash";
import { decrypt } from "utils/cryptojs";
import { emptysyllabusTopic } from "redux/syllabuus/syllabus.slice";
import { getBatchByMultipleClassIddAsync } from "redux/slices/scholorshipSlice/async.api";
import getFileExtension from "utils/getFileExtension";
import { getFileSize } from "utils/getFileSize";
import { getTopicBySubjecIdAsync } from "redux/slices/TopicSlice/Topic.async";
import { getcourseAsync } from "redux/course/course.async";
import { isJson } from "utils/isJson";
import { s3uploadFile } from "config/aws";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSettingsContext } from "components/settings";
import { v4 as uuidv4 } from "uuid";
function CreateContent() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [getSelectedClass, setSelectedClass] = useState([]);
  const [getSelectedBatch, setSelectedBatch] = useState([]);
  const [getSelectedSubject, setSelectedSubject] = useState([]);
  const [getSelectedChapter, setSelectedChapter] = useState([]);
  const [getSelectedTopic, setSelectedTopic] = useState([]);
  const [isDisplay, setIsDisplay] = useState({
    isBatch: true,
    isSubject: true,
    isChapter: true,
    isTopic: true,
    classIds: "",
    batchIds: "",
    subjectIds: "",
    chapterIds: "",
    topicIds: "",
  });
  const [getClassButtonColor, setClassButtonColor] = useState("grey");
  const [getBatchButtonColor, setBatchButtonColor] = useState("grey");
  const [getSubjectButtonColor, setSubjectButtonColor] = useState("grey");
  const [getChapterButtonColor, setChapterButtonColor] = useState("grey");
  const [getTopicButtonColor, setTopicButtonColor] = useState("grey");

  const [fileProgress, setFileProgress] = useState(0);
  const [uploadspeed, setuploadspeed] = useState(0);
  const [filesize, setFilesize] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [getHelpingResourser, setHelpingResourse] = useState("");
  const { themeStretch } = useSettingsContext();
  const {
    syllabusLoader,
    syllabustopic,
    syllabuscontentcreate,
    syllabuscontentupdate,
    syllabuscontentById,
    SubjectByMultipleClassBatch,
    chapterByMultipleClassBatchSubject,
    TopicByMultipleClassBatchSubjectChapter,
  } = useSelector((state) => state.syllabus);
  const { scholorshipLoader, getBatchByMultipleClass } = useSelector(
    (state) => state.scholorship
  );
  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass } = useSelector(
    (state) => state.batch
  );

  const { filterLoader, ChapterBySubjectId } = useSelector(
    (state) => state.filterInfo
  );

  const {
    subjectLoader,
    subjectCourseBoardClassBatch,
    subjectCourseLoader,
    subjectCourseData,
  } = useSelector((state) => state.subject);
  const { chapterLoader, chapterdata } = useSelector((state) => state.chapter);
  const { TopicLoader, TopicBySubjecId } = useSelector((state) => state.Topic);
  const { userinfo } = useSelector((state) => state.userinfo);
  const decryptin = decrypt(userinfo.credentials);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const onSubmit = async (values) => {
    if (
      values.source === "upload" &&
      typeof values.sourceFile[0] !== "string"
    ) {
      const extension = getFileExtension(values.sourceFile[0]?.name);
      const filesize = getFileSize(values.sourceFile[0]);
      setFilesize(filesize);
      setUploadStart(true);
      const startTime = new Date().getTime();
      let bytesUploaded = 0;
      const key = `${decryptin.folder.videoManager}/${uuidv4()}.${extension}`;
      const fileuploads3 = s3uploadFile(
        key,
        values.sourceFile[0],
        decryptin,
        extension
      );
      fileuploads3.on("httpUploadProgress", (progress) => {
        setFileProgress(Math.round((progress.loaded / progress.total) * 100));
        bytesUploaded = progress.loaded;
        const elapsedTime = new Date().getTime() - startTime;
        const uploadSpeed = (bytesUploaded / elapsedTime) * 1000;
        setuploadspeed(Math.ceil(uploadSpeed / 1000000));
      });
      await fileuploads3.done().then(async (evv) => {
        const resourceFiles = [];
        const thumbnail = await GenerateBase64(values.thumbnail[0]);
        for (let ev of values.resources) {
          const resources = await GenerateBase64(ev);
          resourceFiles.push(resources);
        }
        let payload = {
          Id: id,
          courseId: values.courseId?.value,
          subjectId: values.subjectId?.value,
          chapterId: [values.chapterId?.value],
          topicId: [values.topicId?.value],
          tag: values.tag,
          thumbnailFile: thumbnail,
          source: values.source,
          resourceType: getHelpingResourser,
          resourceFile: resourceFiles,
          sourceFile: evv.Key,
          language: values.language,
        };
        if (id) {
          dispatch(updateSyllabusContentAsync(payload));
        } else {
          delete payload.Id;
          dispatch(addSyllabusContentAsync(payload));
        }
      });
    } else {
      const resourceFiles = [];
      const thumbnail = await GenerateBase64(values.thumbnail[0]);
      for (let ev of values.resources) {
        const resources = await GenerateBase64(ev);
        resourceFiles.push(resources);
      }
      let payload = {
        Id: id,
        courseId: values.courseId?.value,
        subjectId: values.subjectId?.value,
        chapterId: [values.chapterId?.value],
        topicId: [values.topicId?.value],
        tag: values.tag,
        source: values.source,
        thumbnailFile: thumbnail,
        resourceType: getHelpingResourser,
        resourceFile: resourceFiles,
        sourceFile:
          values.source !== "upload" ? values.sourceURL : values.sourceFile[0],
        language: values.language,
      };
      if (id) {
        dispatch(updateSyllabusContentAsync(payload));
      } else {
        delete payload.Id;
        dispatch(addSyllabusContentAsync(payload)).then((res) => {
          if (!id && res.payload.status == 200) {
            formik.setFieldValue("sourceURL", "");
          }
        });
      }
    }
  };
  useEffect(() => {
    if (syllabuscontentcreate.status === 200) {
      toast.success(syllabuscontentcreate.message, toastoptions);
      formik.setFieldValue("name", "");
      formik.setFieldValue("tag", "");
      formik.setFieldValue("thumbnail", []);
      formik.setFieldValue("resources", []);
      formik.setFieldValue("source", "");
      setHelpingResourse("");
      formik.setFieldValue("sourceFile", []);
      formik.setFieldValue("language", "");
      setUploadStart(false);
      // navigate(PATH_DASHBOARD.content);
      dispatch(emptysyllabusTopic());
    }
    if (syllabuscontentupdate.status === 200) {
      toast.success(syllabuscontentupdate.message, toastoptions);
      formik.resetForm();
      dispatch(emptysyllabusTopic());
      navigate(PATH_DASHBOARD.content);
    }
  }, [syllabuscontentcreate, syllabuscontentupdate]);

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  useEffect(() => {
    dispatch(getcourseAsync({}));
  }, []);

  useEffect(() => {
    if (formik.values.courseId?.value) {
      dispatch(
        getSubjectByCourseIdAsync({
          courseId: formik.values.courseId?.value,
        })
      );
    }
  }, [formik.values.courseId]);

  useEffect(() => {
    if (formik.values.subjectId?.value) {
      dispatch(
        getChapterBySubjectIdFilterAsync({
          subjectId: formik.values.subjectId?.value,
        })
      );
    }
  }, [formik.values.subjectId]);

  useEffect(() => {
    if (formik.values?.chapterId?.value) {
      dispatch(
        getTopicByMultipleClassBatchSubjectChapterAsync({
          courseId: formik.values.courseId?.value,
          subjectId: formik.values.subjectId?.value,
          chapterId: [formik.values.chapterId?.value],
        })
      );
    }
  }, [formik.values?.chapterId]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      formik.setFieldValue("thumbnail", [newFile]);
    }
  };
  const handleThumbnailDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      formik.setFieldValue("sourceFile", [newFile]);
    }
  };

  const StyledComponent = styled("div")(({ theme }) => ({
    width: "100%",
    fontSize: 24,
    height: "58px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    margin: theme.spacing(0),
    color: theme.palette.text.disabled,
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.divider}`,
    "&:hover": {
      opacity: 0.72,
    },
    paddingLeft: "20px",
  }));

  useEffect(() => {
    if (id) dispatch(getSyllausContentByIdAsync(id));
  }, []);

  useEffect(() => {
    if (id && syllabuscontentById) {
      formik.setFieldValue("courseId", {
        label: syllabuscontentById?.course,
        value: syllabuscontentById?.courseId,
      });
      formik.setFieldValue("subjectId", {
        label: syllabuscontentById?.subject,
        value: syllabuscontentById?.subjectId,
      });

      formik.setFieldValue("chapterId", {
        label:
          syllabuscontentById?.chpater?.length > 0 &&
          syllabuscontentById?.chpater[0]?.chapter,
        value:
          syllabuscontentById?.chpater?.length > 0 &&
          syllabuscontentById?.chpater[0]?.chapterId,
      });

      formik.setFieldValue("topicId", {
        label:
          syllabuscontentById?.topic?.length > 0 &&
          syllabuscontentById?.topic[0]?.topic,
        value:
          syllabuscontentById?.topic?.length > 0 &&
          syllabuscontentById?.topic[0]?.topicId,
      });
      formik.setFieldValue("language", syllabuscontentById.language);
      formik.setFieldValue("tag", syllabuscontentById.tag);
      formik.setFieldValue("thumbnail", [syllabuscontentById.thumbnailFile]);
      formik.setFieldValue("source", syllabuscontentById.source);
      if (id && syllabuscontentById.source === "upload") {
        formik.setFieldValue("sourceFile", [syllabuscontentById?.sourceFiles]);
      } else {
        formik.setFieldValue("sourceURL", syllabuscontentById?.sourceFiles);
      }
      setHelpingResourse(syllabuscontentById?.resourceType);
      formik.setFieldValue(
        "helpingResourceType",
        syllabuscontentById?.resourceType
      );
    }
  }, [id, syllabuscontentById]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Video Manager | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading={id ? "Update Video Manager" : "Create Video Manager"}
        links={[
          { name: "Syllabus", href: "" },
          {
            name: "Video Manager",
            href: `${PATH_DASHBOARD.content}`,
          },
          { name: id ? "Update Video Manager" : "Create Video Manager" },
        ]}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AutoCompleteCustom
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
          </Grid>
          <Grid item xs={12} md={6}>
            <AutoCompleteCustom
              name="subjectId"
              loading={subjectCourseLoader}
              options={_.map(subjectCourseData?.data, (ev) => {
                return { label: ev.name, value: ev.id };
              })}
              value={formik.values.subjectId}
              onChange={(event, value) => {
                formik.setFieldValue("subjectId", value);
              }}
              label="Select Subject"
              error={formik.touched.subjectId && formik.errors.subjectId}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AutoCompleteCustom
              name="chapterId"
              loading={filterLoader}
              options={_.map(ChapterBySubjectId, (ev) => {
                return { label: ev.name, value: ev.id };
              })}
              value={formik?.values?.chapterId}
              onChange={(event, value) => {
                formik.setFieldValue("chapterId", value);
              }}
              label="Select Chapter"
              error={formik.touched.chapterId && formik.errors.chapterId}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AutoCompleteCustom
              name="topicId"
              loading={scholorshipLoader}
              options={_.map(TopicByMultipleClassBatchSubjectChapter, (ev) => {
                return { label: ev.name, value: ev.id };
              })}
              value={formik.values.topicId}
              onChange={(event, value) => {
                formik.setFieldValue("topicId", value);
              }}
              label="Select Topic"
              error={formik.touched.topicId && formik.errors.topicId}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UploadBox
              height={58}
              name="thumbnail"
              accept={{
                "image/*": [],
              }}
              label="Thumbnail"
              file={formik.values.thumbnail[0]}
              onDrop={handleDrop}
              error={formik.touched.thumbnail && formik.errors.thumbnail}
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Language</InputLabel>
              <Select
                label="Select Language"
                name="language"
                {...formik.getFieldProps("language")}
                onChange={formik.handleChange}
                error={formik.touched.language && formik.errors.language}
              >
                <MenuItem defaultValue value="">
                  Select Language
                </MenuItem>
                {_.map(_language, (ev) => {
                  return <MenuItem value={ev.value}>{ev.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                label="Tag"
                name="tag"
                {...formik.getFieldProps("tag")}
                onChange={formik.handleChange}
                error={formik.touched.tag && formik.errors.tag}
              >
                <MenuItem defaultValue value="">
                  Select Tag
                </MenuItem>
                {_.map(_tag, (ev) => {
                  return <MenuItem value={ev.value}>{ev.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Video Source</InputLabel>{" "}
              <Select
                label="Select Video Source"
                name="source"
                {...formik.getFieldProps("source")}
                onChange={formik.handleChange}
                error={formik.touched.source && formik.errors.source}
              >
                <MenuItem defaultValue value="">
                  Select Topic
                </MenuItem>
                {formik.values.tag === "Help Resource"
                  ? _.map(_topic, (ev) => {
                      return (
                        <MenuItem value={ev.value} disabled={ev.disabled}>
                          {ev.label}
                        </MenuItem>
                      );
                    })
                  : _.map(
                      _topic.filter((ev) => ev.label !== "Upload"),
                      (ev) => {
                        return (
                          <MenuItem value={ev.value} disabled={ev.disabled}>
                            {ev.label}
                          </MenuItem>
                        );
                      }
                    )}
              </Select>
            </FormControl>
          </Grid>
          {/* When sourse = "upload"*/}
          {formik.values.source !== "upload" && formik.values.source !== "" && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  name="sourceURL"
                  label={
                    formik.values.source === "gallarymanager"
                      ? "File Location"
                      : "Video URL"
                  }
                  fullWidth
                  {...formik.getFieldProps("sourceURL")}
                  onChange={formik.handleChange}
                  error={formik.touched.sourceURL && formik.errors.sourceURL}
                />
              </FormControl>
            </Grid>
          )}
          {/* When sourse = upload and tag = Helping Resourse */}
          {formik.values.source === "upload" &&
            formik.values.tag != "Help Resource" && (
              <Grid item xs={12} md={6}>
                <UploadBox
                  otherFile={true}
                  height={58}
                  name="sourceFile"
                  accept={{
                    "video/*": [],
                  }}
                  label="Video"
                  file={formik.values.sourceFile[0]}
                  onDrop={handleThumbnailDrop}
                  error={formik.touched.sourceFile && formik.errors.sourceFile}
                />
                {uploadStart && (
                  <StyledComponent>
                    <Label
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                    >
                      File Size {filesize} Uploading File {fileProgress}%
                      Completed Uploading Speed {uploadspeed} mbps
                    </Label>
                  </StyledComponent>
                )}
              </Grid>
            )}
          {/*For Help Resourse Type When sourse = upload and tag = Help Resourse */}
          {formik.values.source === "upload" &&
            formik.values.tag === "Help Resource" && (
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.helpingResourceType &&
                    formik.errors.helpingResourceType
                  }
                >
                  <InputLabel>Help Resource Type</InputLabel>
                  <Select
                    name="helpingResourceType"
                    label="Help Resource Type"
                    value={getHelpingResourser}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setHelpingResourse(e.target.value);
                    }}
                  >
                    <MenuItem value="">Help Resource Type</MenuItem>
                    {_.map(helpContentType, (evv) => {
                      return <MenuItem value={evv.value}>{evv.label}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}{" "}
          {/*For Help Resourse Type When sourse = upload and tag = Help Resourse and Help Resourse = image*/}
          {formik.values.source === "upload" &&
            formik.values.tag === "Help Resource" &&
            getHelpingResourser === "image" && (
              <Grid item xs={12} md={6}>
                <UploadBox
                  otherFile={true}
                  height={58}
                  name="sourceFile"
                  accept={{
                    "image/*": [],
                  }}
                  label="Image"
                  file={formik.values.sourceFile[0]}
                  onDrop={handleThumbnailDrop}
                  error={formik.touched.sourceFile && formik.errors.sourceFile}
                />
                {uploadStart && (
                  <StyledComponent>
                    <Label
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                    >
                      File Size {filesize} Uploading File {fileProgress}%
                      Completed Uploading Speed {uploadspeed} mbps
                    </Label>
                  </StyledComponent>
                )}
              </Grid>
            )}
          {/*For Help Resourse Type When sourse = upload and tag = Help Resourse and Help Resourse = video*/}
          {formik.values.source === "upload" &&
            formik.values.tag === "Help Resource" &&
            getHelpingResourser === "video" && (
              <Grid item xs={12} md={6}>
                <UploadBox
                  otherFile={true}
                  height={58}
                  name="sourceFile"
                  accept={{
                    "video/*": [],
                  }}
                  label="Video"
                  file={formik.values.sourceFile[0]}
                  onDrop={handleThumbnailDrop}
                  error={formik.touched.sourceFile && formik.errors.sourceFile}
                />
                {uploadStart && (
                  <StyledComponent>
                    <Label
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                    >
                      File Size {filesize} Uploading File {fileProgress}%
                      Completed Uploading Speed {uploadspeed} mbps
                    </Label>
                  </StyledComponent>
                )}
              </Grid>
            )}{" "}
          {/*For Help Resourse Type When sourse = upload and tag = Help Resourse and Help Resourse = pdf*/}
          {formik.values.source === "upload" &&
            formik.values.tag === "Help Resource" &&
            getHelpingResourser === "pdf" && (
              <Grid item xs={12} md={6}>
                <UploadBox
                  otherFile={true}
                  height={58}
                  name="sourceFile"
                  accept={{
                    "application/pdf": [],
                  }}
                  label="PDF"
                  file={formik.values.sourceFile[0]}
                  onDrop={handleThumbnailDrop}
                  error={formik.touched.sourceFile && formik.errors.sourceFile}
                />
                {uploadStart && (
                  <StyledComponent>
                    <Label
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                    >
                      File Size {filesize} Uploading File {fileProgress}%
                      Completed Uploading Speed {uploadspeed} mbps
                    </Label>
                  </StyledComponent>
                )}
              </Grid>
            )}
          <Grid item xs={12} md={6}></Grid>
        </Grid>
        <Stack alignItems="flex-end" sx={{ mt: 1 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik.values.source !== "upload" && syllabusLoader}
            disabled={formik.values.source === "upload" && uploadStart}
          >
            {id ? "Update Video Manager" : "Create Video Manager"}
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

export default CreateContent;

const ComponentLoaderInputLabel = ({ loader, label }) => {
  return loader ? <CustomComponentLoader padding="0 0" size={20} /> : label;
};
