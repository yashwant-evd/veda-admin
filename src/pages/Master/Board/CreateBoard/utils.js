import * as yup from "yup";

export const _initial = {
  course: "",
  board: "",
};

export const _validate = yup.object().shape({
  course: yup.string().required("Field is required"),
  board: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
});
