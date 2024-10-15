import * as yup from "yup";
export const _initial = {
  name: "",
  empCode: "",
  email: "",
  phone: "",
  password: "",
  department: "",
  designation: "",
  TRAINERDEPT: "",
  dob: "",
  gender: {},
  avatar: [],
  role: {},
  courseId: {},
  boardId: {},
  classId: [],
  image: [],
};

export const _validate = yup.object().shape({
  designation: yup.string().required("Field is required"),
  TRAINERDEPT: yup.string().required("Field is required"),
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  empCode: yup
    .string()
    .test(
      "no-whitespace-or-only-zeros",
      "Whitespace or only zeros are not allowed",
      (value) =>
        value
          ? value.trim().length > 0 &&
            value.trim() !== "0" &&
            !/^0+$/.test(value.trim())
          : true
    )
    .required("Field is required"),
  email: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .email("Invalid Email Address")
    .required("Field is required"),
  phone: yup
    .number()
    .min(10, "Must be Minimum 10 digits")
    .required("Field is required"),
  password: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required")
    .min(8, "Must be Minimum 8 charecters"),
  dob: yup.string().required("Field is required"),
  gender: yup.object().shape({
    label: yup.string().required("Field is required"),
  }),
  role: yup.object().shape({
    label: yup.string().required("Field is required"),
  }),
  courseId: yup.object().when("role", {
    is: (ev) => ev.label === "Mentor" || ev.label === "Teacher",
    then: yup.object().shape({
      label: yup.string().required("Field is required"),
    }),
    otherwise: yup.object(),
  }),
  boardId: yup.object().when("role", {
    is: (ev) => ev.label === "Mentor" || ev.label === "Teacher",
    then: yup.object().shape({
      label: yup.string().required("Field is required"),
    }),
    otherwise: yup.object(),
  }),
  classId: yup.array().when("role", {
    is: (ev) => ev?.label === "Mentor" || ev?.label === "Teacher",
    then: yup.array().min(1, "Field is required"),
    otherwise: yup.array(),
  }),
});

export const _gender = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];
