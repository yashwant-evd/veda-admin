import * as yup from "yup";

export const _initialValues = {
  key:"",
  value:"",
  lang:"",
};

export const pollPageValidate = yup.object().shape({
  key: yup.string().required("Field is required"),
  value: yup.string().required("Field is required"),
  lang: yup.string().required("Field is required"),
});

export const statusOptions = [
  {id: 1, name: "completed"},
  {id: 2, name: "current"},
  {id: 3, name: "upcoming"},
];
