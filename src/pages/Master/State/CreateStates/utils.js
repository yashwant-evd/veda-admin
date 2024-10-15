import * as yup from "yup";

export const _initial = {
  name: "",
};

export const _validation = yup.object().shape({
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
});
