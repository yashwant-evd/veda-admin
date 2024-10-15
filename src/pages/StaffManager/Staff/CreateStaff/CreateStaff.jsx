import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Grid,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomComponentLoader from "components/CustomComponentLoader";
import CustomBreadcrumbs from "components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { _gender, _initial, _validate, _validateTeMen } from "./utils";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { adminsignupAsync } from "redux/async.api";
import { toastoptions } from "utils/toastoptions";
import { PATH_DASHBOARD } from "routes/paths";
import { toast } from "react-hot-toast";
import { emptysignup } from "redux/slices/signup.slice";
import _, { capitalize } from "lodash";
import {
  getStaffByIdAsync,
  updateStaffByIdAsync,
  getSubjectByMultipleClassIdAsync,
} from "redux/staff/staff.async";
import { getAllDepartmentAsync, getAllDesignationAsync } from "redux/async.api";
import { getRolesWithoutSuperAdminAsync } from "redux/Roles/roles.async";

import UploadBox from "components/CustomUploads/UploadBox";
import { GenerateBase64 } from "utils/convertToBase64";
import { emptystaff } from "redux/staff/staff.slice";
import AutoCompleteCustom from "components/AutoCompleteCustom/AutoCompleteCustom";
import BoxGridTwo from "components/BoxGridTwo/BoxGridTwo";
import TextFieldCustom from "components/TextFieldCustom/TextFieldCustom";
import { getcourseAsync } from "redux/course/course.async";
import { getBoardsByCourseIdAsync } from "redux/board/board.async";
import { getbatchclassByboardIdAsync } from "redux/batchtype/batchtype.async";
import { getClassByBoardAndCourseIdAsync } from "redux/async.api";

export default function CreateStaff() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isTeacherMentor, setIsTeacherMentor] = useState(false);
  const { signupLoader, signup } = useSelector((state) => state.signup);
  const { staffLoader, staffById, staffupdate, getSubjectByMultipleClass } =
    useSelector((state) => state.staff);
  const { rolesLoader, roles, rolesWithoutSuperAdmin } = useSelector(
    (state) => state.roles
  );
  const { batchLoader, batchclassByBoardId } = useSelector(
    (state) => state.batch
  );
  const {
    getALLDeptData,
    getALLDesigData,
    getALLDeptLoader,
    getALLDesigLoader,
  } = useSelector((state) => state.student);

  const { courseLoader, course } = useSelector((state) => state.course);
  const { boardLoader, boardByCourse } = useSelector((state) => state.board);
  const { classLoader, classbycourseboard } = useSelector(
    (state) => state.class
  );
  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  useEffect(() => {
    dispatch(getRolesWithoutSuperAdminAsync({}));
  }, []);

  useEffect(() => {
    if (isTeacherMentor) dispatch(getcourseAsync({}));
  }, [isTeacherMentor]);

  useEffect(() => {
    dispatch(getAllDepartmentAsync({}));
    dispatch(getAllDesignationAsync({}));
  }, []);

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
    console.log("values on submit", values?.TRAINERDEPT, values?.designation);

    const ImageBase64 = await GenerateBase64(values.avatar[0]);
    let payload = {
      id: Number(id),
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      dob: new Date(values.dob),
      gender: values.gender.value,
      avatar: ImageBase64,
      department: values.role.value,
      empCode: values.empCode,
      TRAINERDEPT: values?.TRAINERDEPT,
      designation: values?.designation,
    };

    if (id) {
      delete payload.password;
      dispatch(updateStaffByIdAsync(payload));
    } else {
      delete payload.id;
      dispatch(adminsignupAsync(payload));
    }
  };

  useEffect(() => {
    if (signup.status === 200) {
      toast.success(signup.message, toastoptions);
      dispatch(emptysignup());
      formik.resetForm();
      navigate(PATH_DASHBOARD.staff);
    }
    if (staffupdate.status === 200) {
      toast.success(staffupdate.message, toastoptions);
      dispatch(emptystaff());
      navigate(PATH_DASHBOARD.staff);
    }
  }, [signup, staffupdate]);

  useEffect(() => {
    if (id) dispatch(getStaffByIdAsync(id));
  }, [id]);

  useEffect(() => {
    if (id && staffById) {
      formik.setFieldValue("name", staffById?.name);
      formik.setFieldValue("email", staffById?.email);
      formik.setFieldValue("phone", staffById?.phone);

      formik.setFieldValue("empCode", staffById?.empCode);
      formik.setFieldValue("TRAINERDEPT", staffById?.TRAINERDEPTId);
      formik.setFieldValue("designation", staffById?.designationId);

      formik.setFieldValue("password", "novalues");
      formik.setFieldValue("role", {
        label: capitalize(staffById?.departmentName),
        value: staffById?.departmentId,
      });
      formik.setFieldValue("dob", staffById?.dob?.split("T")[0]);
      formik.setFieldValue("gender", {
        label: capitalize(staffById?.gender),
        value: staffById?.gender,
      });
      if (staffById?.avatar) {
        formik.setFieldValue("avatar", [staffById?.avatar]);
      }
      const subjectInfo = _.map(staffById?.subjectDetails, (ev) => {
        return { label: `${ev.name} (${ev.batchType})`, value: ev.id };
      });

      const classInfo = _.map(staffById?.classDetails, (ev) => {
        return {
          label: `${ev.name}`,
          value: ev.id,
        };
      });
      // formik.setFieldValue("batchId", batchTypesInfo);
      formik.setFieldValue("classId", classInfo);
      formik.setFieldValue("courseId", {
        label: staffById?.course,
        value: staffById?.courseId,
      });
      formik.setFieldValue("boardId", {
        label: staffById?.board,
        value: staffById?.boardId,
      });
    }
  }, [staffById, id]);

  const formik = useFormik({
    initialValues: _initial,
    onSubmit,
    validationSchema: _validate,
  });

  useEffect(() => {
    if (formik.values.batchId && isTeacherMentor) {
      dispatch(
        getSubjectByMultipleClassIdAsync({
          classId: _.map(formik.values?.classId, (e) => e.value),
          // batchTypeIds: _.map(formik.values?.batchId, (e) => e.value)
        })
      );
    }
  }, [formik.values.batchId]);

  // useEffect(() => {
  //   if (formik.values.courseId?.value) {
  //     dispatch(
  //       getBoardsByCourseIdAsync({
  //         courseId: formik.values.courseId?.value,
  //       })
  //     );
  //   }
  // }, [formik.values.courseId]);

  useEffect(() => {
    if (formik.values.boardId?.value) {
      dispatch(
        // getbatchclassByboardIdAsync({
        //   boardId: formik.values.boardId?.value
        // })
        getClassByBoardAndCourseIdAsync({
          boardId: formik.values.boardId?.value,
        })
      );
    }
  }, [formik.values.boardId]);

  useEffect(() => {
    if (formik.values.role) {
      const role =
        formik.values.role.label === "Mentor" ||
        formik.values.role.label === "Teacher";
      setIsTeacherMentor(role);
    }
  }, [formik.values.role]);

  const randomDate = new Date(formik.values.dob);
  const today = new Date();
  const yearCount = today.getFullYear() - randomDate.getFullYear();

  console.log("formik val", _gender);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Staff Manager | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        // heading={id ? "Update Staff" : "Create Staff"}
        links={[
          { name: "Trainer", href: "" },
          { name: "Trainer List", href: PATH_DASHBOARD.staff },
          { name: id ? "Update Trainer" : "Create Trainer" },
        ]}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <BoxGridTwo>
                <TextFieldCustom
                  name="empCode"
                  label="Employee Code"
                  fullWidth
                  error={formik.touched.empCode && formik.errors.empCode}
                  {...formik.getFieldProps("empCode")}
                  onChange={formik.handleChange}
                />

                <TextFieldCustom
                  name="name"
                  label="Name"
                  fullWidth
                  error={formik.touched.name && formik.errors.name}
                  {...formik.getFieldProps("name")}
                  onChange={formik.handleChange}
                />

                {/*<AutoCompleteCustom
                  loading={getALLDeptLoader}
                  name="TRAINERDEPT"
                  options={_.map(getALLDeptData?.data, (ev) => {
                    return { label: capitalize(ev.department), value: ev.id };
                  })}
                  value={formik.values.TRAINERDEPT}
                  onChange={(event, value) =>
                    formik.setFieldValue("TRAINERDEPT", value)
                  }
                  error={
                    formik.touched.TRAINERDEPT && formik.errors.TRAINERDEPT
                  }
                  label="Select Department"
                />*/}

                <FormControl
                  fullWidth
                  disabled={getALLDeptLoader}
                  error={Boolean(
                    formik.touched.TRAINERDEPT && formik.errors.TRAINERDEPT
                  )}
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
                    name="TRAINERDEPT"
                    {...formik.getFieldProps("TRAINERDEPT")}
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

                {/* <AutoCompleteCustom
                  loading={getALLDesigLoader}
                  name="designation"
                  options={_.map(getALLDesigData?.data, (ev) => {
                    return { label: capitalize(ev.designation), value: ev.id };
                  })}
                  value={formik.values.designation}
                  onChange={(event, value) =>
                    formik.setFieldValue("designation", value)
                  }
                  error={
                    formik.touched.designation && formik.errors.designation
                  }
                  label="Select Designation"
                /> */}

                <FormControl
                  fullWidth
                  disabled={getALLDesigLoader}
                  error={Boolean(
                    formik.touched.designation && formik.errors.designation
                  )}
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
                </FormControl>

                <TextFieldCustom
                  name="email"
                  label="Email"
                  fullWidth
                  error={formik.touched.email && formik.errors.email}
                  {...formik.getFieldProps("email")}
                  onChange={formik.handleChange}
                />
                <TextFieldCustom
                  type="number"
                  name="phone"
                  label="Phone"
                  fullWidth
                  error={formik.touched.phone && formik.errors.phone}
                  {...formik.getFieldProps("phone")}
                  onChange={(e) => {
                    if (String(e.target.value).length <= 10) {
                      formik.handleChange(e);
                    }
                  }}
                />

                {!Boolean(id) && (
                  <TextFieldCustom
                    maxLength={8}
                    name="Password"
                    label={
                      formik.values.password.length !== 0 &&
                      formik.values.password.length < 8
                        ? formik.errors.password
                        : "Password"
                    }
                    fullWidth
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    {...formik.getFieldProps("password")}
                    onChange={formik.handleChange}
                  />
                )}
                <TextFieldCustom
                  type="date"
                  name="dob"
                  label="Date of Birth"
                  error={formik.touched.dob && formik.errors.dob}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                  {...formik.getFieldProps("dob")}
                  onChange={formik.handleChange}
                />

                <AutoCompleteCustom
                  name="gender"
                  options={_gender}
                  value={formik.values.gender}
                  onChange={(event, value) =>
                    formik.setFieldValue("gender", value)
                  }
                  error={formik.touched.gender && formik.errors.gender}
                  label="Select Gender"
                />

                <AutoCompleteCustom
                  loading={rolesLoader}
                  name="role"
                  options={_.map(rolesWithoutSuperAdmin?.data, (ev) => {
                    return { label: capitalize(ev?.role), value: ev?.id };
                  })}
                  value={formik.values.role}
                  onChange={(event, value) =>
                    formik.setFieldValue("role", value)
                  }
                  error={formik.touched.role && formik.errors.role}
                  label="Select Role"
                />

                {isTeacherMentor && (
                  <>
                    <AutoCompleteCustom
                      loading={courseLoader}
                      name="courseId"
                      options={_.map(course?.data, (ev) => {
                        return { label: ev.name, value: ev.id } || [];
                      })}
                      value={formik.values.courseId}
                      onChange={(event, value) =>
                        formik.setFieldValue("courseId", value)
                      }
                      error={formik.touched.courseId && formik.errors.courseId}
                      label="Select Course"
                    />
                    <AutoCompleteCustom
                      loading={boardLoader}
                      name="boardId"
                      options={_.map(boardByCourse, (ev) => {
                        return { label: ev?.name, value: ev?.id } || [];
                      })}
                      value={formik.values.boardId}
                      onChange={(event, value) =>
                        formik.setFieldValue("boardId", value)
                      }
                      error={formik.touched.boardId && formik.errors.boardId}
                      label="Select Board"
                    />
                    {/* <AutoCompleteCustom
                        multiple={true}
                        loading={batchLoader}
                        name="batchId"
                        options={_.map(batchclassByBoardId, (ev) => {
                          return {
                            label: `${ev.batchType} (${ev.class})`,
                            value: ev.batchTypeId,
                          };
                        })}
                        value={formik.values.batchId}
                        onChange={(event, value) =>
                          formik.setFieldValue("batchId", value)
                        }
                        error={formik.touched.batchId && formik.errors.batchId}
                        label="Select Batch"
                      /> */}
                    <AutoCompleteCustom
                      multiple={true}
                      loading={classLoader}
                      name="classId"
                      options={_.map(classbycourseboard, (ev) => {
                        return (
                          {
                            label: ev.name,
                            value: ev.id,
                          } || []
                        );
                      })}
                      value={formik?.values?.classId}
                      onChange={(event, value) =>
                        formik.setFieldValue("classId", value)
                      }
                      error={formik.touched.classId && formik.errors.classId}
                      label="Select Class"
                    />
                    {/* <AutoCompleteCustom
                        multiple={true}
                        name="subjectId"
                        loading={staffLoader}
                        options={_.map(
                          getSubjectByMultipleClass?.data,
                          (ev) => {
                            return {
                              label: `${ev.subject} (${ev.batchTypeName})`,
                              value: ev.id
                            };
                          }
                        )}
                        value={formik.values.subjectId}
                        onChange={(event, value) =>
                          formik.setFieldValue("subjectId", value)
                        }
                        error={
                          formik.touched.subjectId && formik.errors.subjectId
                        }
                        label="Select Subject"
                      /> */}
                  </>
                )}

                <UploadBox
                  height={58}
                  name="avatar"
                  label="Profile"
                  accept={{
                    "image/*": [],
                  }}
                  onDrop={handleDrop}
                  file={formik.values.avatar[0]}
                  error={formik.touched.image && formik.errors.image}
                />
              </BoxGridTwo>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {yearCount >= 18 == true ? (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={signupLoader || staffLoader}
                  >
                    {Boolean(id) ? "Update Trainer" : "Create Trainer"}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    variant="contained"
                    loading={signupLoader || staffLoader}
                    onClick={() =>
                      toast.error(
                        "Trainer account can't be created untill age is 18 years",
                        toastoptions
                      )
                    }
                  >
                    {Boolean(id) ? "Update Trainer" : "Create Trainer"}
                  </LoadingButton>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
