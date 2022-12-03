import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 24,
  },
}));

const validationSchema = yup.object({
  title: yup.string("Enter your Title").required("Title is required"),
  body: yup.string("Enter your body").required("Body is required"),
});

const Form = ({ data }) => {
  const classes = useStyles();

  const [userId, setuserId] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            ...values,
            userId,
          }
        );
        console.log(res);
        if (res?.status === 200 || res?.status === 201) {
          toast.success("Form Submitted", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          formik.resetForm();
        } else {
          toast.error("An Error Occured", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error(error.response);
        toast.error("An Error Occured", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
  });

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4">Fill Details</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              fullWidth
              options={data}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setuserId(newValue.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Select a user"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              variant="outlined"
              nputProps={{ "data-testid": "required-title" }}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              label="Body"
              name="body"
              multiline
              minRows={3}
              variant="outlined"
              nputProps={{ "data-testid": "required-body" }}
              value={formik.values.body}
              onChange={formik.handleChange}
              error={formik.touched.body && Boolean(formik.errors.body)}
              helperText={formik.touched.body && formik.errors.body}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
