import {
  FormControl,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { Helmet } from "react-helmet-async";
import { Box, Container, Stack } from "@mui/system";
import React, { useState } from "react";
import CustomComponentLoader from "components/CustomComponentLoader";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { UploadAvatar } from "components/upload";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { _initialValues, _validation } from "./utils";
import { useParams } from "react-router";
import "../student.css";
import { GenerateBase64 } from "utils/convertToBase64";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment/moment";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import {
  getBatchByCourseBoardClassAsync,
  getBoardsByCourseIdAsync,
  getClassByBoardAndCourseIdAsync,
  createStudentAsync,
  getstudentbyidAsync,
  updateStudentByIdAsync,
  getAllDepartmentAsync,
  getAllDesignationAsync,
} from "redux/async.api";
import { getcourseAsync } from "redux/course/course.async";
import { getBatchDateByBatchTypeIdAsync } from "redux/batchdate/batchdate.async";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import { getStateFilterAsync } from "redux/filter/filter.async";
import { getCityAsync } from "redux/city/cities.async";

function BasicDetail({ studentInfo, studentid }) {
  const { filterLoader, stateFilter } = useSelector(
    (state) => state.filterInfo
  );

  const { cityLoader, city } = useSelector((state) => state.city);

  const [stateVal, setStateVal] = useState({ id: "", name: "" });
  const [inputValue, setInputValue] = useState("");

  const [cityVal, setCityVal] = useState({ id: "", name: "" });
  const [type, setType] = useState({ id: "", name: "" });
  const [inputCityValue, setCityInputValue] = useState("");
  const [deptVal, setDeptVal] = useState({ id: "", department: "" });
  const [inputDeptValue, setInputDeptValue] = useState("");

  const [desVal, setDesVal] = useState({ id: "", designation: "" });
  const [inputDesValue, setInputDesValue] = useState("");

  const [checkedEvent, setCheckedEvent] = useState([]);
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckedEvent(typeof value === "string" ? value.split(",") : value);
  };

  const eventTypes = ["Self", "Team"];

  let selfExists = checkedEvent.includes("Self");
  let teamExists = checkedEvent.includes("Team");

  const {
    studentLoader,
    studentById,
    getALLDeptData,
    getALLDesigData,
    getALLDeptLoader,
    getALLDesigLoader,
  } = useSelector((state) => state.student);

  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { courseLoader, course } = useSelector((state) => state.course);
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const { batchLoader, batchByCourseBoardClass, batches } = useSelector(
    (state) => state.batch
  );
  const { batchdateLoader, getBatchDateByBatchTypeId } = useSelector(
    (state) => state.batchdate
  );

  useEffect(() => {
    dispatch(getAllBatchTypes({}));
    dispatch(getStateFilterAsync({}));
    dispatch(
      getCityAsync({
        page: "",
        limit: "",
        city: "",
        state: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getCityAsync({
        page: "",
        limit: "",
        city: "",
        state: stateVal?.name,
      })
    );
  }, [stateVal?.name]);

  useEffect(() => {
    setCityVal({ id: "", name: "" });
    setCityInputValue("");
  }, [stateVal]);

  const getCourseAsync = () => {
    dispatch(
      getcourseAsync({
        page: "",
        limit: "",
      })
    );
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      formik.setFieldValue("avatar", [newFile]);
    }
  };

  const onSubmit = async (values) => {
    let imageBase64 = "";

    if (values?.avatar[0] !== null) {
      imageBase64 = await GenerateBase64(values.avatar[0]);
    }

    const birthdateMoment = moment(values.dob);
    const currentDateMoment = moment();
    const ageInYears = currentDateMoment.diff(birthdateMoment, "years");

    if (values.phone.toString().length !== 10) {
      toast.error("Phone number should be 10 digits");
      toastoptions;
      return;
    }

    // if (values.pincode.toString().length !== 6) {
    //   toast.error("Pin code should be 6 digit");
    //   toastoptions;
    //   return;
    // }

    if (values.mPin.toString().length !== 4) {
      toast.error("M-Pin  should be 4 digit");
      toastoptions;
      return;
    }

    // if (ageInYears < 18) {
    //   toast.error(
    //     "You must be at least 18 years old to register.",
    //     toastoptions
    //   );
    //   return;
    // }

    let payload = {
      employeeCode: values.empCode,
      Department: deptVal?.id,
      Designation: desVal?.id,
      avatar: imageBase64,
      id: parseInt(id),
      gender: values.gender,
      batchTypeId: values.batchTypeId,
      name: values.name,
      dob: values.dob,
      // pincode: values.pincode.toString(),
      mPin: values.mPin.toString(),
      phone: values.phone.toString(),
      email: values.email,
      selfAuthType: selfExists,
      teamAuthType: teamExists,
      state: stateVal.id,
      city: cityVal.id || "",
      TId: values.tid,
      type: values.type,
    };

    if (id) {
      delete payload.phone;
      delete payload.mPin;
      dispatch(updateStudentByIdAsync(payload));
    } else {
      delete payload.id;
      dispatch(createStudentAsync(payload));
    }
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: _validation,
  });

  const randomDate = new Date(formik.values.dob);
  const today = new Date();
  const yearCount = today.getFullYear() - randomDate.getFullYear();
  useEffect(() => {
    getCourseAsync();
  }, []);

  // useEffect(() => {
  //   if (formik.values.courseId) {
  //     dispatch(
  //       getBoardsByCourseIdAsync({
  //         courseId: formik.values.courseId,
  //       })
  //     );
  //   }
  // }, [formik.values.courseId]);

  useEffect(() => {
    dispatch(getAllDepartmentAsync({}));
    dispatch(getAllDesignationAsync({}));
  }, []);

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
  }, [formik.values.classId]);

  useEffect(() => {
    if (id) {
      dispatch(getstudentbyidAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && studentById) {
      formik.setFieldValue("empCode", studentById.employeeCode);
      formik.setFieldValue("department", studentById.departmentId);
      formik.setFieldValue("designation", studentById.designationId);
      formik.setFieldValue("avatar", [studentById.avatar]);
      formik.setFieldValue("gender", studentById.gender);
      formik.setFieldValue("batchTypeId", studentById.batchTypeId);
      formik.setFieldValue("name", studentById.name);
      formik.setFieldValue("dob", moment(studentById.dob).format("YYYY-MM-DD"));
      // formik.setFieldValue("pincode", studentById.pincode);
      formik.setFieldValue("phone", studentById.phone);
      // formik.setFieldValue("batchStartDateId", studentById.batchStartDateId);
      formik.setFieldValue("mPin", "null");
      formik.setFieldValue("email", studentById.email);
      formik.setFieldValue("type", studentById?.type);
      formik.setFieldValue("tid", studentById.TId);

      setDeptVal({
        id: studentById.departmentId || "",
        department: studentById.department || "",
      });

      setDesVal({
        id: studentById.designationId || "",
        designation: studentById.designation || "",
      });

      setStateVal({
        id: studentById.state || "",
        name: studentById.stateName || "",
      });
      setCityVal({
        id: studentById.city || "",
        name: studentById.cityName || "",
      });
    }
  }, [id, studentById]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Student Manager | {`${tabTitle}`}</title>
      </Helmet>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <UploadAvatar
                name="avatar"
                accept={{
                  "image/*": [],
                }}
                file={formik.values.avatar[0]}
                error={formik.touched.avatar && formik.errors.avatar}
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
                        formik.touched.avatar && formik.errors.avatar
                          ? "red"
                          : "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <FormControl fullWidth>
                <TextField
                  name="tid"
                  // disabled={id && studentById?.employeeCode}
                  inputProps={{ maxLength: 8 }}
                  label={
                    studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      " TID"
                    )
                  }
                  {...formik.getFieldProps("tid")}
                  onChange={formik.handleChange}
                  error={formik.touched.tid && formik.errors.tid}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  name="empCode"
                  // disabled={id && studentById?.employeeCode}
                  inputProps={{ maxLength: 10 }}
                  label={
                    studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      " Employee Code"
                    )
                  }
                  {...formik.getFieldProps("empCode")}
                  onChange={formik.handleChange}
                  error={formik.touched.empCode && formik.errors.empCode}
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  value={deptVal}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setDeptVal(newValue);
                    } else {
                      setDeptVal({ id: "", department: "" });
                    }
                  }}
                  inputValue={inputDeptValue}
                  onInputChange={(event, newInputValue) => {
                    setInputDeptValue(newInputValue);
                  }}
                  id="department"
                  options={getALLDeptData?.data || []}
                  getOptionLabel={(dept) => dept.department}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" />
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  value={desVal}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setDesVal(newValue);
                    } else {
                      setDesVal({ id: "", designation: "" });
                    }
                  }}
                  inputValue={inputDesValue}
                  onInputChange={(event, newInputValue) => {
                    setInputDesValue(newInputValue);
                  }}
                  id="designation"
                  options={getALLDesigData?.data || []}
                  getOptionLabel={(des) => des.designation}
                  renderInput={(params) => (
                    <TextField {...params} label="Designation" />
                  )}
                />
              </FormControl>

              {/*<FormControl
                fullWidth
                disabled={getALLDeptLoader}
                error={formik.touched.department && formik.errors.department}
              >
                <InputLabel>
                  {getALLDeptLoader ? (
                    <CustomComponentLoader padding="0 0" size={20} />
                  ) : (
                    "Department"
                  )}
                </InputLabel>
                <Select
                  label="Department"
                  name="department"
                  {...formik.getFieldProps("department")}
                  onChange={formik.handleChange}
                >
                  <MenuItem defaultValue value="">
                    Select Department
                  </MenuItem>
                  {getALLDeptData?.data?.map((ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={ev.id}>
                        {ev.department}
                      </MenuItem>
                    );
                  })}
                </Select>
                </FormControl> 
              <FormControl
                fullWidth
                disabled={getALLDesigLoader}
                error={formik.touched.designation && formik.errors.designation}
              >
                <InputLabel>
                  {getALLDesigLoader ? (
                    <CustomComponentLoader padding="0 0" size={20} />
                  ) : (
                    "Designation"
                  )}
                </InputLabel>
                <Select
                  label="Designation"
                  name="designation"
                  {...formik.getFieldProps("designation")}
                  onChange={formik.handleChange}
                >
                  <MenuItem defaultValue value="">
                    Select Designation
                  </MenuItem>
                  {getALLDesigData?.data?.map((ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={ev.id}>
                        {ev.designation}
                      </MenuItem>
                    );
                  })}
                </Select>
                </FormControl> */}

              <FormControl
                fullWidth
                disabled={batchLoader}
                error={formik.touched.batchTypeId && formik.errors.batchTypeId}
              >
                <InputLabel>
                  {batchLoader ? (
                    <CustomComponentLoader padding="0 0" size={20} />
                  ) : (
                    "Batches"
                  )}
                </InputLabel>
                <Select
                  label="Batch Name"
                  name="batchTypeId"
                  {...formik.getFieldProps("batchTypeId")}
                  onChange={formik.handleChange}
                >
                  <MenuItem defaultValue value="">
                    Select Batch
                  </MenuItem>
                  {batches?.data?.map((ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={ev.index}>
                        {ev.batchTypeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  name="name"
                  label={
                    studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      " Employee Name"
                    )
                  }
                  {...formik.getFieldProps("name")}
                  onChange={formik.handleChange}
                  error={formik.touched.name && formik.errors.name}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  name="dob"
                  label="Date of Joining"
                  style={{ color: id ? "white !important" : null }}
                  fullWidth
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                  {...formik.getFieldProps("dob")}
                  onChange={formik.handleChange}
                  error={formik.touched.dob && formik.errors.dob}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  name="email"
                  // disabled={id && studentById?.email}
                  label={
                    studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Email"
                    )
                  }
                  {...formik.getFieldProps("email")}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Gender
                </InputLabel>
                <Select
                  label="Select Gender Type"
                  name="gender"
                  {...formik.getFieldProps("gender")}
                  onChange={(e) =>
                    formik.setFieldValue("gender", e.target.value)
                  }
                  error={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  name="phone"
                  type="number"
                  minLength={10}
                  // inputProps={{ minLength: 10 }}
                  inputProps={{ maxLength: 10 }}
                  // disabled={id && studentById?.phone}
                  label={
                    studentLoader ? (
                      <CustomComponentLoader padding="0 0" size={20} />
                    ) : (
                      "Phone"
                    )
                  }
                  {...formik.getFieldProps("phone")}
                  onChange={(e) => {
                    if (String(e.target.value).length <= 10) {
                      formik.handleChange(e);
                    }
                  }}
                  error={formik.touched.phone && formik.errors.phone}
                />
              </FormControl>

              {id ? (
                ""
              ) : (
                <FormControl fullWidth>
                  <TextField
                    name="mPin"
                    type="number"
                    label={
                      studentLoader ? (
                        <CustomComponentLoader padding="0 0" size={20} />
                      ) : (
                        "M-Pin"
                      )
                    }
                    {...formik.getFieldProps("mPin")}
                    onChange={(e) => {
                      if (String(e.target.value).length <= 4) {
                        formik.handleChange(e);
                      }
                    }}
                    error={formik.touched.mPin && formik.errors.mPin}
                  />
                </FormControl>
              )}

              <FormControl fullWidth>
                <Autocomplete
                  value={stateVal}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setStateVal(newValue);
                    } else {
                      setStateVal({ id: "", name: "" });
                    }
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="state"
                  options={stateFilter}
                  getOptionLabel={(state) => state.name}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  value={cityVal}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setCityVal(newValue);
                    } else {
                      setCityVal({ id: "", name: "" });
                    }
                  }}
                  inputValue={inputCityValue}
                  onInputChange={(event, newInputValue) => {
                    setCityInputValue(newInputValue);
                  }}
                  id="city"
                  options={city.data || []}
                  getOptionLabel={(city) => city.name}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                />
              </FormControl>

              <FormControl
                fullWidth
                error={formik.touched.type && formik.errors.type}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  {...formik.getFieldProps("type")}
                  onChange={formik.handleChange}
                >
                  <MenuItem defaultValue value="">
                    Select Type
                  </MenuItem>
                  {[
                    { id: 1, name: "Student" },
                    { id: 2, name: "Trainer" },
                  ]?.map((ev, index) => {
                    return (
                      <MenuItem value={ev.name} key={ev.index}>
                        {ev?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/*<FormControl fullWidth>
                <Autocomplete
                  value={type}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setType(newValue);
                    } else {
                      setType({ id: "", name: "" });
                    }
                  }}
                  inputValue={inputTypeValue}
                  onInputChange={(event, newInputValue) => {
                    setTypeInputValue(newInputValue);
                  }}
                  id="type"
                  options={[
                    { id: 1, name: "Student" },
                    { id: 2, name: "Trainer" },
                  ]}
                  getOptionLabel={(city) => city.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" />
                  )}
                />
                </FormControl> */}

              {!id && (
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select Event
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={checkedEvent}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Event" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {eventTypes.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={checkedEvent.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={studentLoader}
              >
                {id ? "Update Employee" : "Create Employee"}
              </LoadingButton>
            </Stack>

            {/* yearCount >= 9 == true ? (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={studentLoader}
                >
                  {id ? "Update Employee" : "Create Employee"}
                </LoadingButton>
              </Stack>
            ) : (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  variant="contained"
                  loading={studentLoader}
                  onClick={() =>
                    toast.error(
                      "Employee account can't be created untill age is 9 years",
                      toastoptions
                    )
                  }
                >
                  {id ? "Update Employee" : "Create Employee"}
                </LoadingButton>
              </Stack>
                )*/}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default BasicDetail;
