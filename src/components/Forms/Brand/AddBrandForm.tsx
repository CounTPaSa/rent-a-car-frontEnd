import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import { AddBrandRequest } from "../../../models/brands/requests/addBrandRequest";
import { addBrand, fetchBrands } from "../../../store/slices/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/configureStore";
import { Alert, Button } from "react-bootstrap";
import { toast } from "react-toastify";

type Props = {
 
};

const AddBrandForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  


  const initialValues = {
    name: "",
    logoPath: "",
  };
  const validationSchema = object({
    name: string().min(2,"Marka adı 2 karakterden küçük olamaz.").max(25,"Marka adı 25 karakterden büyük olamaz").required("Marka adı girmek zorunludur."),
    logoPath: string().required("Logopath girmek zorunludur"),
  });

  const handleSubmit = async (
    values: AddBrandRequest,
    { resetForm }: FormikHelpers<AddBrandRequest>
  ) => {
    try {
      console.log("Form iletildi", values);
      await dispatch(addBrand(values));
      toast.success("Marka başarıyla eklendi");
      resetForm();
      dispatch(fetchBrands());
    } catch (error: any) {
      console.log("Hata:", error);
      toast.error("Failed to add brand");

    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              İsim
            </label>
            <Field
              type="text"
              name="name"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="logopath" className="form-label">
              Logo Yolu
            </label> 
            <Field
              type="text"
              className={`form-control ${
                errors.logoPath && touched.logoPath ? "is-invalid" : ""
              }`}
              name="logoPath"
            />
            <ErrorMessage
              name="logoPath"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => console.log("Button clicked")}
          >
            Marka Ekle
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBrandForm;
