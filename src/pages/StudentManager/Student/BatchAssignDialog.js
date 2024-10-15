import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CustomComponentLoader from "components/CustomComponentLoader";
import {
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { toastoptions } from "utils/toastoptions";
import DialogBox from "components/DialogBox/index";
import { _initialValues, _validation } from "./utilsBatch";
import { useFormik } from "formik";
import {
  getAllBatchTypes,
  staffBatchAssignAsync,
} from "redux/batchtype/batchtype.async";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack } from "@mui/system";
import { useSettingsContext } from "components/settings";
import { Helmet } from "react-helmet-async";
import { PATH_DASHBOARD } from "routes/paths";
import { useNavigate } from "react-router";

function BatchAssignDialog({ open, setOpen, studentIds }) {
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { batchLoader, batches } = useSelector((state) => state.batch);
  const [batchVal, setBatchVal] = useState({
    id: "",
    batchTypeName: "",
  });
  const [inputBatchValue, setInputBatchValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBatchTypes({}));
  }, []);

  const onSubmit = async (values) => {
    let payload = {
      batchId: batchVal?.id,
      studentIds: studentIds,
    };

    if (batchVal?.id) {
      dispatch(staffBatchAssignAsync(payload)).then((res) => {
        if (res.payload.status === 200) {
          toast.success(res.payload.message, toastoptions);
          setOpen(false);
        }
      });
    } else {
      toast.error("Please select batch", toastoptions);
    }
  };

  const formik = useFormik({
    initialValues: _initialValues,
    onSubmit,
    validationSchema: _validation,
  });

  return (
    <form>
      <DialogBox
        open={open}
        title="Assign Staffs in a Batch"
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Please Select Batch to assign the Staffs:
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
                      <Autocomplete
                        value={batchVal}
                        size="small"
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setBatchVal(newValue);
                          } else {
                            setBatchVal({ id: "", batchTypeName: "" });
                          }
                        }}
                        inputValue={inputBatchValue}
                        onInputChange={(event, newInputValue) => {
                          setInputBatchValue(newInputValue);
                        }}
                        id="batch"
                        options={batches?.data !== undefined && batches?.data}
                        getOptionLabel={(des) =>
                          des.batchTypeName !== undefined
                            ? des.batchTypeName
                            : ""
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Batch" />
                        )}
                      />
                    </FormControl>
                  </Box>

                  <Stack alignItems="flex-end" sx={{ mt: 25, mb: 5, ml: 15 }}>
                    <LoadingButton type="submit" variant="contained">
                      Assign Batch
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

export default BatchAssignDialog;
