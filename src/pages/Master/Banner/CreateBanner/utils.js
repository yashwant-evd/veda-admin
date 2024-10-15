import * as yup from "yup";

export const _initial = {
  image: [],
  type: "",
  title: "",
  bannerurl: "",
  courseId: {},
  boardId: {},
  classId: [],
  batchTypeId: {},
};

export const _validate = yup.object().shape({
  image: yup.array().min(1, "required"),
  type: yup.string().required(),
  title: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required(),
  bannerurl: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required(),

  courseId: yup.object({
    label: yup.string().required(),
  }),
  // boardId: yup.object({
  //   label: yup.string().required(),
  // }),
  // classId: yup.array().min(1, "Field is required"),
});
