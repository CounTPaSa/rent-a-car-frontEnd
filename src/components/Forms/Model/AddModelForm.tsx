import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/configureStore";
import { number, object, string } from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Alert } from "react-bootstrap";
import { fetchBrands } from "../../../store/slices/brandSlice";
import { addModel, fetchModels } from "../../../store/slices/modelSlice";
import { AddModelRequest } from "../../../models/model/requests/addModelRequest";
import { fetchCars } from "../../../store/slices/carSlice";
import { toast } from "react-toastify";

type Props = {};

const AddModelForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const brandsState = useSelector((state: any) => state.brand);
 

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const initialValues = {
    name: "",
    brandId: 0,
  };
  const validationSchema = object({
    name: string()
      .min(2, "Model adı 2 karakterden küçük olamaz.")
      .max(25, "Model adı 25 karakterden büyük olamaz")
      .required("Marka adı girmek zorunludur."),
    brandId: number().required("Brand değeri girmek zorunludur"),
  });

  const handleAddModel = async (
    values: AddModelRequest,
    { resetForm }: FormikHelpers<AddModelRequest>
  ) => {
    try {
      console.log("Form iletildi", values);
      await dispatch(addModel(values));
      toast.success("Model başarıyla eklendi");

      resetForm();
      dispatch(fetchModels());
    } catch (error: any) {
      console.error("Error adding model:", error);
      toast.error("Failed to add model");

    }
  };
 
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddModel}
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
            <label htmlFor="brandId" className="form-label" >
              Marka
            </label>{""}
            <Field as="select" name="brandId" className="form-select">
              <option value="">Marka seçin</option>
              {brandsState.brands.map((brand: any) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
            </Field>
            <ErrorMessage
              name="brandId"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => console.log("Button clicked")}
          >
            Model Ekle
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddModelForm;
