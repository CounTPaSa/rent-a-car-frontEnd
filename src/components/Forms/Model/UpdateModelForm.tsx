import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/configureStore';
import { number, object, string } from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { UpdateModelRequest } from '../../../models/model/requests/updateModelRequest';
import { updateModel } from '../../../store/slices/modelSlice';
import { GetAllModelResponse } from '../../../models/model/response/getAllModelResponse';

type Props = {
  selectedModelId: number | null;
}

const UpdateModelForm = (props: Props) => {
    const modelsState= useSelector((state:any)=>state.model);
    const dispatch = useDispatch<AppDispatch>();
    const brandsState = useSelector((state: any) => state.brand);

  const selectedModel = props.selectedModelId?modelsState.models.find(
    (model: GetAllModelResponse) => model.id=== props.selectedModelId
  ) 
  : null;
    const initialValues = {
        id: selectedModel?.id || 0,
        name: selectedModel?.name || "",
        brandId: selectedModel?.brandId || "",
      };
    const validationSchema = object({
        id: number().required("Id zorunludur"),
        name: string().min(2,"Model adı 2 karakterden küçük olamaz.").max(25,"Model adı 25 karakterden büyük olamaz").required("Marka adı girmek zorunludur."),
        brandId: number().required("Brand değeri girmek zorunludur"),
    });
    const handleSubmit = async (updateModelrequest: UpdateModelRequest, { resetForm }: FormikHelpers<UpdateModelRequest>) => {
      await dispatch(updateModel(updateModelrequest));

      resetForm();
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
          <label className="form-label">
            ID
          </label>
          <Field type="text" className={`form-control ${
                errors.id && touched.id ? "is-invalid" : ""
              }`} id="id" name="id" />
          <ErrorMessage name="id" component="div" className="text-danger" />
        </div>
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
          <label htmlFor="brandId" className="form-label">
            Marka 
          </label> 
          <Field as="select" name="brandId" className="form-select" >
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
         Model Güncelle
        </button>
      </Form>
    )}
  </Formik>
  )
}

export default UpdateModelForm