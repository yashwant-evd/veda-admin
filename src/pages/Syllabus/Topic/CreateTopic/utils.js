import * as yup from "yup";

export const _initial = {
  courseId: "",
  boardId: "",
  classId: "",
  batchTypeId: "",
  chapterId: "",
  subjectId: "",
  name: "",
};

export const _validate = yup.object().shape({
  courseId: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  // boardId: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
  // classId: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
  // batchTypeId: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //     value ? value.trim().length > 0 : true
  //   )
  //   .required("Field is required"),
  chapterId: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  subjectId: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
});
