import * as yup from "yup";

export const _initial = {
  name: "",
  shortDescription: "",
  image: [],
  list: [{ list: "" }],
};

export const _validation = yup.object().shape({
  name: yup
    .string()
    .test("no-whitespace", "Whitespace only is not allowed", (value) =>
      value ? value.trim().length > 0 : true
    )
    .required("Field is required"),
  // shortDescription: yup
  //   .string()
  //   .test("no-whitespace", "Whitespace only is not allowed", (value) => {
  //     if (value) {
  //       const strippedValue = value.replace(/<[^>]*>?/gm, ""); // Removes HTML tags
  //       return strippedValue.trim().length > 0;
  //     }
  //     return true;
  //   })
  //   .required("Field is required"),
  image: yup.array().min(1, "Field is required"),
  // list: yup.array().of(
  //   yup.object({
  //     list: yup
  //       .string()
  //       .test("no-whitespace", "Whitespace only is not allowed", (value) =>
  //         value ? value.trim().length > 0 : true
  //       )
  //       .required("Field is required"),
  //   })
  // ),
});
