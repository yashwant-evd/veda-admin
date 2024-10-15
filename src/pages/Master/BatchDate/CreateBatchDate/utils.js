import * as yup from "yup";

export const _initial = {
  class: "",
  boards: "",
  course: "",
  batch: "",
  batchDate: "",
};

export const _validate = yup.object().shape({
  course: yup.string().required("Field is required"),
  boards: yup.string().required("Field is required"),
  class: yup.string().required("Field is required"),
  batch: yup.string().required("Field is required"),
  batchDate: yup.string().required("Field is required"),
});
