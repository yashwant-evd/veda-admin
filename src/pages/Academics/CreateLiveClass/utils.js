import * as yup from "yup";

export const _initial = {
  subjectId: {},
  chapterId: {},
  batchTypeId: {},
  teacherId: {},
  type: "",
  attemptBy: "",
  time: "",
  date: ""
};

export const _validate = yup.object().shape({
  subjectId: yup.object({
    label: yup.string().required()
  }),
  batchTypeId: yup.object({
    label: yup.string().required()
  }),
  // chapterId: yup.object({
  //   label: yup.string().required()
  // }),
  teacherId: yup.object({
    label: yup.string().required()
  }),
  type: yup.string().required("Field is required"),
  time: yup.string().required("Field is required"),
  attemptBy: yup.string().required("Field is required")
});

export const _type = [
  {
    value: "Live Class",
    label: "Live Class"
  },
  {
    value: "Doubt Class",
    label: "Doubt Class"
  },
  {
    value: "Demo Class",
    label: "Demo Class"
  },
  {
    value: "Mentorship",
    label: "Mentorship"
  }
];

export const _time = [
  {
    value: "00:15:00",
    label: "15 mins"
  },
  {
    value: "00:30:00",
    label: "30 mins"
  },
  {
    value: "00:45:00",
    label: "45 mins"
  },
  {
    value: "00:60:00",
    label: "60 mins"
  }
];
