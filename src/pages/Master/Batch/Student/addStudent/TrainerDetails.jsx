import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Box, Container, Stack } from "@mui/system";
import React, { useState } from "react";
import CustomComponentLoader from "components/CustomComponentLoader";
import { useSettingsContext } from "components/settings";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { _initialValues, _validation } from "./staffUtils";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "../student.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment/moment";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import {
  getBatchTypeByIdAsync,
  staffBatchAssignAsync,
} from "redux/batchtype/batchtype.async";
import { getAllBatchTypes } from "redux/batchtype/batchtype.async";
import { getStudentAsync } from "redux/async.api";
import { PATH_DASHBOARD } from "routes/paths";

function TrainerDetails({ batchId }) {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedStaffs, setSelectedStaffs] = useState([]);

  const { studentLoader, studentById, students } = useSelector(
    (state) => state.student
  );

  const { batchLoader, batchById, batchByCourseBoardClass, batches } =
    useSelector((state) => state.batch);

  const { batchdateLoader, getBatchDateByBatchTypeId } = useSelector(
    (state) => state.batchdate
  );

  useEffect(() => {
    dispatch(
      getStudentAsync({
        page: "",
        limit: "",
        course: "",
        classes: "",
        search: "",
        type: "Trainer",
      })
    );
  }, []);

  const handleStaffChange = (event) => {
    const value = event.target.value;
    if (value.includes(0)) {
      if (selectedStaffs.length === students?.data?.length) {
        setSelectedStaffs([]);
      } else {
        setSelectedStaffs(students?.data?.map((staff) => staff.id));
      }
    } else {
      setSelectedStaffs(value);
    }
  };

  useEffect(() => {
    dispatch(getAllBatchTypes({}));
  }, []);

  useEffect(() => {
    if (batchId) dispatch(getBatchTypeByIdAsync(batchId));
  }, [batchId]);

  useEffect(() => {
    if (id && studentById) {
      formik.setFieldValue("batchTypeId", studentById.batchTypeId);
    }
  }, [id, studentById]);

  useEffect(() => {
    if (batchId && batchById) {
      formik.setFieldValue("batchTypeId", batchById.id);
    }
  }, [batchId, batchById]);

  const onSubmit = async (values) => {
    let payload = {
      batchId: values.batchTypeId,
      studentIds: selectedStaffs,
    };
    if (selectedStaffs?.length !== 0) {
      dispatch(staffBatchAssignAsync(payload)).then((res) => {
        if (res.payload.status === 200) {
          toast.success(res.payload.message, toastoptions);
          navigate(PATH_DASHBOARD.batchtype);
        }
      });
    } else {
      toast.error("Please select at least one trainer", toastoptions);
    }
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: _validation,
  });

  return (
    <Container maxWidth={themeStretch ? "lg" : false}>
      <Helmet>
        <title>Staff Manager </title>
      </Helmet>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {" "}
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Trainer
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedStaffs}
                  onChange={handleStaffChange}
                  renderValue={(selected) => "Staff Selected..."}
                >
                  <MenuItem key={0} value={0}>
                    <Checkbox
                      checked={selectedStaffs.length === students?.data?.length}
                    />
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {students?.data?.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      <Checkbox
                        checked={selectedStaffs.indexOf(staff.id) > -1}
                      />
                      <ListItemText
                        primary={
                          `(${staff.name})` +
                          " " +
                          (staff.employeeCode ? staff.employeeCode : "")
                        }
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
            >
              <FormControl
                fullWidth
                disabled={batchById && !id ? batchById : batchLoader}
              >
                <InputLabel>
                  {batchLoader ? (
                    <CustomComponentLoader padding="0 0" size={20} />
                  ) : (
                    "Batch"
                  )}
                </InputLabel>
                <Select
                  label="Batch Name"
                  name="batchTypeId"
                  {...formik.getFieldProps("batchTypeId")}
                  onChange={formik.handleChange}
                >
                  <MenuItem defaultValue value="">
                    Select Batch
                  </MenuItem>
                  {batches?.data?.map((ev, index) => {
                    return (
                      <MenuItem value={ev.id} key={ev.index}>
                        {ev.batchTypeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={batchLoader}
              >
                Assign Trainer
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default TrainerDetails;
