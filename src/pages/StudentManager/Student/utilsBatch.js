import * as yup from "yup";

export const _initialValues = {
  batchTypeId: "",
};

export const _validation = yup.object().shape({

  // department: yup.string().required("Field is required"),
  // designation: yup.string().required("Field is required"),
  // name: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
  // phone: yup.string().required("Field is required"),
  // dob: yup.string().required("Field is required"),
  // pincode: yup.string().required("Field is required"),
  // mPin: yup.string().required("Field is required"),
  // gender: yup.string().required("Field is required"),
  // courseId: yup.string().required("Field is required"),
  // boardId: yup.string().required("Field is required"),
  // classId: yup.string().required("Field is required"),
  // batchTypeId: yup.string().required("Field is required"),
  // email: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
});
