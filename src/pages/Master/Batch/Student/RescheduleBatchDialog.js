import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CustomComponentLoader from "components/CustomComponentLoader";
import { FormControl, Grid, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import DialogBox from "components/DialogBox/index";
import { _initialValues, _validation } from "./utilsBatch";
import { useFormik } from "formik";
import {
  getAllBatchTypes,
  staffBatchResheduleAsync,
} from "redux/batchtype/batchtype.async";
import { getAllEmployeeByBatchIdAsync } from "redux/batchWiseDetails/batchDetails.async";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack } from "@mui/system";
import { useSettingsContext } from "components/settings";
import { Helmet } from "react-helmet-async";
import { PATH_DASHBOARD } from "routes/paths";
import { useNavigate } from "react-router";
import { addDaysToDate } from "utils/generateDateFromTo";

function RescheduleBatchDialog({
  open,
  setOpen,
  studentIds,
  batchinfo,
  page,
  limit,
  setCheckedValue,
}) {
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const [date30, setdate30] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBatchTypes({}));
  }, []);

  const onSubmit = async (values) => {
    let payload = {
      batchId: batchinfo?.id,
      date: formik?.values?.fromDate,
      studentIds: studentIds,
    };

    if (batchinfo?.id && formik?.values?.fromDate) {
      dispatch(staffBatchResheduleAsync(payload)).then((res) => {
        if (res.payload.status === 200) {
          toast.success(res.payload.message, toastoptions);
          setOpen(false);
          const payload = {
            page: page,
            limit: limit,
            batchTypeId: batchinfo?.id,
            employeeCode: "",
            type: "Student",
          };
          dispatch(getAllEmployeeByBatchIdAsync(payload));
          setCheckedValue([]);
        }
      });
    } else {
      toast.error("Please select Date", toastoptions);
    }
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: _validation,
  });

  return (
    <form>
      <DialogBox open={open} title="Reschedule the Batch" onClose={handleClose}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Please select the date to reschedule the batch:
          </DialogContentText>
          <Container maxWidth={themeStretch ? "lg" : false}>
            <Helmet>
              <title>Student Manager</title>
            </Helmet>

            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    }}
                  >
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        id="batch"
                        label="Batch"
                        variant="outlined"
                        sx={{ height: 60 }}
                        disabled="true"
                        value={batchinfo?.batchTypeName}
                      />
                    </FormControl>

                    <FormControl>
                      <TextField
                        size="small"
                        sx={{
                          width: 220,
                          mr: 2,
                          mb: { xs: 1, md: 0 },
                          height: 60,
                        }}
                        type="date"
                        name="fromDate"
                        fullWidth
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                          max:
                            date30 &&
                            new Date(date30).toISOString().split("T")[0],
                        }}
                        // error={formik.touched.fromDate && formik.errors.fromDate}
                        {...formik.getFieldProps("fromDate")}
                        onChange={formik.handleChange}
                        // disabled={Boolean(formik.values.fromDate === "")}
                      />
                    </FormControl>
                  </Box>

                  <Stack alignItems="flex-end" sx={{ mt: 25, mb: 5, ml: 15 }}>
                    <LoadingButton type="submit" variant="contained">
                      Reschedule Batch
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
      </DialogBox>
    </form>
  );
}

export default RescheduleBatchDialog;
