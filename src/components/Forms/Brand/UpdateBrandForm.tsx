import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, object, string } from "yup";
import { AppDispatch } from "../../../store/configureStore";
import { UpdateBrandRequest } from "../../../models/brands/requests/updateBrandRequest";
import { fetchBrands, updateBrand } from "../../../store/slices/brandSlice";
import { Alert } from "react-bootstrap";
import { GetAllBrandResponse } from "../../../models/brands/response/getAllBrandResponse";

type Props = {  
 selectedBrandId: number | null;
};

const UpdateBrandForm = (props: Props) => {

  const brandsState= useSelector((state:any)=>state.brand);
  const dispatch = useDispatch<AppDispatch>();


  const selectedBrand = props.selectedBrandId
    ? brandsState.brands.find(
        (brand: GetAllBrandResponse) => brand.id === props.selectedBrandId
      )
    : null;


  const initialValues = {
    id: selectedBrand?.id || 0,
    name: selectedBrand?.name || "",
    logoPath: selectedBrand?.logoPath || "",
  };


  const validationSchema = object({
    id: number().required("Id zorunludur"),
    name: string().min(2,"Marka adı 2 karakterden küçük olamaz.").max(25,"Marka adı 25 karakterden büyük olamaz").required("Marka adı girmek zorunludur."),
    logoPath: string().required("Logopath girmek zorunludur"),
  });
  const handleUpdateBrand = async (updateBrandRequest: UpdateBrandRequest, { resetForm }: FormikHelpers<UpdateBrandRequest>) => {
    await dispatch(updateBrand(updateBrandRequest));
    dispatch(fetchBrands());
    resetForm();
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateBrand}
    >
       {({ errors, touched }) => (
      <Form>
        <div className="mb-3">
          <label className="form-label">
            ID
          </label>
          <Field type="text" className={`form-control ${
                errors.id && touched.id ? "is-invalid" : ""
              }`} id="id" name="id" />
          <ErrorMessage name="id" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label className="form-label">İsim</label>
          <Field type="text"  className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`} name="name" />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="logoPath" className="form-label">Logo Yolu</label>
          <Field type="text" className={`form-control ${
                errors.logoPath && touched.logoPath ? "is-invalid" : ""
              }`} name="logoPath" />
          <ErrorMessage name="logoPath" component="div" className="text-danger" />
        </div>

        <button type="submit" className="btn btn-primary">
          Marka Güncelle
        </button>
      </Form>
      )}
    </Formik>
  );
};

export default UpdateBrandForm;
