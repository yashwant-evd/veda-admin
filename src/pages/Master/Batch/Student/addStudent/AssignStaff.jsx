import { Helmet } from "react-helmet-async";
import { Container, Card } from "@mui/material";
import { PATH_DASHBOARD } from "routes/paths";
import CustomBreadcrumbs from "components/custom-breadcrumbs";
import { useSettingsContext } from "components/settings";
import { useSelector } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import { useEffect } from "react";
import StaffDetails from "./StaffDetails";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { emptyStudent } from "redux/slices/student.slice";
import { useNavigate, useParams } from "react-router";

export default function AssignStaff({ studentInfo }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { batchId } = useParams();
  const formik = useFormik({});
  const dispatch = useDispatch();
  const [studentid, setStudentid] = React.useState();
  const { studentadd, studentupdate, students } = useSelector(
    (state) => state.student
  );

  const tabTitle = useSelector(
    (state) => state?.admin?.adminSetting?.siteTitle
  );

  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    if (studentadd.status === 200) {
      toast.success(studentadd.message, toastoptions);
      setStudentid(studentadd);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      formik.resetForm();
      dispatch(emptyStudent());
      navigate(PATH_DASHBOARD.batchtype);
    }
  }, [studentadd]);

  useEffect(() => {
    if (studentupdate.status === 200) {
      toast.success(studentupdate.message, toastoptions);
      setStudentid(studentupdate);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      formik.resetForm();
      dispatch(emptyStudent());
      navigate(PATH_DASHBOARD.batchtype);
    }
  }, [studentupdate]);

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Staff | {`${tabTitle}`}</title>
      </Helmet>
      <CustomBreadcrumbs
        links={[
          { name: "Batch", href: "" },
          { name: "Batch", href: `${PATH_DASHBOARD.batchtype}` },
          { name: batchId ? "Assign Staff" : "Update Staff" },
        ]}
      />
      <Card sx={{ pt: 3, px: 5, height: "80vh" }}>
        <Box sx={{ width: "100%" }}>
          <StaffDetails
            studentInfo={studentInfo}
            // batchById={batchById}
            batchId={batchId}
          />
        </Box>
      </Card>
    </Container>
  );
}
