import * as yup from "yup";

export const _initial = {
  role: "",
};

export const _validation = yup.object().shape({
  role: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
});
