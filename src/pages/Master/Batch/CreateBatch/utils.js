import * as yup from "yup";

export const _initial = {
  courseId: "",
  boardId: "",
  classId: "",
  trainerId: "",
  name: "",
  startDate: "",
  endDate: "",
};

export const _validate = yup.object().shape({
  courseId: yup.string().required("Field is required"),
  // trainerId: yup.string().required("Field is required"),
  // boardId: yup.string().required("Field is required"),
  // classId: yup.string().required("Field is required"),
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  startDate: yup.string().required("Field is required"),
  endDate: yup.string().required("Field is required"),
});
