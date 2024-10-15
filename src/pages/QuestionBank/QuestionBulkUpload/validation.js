import * as yup from "yup";

export const _initial = {
  file: [],
};

export const _validate = yup.object().shape({
  file: yup.array().min(1, "Field is required"),
});
