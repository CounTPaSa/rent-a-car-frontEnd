import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { AppDispatch } from '../../../store/configureStore';
import { AddColorRequest } from '../../../models/color/requests/addColorRequest';
import { addColor, fetchColors } from '../../../store/slices/colorSlice';
import { toast } from 'react-toastify';

type Props = {}

const AddColorForm = (props: Props) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const initialValues = {
        name: "",
        code: "",
      };
      const validationSchema = object({
        name: string().min(2,"Renk adı 2 karakterden küçük olamaz.").max(25,"Renk adı 25 karakterden büyük olamaz").required("Renk adı girmek zorunludur."),
        code: string().required("Renk kodu girmek zorunludur"),
      });
      const handleSubmit = async (
        values: AddColorRequest,
        { resetForm }: FormikHelpers<AddColorRequest>
      ) => {
        try {
          console.log("Form iletildi", values);
          await dispatch(addColor(values));
          toast.success("Renk başarıyla eklendi");
          resetForm();
          dispatch(fetchColors());
        } catch (error: any) {
          console.log("Hata:", error);
          toast.error("Failed to add color");

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
            <label htmlFor="code" className="form-label">
              Renk Kodu
            </label> 
            <Field
              type="text"
              className={`form-control ${
                errors.code && touched.code ? "is-invalid" : ""
              }`}
              name="code"
            />
            <ErrorMessage
              name="code"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => console.log("Button clicked")}
          >
            Renk Ekle
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddColorForm