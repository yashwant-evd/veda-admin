import * as yup from "yup";

export const _initialValues = {
  title: "",
  message: "",
  fromDate: "",
  toDate: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  status: "",
};

export const pollPageValidate = yup.object().shape({
  title: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  message: yup.string().test('no-whitespace', 'Whitespace only is not allowed', value => (value ? value.trim().length > 0 : true))
  .required("Field is required"),
  option1: yup.string().test('no-whitespace', 'Whitespace only is not allowed', value => (value ? value.trim().length > 0 : true))
  .required("Field is required"),
  option2: yup.string().test('no-whitespace', 'Whitespace only is not allowed', value => (value ? value.trim().length > 0 : true))
  .required("Field is required"),
  // option3: yup.string().required("Field is required"),
  // option4: yup.string().required("Field is required"),
  // option3: yup.array().min(1, "Field is required"),
  // option4: yup.array().min(1, "Field is required"),
  fromDate: yup.string().required(),
  toDate: yup.string().required(),
});

export const statusOptions = [
  { id: 1, name: "completed" },
  { id: 2, name: "current" },
  { id: 3, name: "upcoming" },
];

export const dataOption2 = [
  { id: 1, name: "Noida" },
  { id: 2, name: "faridabad" },
  { id: 3, name: "hariyana" },
  { id: 4, name: "rajasthan" },
];

export const dataOption3 = [
  { id: 1, name: "Bareily" },
  { id: 2, name: "faizabad" },
  { id: 3, name: "haridwar" },
  { id: 4, name: "gurugram" },
];

export const dataOption4 = [
  { id: 1, name: "Mumbai" },
  { id: 2, name: "Rachi" },
  { id: 3, name: "Raipur" },
  { id: 4, name: "New edlhi" },
];
