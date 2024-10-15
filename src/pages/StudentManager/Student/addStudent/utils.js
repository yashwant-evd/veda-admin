import * as yup from "yup";

export const _initialValues = {
  empCode: "",
  department: "",
  designation: "",
  avatar: [],
  gender: "",
  courseId: "",
  boardId: "",
  classId: "",
  batchTypeId: "",
  name: "",
  dob: "",
  pincode: "",
  mPin: "",
  phone: "",
  batchStartDateId: "",
  email: "",
  tid: "",
  type: "",
};

export const _validation = yup.object().shape({
  // avatar: yup.array().min(1, "Field is required"),
  // batchStartDateId: yup.string().required("Field is required"),

  tid: yup
    .string()
    .test(
      "no-whitespace-or-only-zeros",
      "Whitespace or only zeros are not allowed",
      (value) =>
        value
          ? value.trim().length > 0 &&
            value.trim() !== "0" &&
            !/^0+$/.test(value.trim())
          : true
    )
    .required("Field is required"),

  // empCode: yup
  //   .string()
  //   .test(
  //     "no-whitespace-or-only-zeros",
  //     "Whitespace or only zeros are not allowed",
  //     (value) =>
  //       value
  //         ? value.trim().length > 0 &&
  //           value.trim() !== "0" &&
  //           !/^0+$/.test(value.trim())
  //         : true
  //   )
  //   .required("Field is required"),

  // department: yup.string().required("Field is required"),
  // designation: yup.string().required("Field is required"),
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  phone: yup.string().required("Field is required"),
  type: yup.string().required("Field is required"),
  dob: yup.string().required("Field is required"),
  // pincode: yup.string().required("Field is required"),
  mPin: yup.string().required("Field is required"),
  // gender: yup.string().required("Field is required"),
  // courseId: yup.string().required("Field is required"),
  // boardId: yup.string().required("Field is required"),
  // classId: yup.string().required("Field is required"),
  batchTypeId: yup.string().required("Field is required"),
  // email: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
});
