import * as yup from "yup";

export const _initialValues = {
  course: "",
  boards: "",
  class: "",
  batch: "",
  student: [],
  title: "",
  // backlink: "",
  image: [],
  description: "",

  //  for backLink
  buttonLink:"",
  otherLink: "",
  backLinkId:"",
  //  for backLink
};

export const noticePageValidate = yup.object().shape({
  course: yup.string().required("Field is required"),
  boards: yup.string().required("Field is required"),
  class: yup.string().required("Field is required"),
  batch: yup.string().required("Field is required"),
  student: yup.array().min(1, "Field is required"),
  title: yup.string().required("Field is required"),
  // backlink: yup.string().required("Field is required"),
  image: yup.array().min(1, "Field is required"),
  description: yup.string().required("Field is required"),

  // for backLink
  otherLink: yup.string().when("type",{
    is: (ev) => ev === "other",
    then:yup.string().required(),
    otherwise: yup.string()
  }),
  backLinkId: yup.string().when("type",{
    is: (ev) => ev === "other",
    then:yup.string().required(),
    otherwise: yup.string()
  }),

  // for backLink
});

export const options = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
