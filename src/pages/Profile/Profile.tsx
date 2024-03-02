import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { date, object, string } from "yup";
import { getClaims } from "../../store/slices/tokenSlice";
import { AppDispatch } from "../../store/configureStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AddCustomerRequest } from "../../models/customer/request/addCustomerRequest";
import { addCustomer } from "../../store/slices/customerSlice";

type Props = {};

const Profile = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector((state: any) => state.token.claims);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;


  const handleNavigate = () => {
    navigate("/login");
  };

  const handleGetClaims = () => {
    dispatch(getClaims());
  };

  console.log(claims && claims.id);

  const initialValues = {
    userId: userId,
    firstName: "",
    lastName: "",
    birthDate: "",
    nationalityId: "",
    address: "",
    gsm: "",
  };

  const validationSchema = object({
    firstName: string().required("Adınızı giriniz"),
    lastName: string().required("Soyadınızı giriniz"),
    nationalityId: string()
      .required("TC kimlik numarası  zorunludur")
      .matches(/^\d{11}$/, "TC kimlik numarası 11 haneli bir sayı olmalıdır"),
   
    gsm: string()
      .required("Cep telefon numaranızı giriniz")
      .matches(/^05\d{9}$/, "Gsm geçerli bir numara olmalıdır. (05xxxxxxxxx)"),
    address: string()
      .min(5, "Adres bilgisi 5 karakterden az olamaz")
      .max(60)
      .required("Adres bilgisi giriniz"),

      birthDate: date()
      .required("Doğum tarihinizi giriniz")
      .max(new Date(), "Geçerli bir doğum tarihi giriniz") 
      .test("age", "Kullanıcı 21 yaşından küçük olamaz", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 21;
        }
        return age >= 21;
      }),
  });
  const handleSubmit = async (values: AddCustomerRequest, { resetForm }: FormikHelpers<AddCustomerRequest>) => {
    try {
        console.log("Form iletildi", values);
        await dispatch(addCustomer(values));
        resetForm(); 
        navigate("/login");
    } catch (error: any) {
        console.log("Hata:", error);
    }
};

  return (
    <div className="text-center">
      <div
        className="card mx-4 mx-md-5 mt-5 mb-5 shadow-5-strong"
        style={{
          background: "hsla(0, 0%, 10%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5 text-white">Profil</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleSubmit }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div
                          className="form-outline"
                          style={{ display: "none" }}
                        >
                          <label className="form-label text-white">
                            UserId
                          </label>
                          <div>{initialValues.userId}</div>

                          <Field
                            type="text"
                            name="userId"
                            value={initialValues.userId}
                            readOnly
                            className="form-control"
                          />
                          <ErrorMessage
                            name="userId"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-outline">
                          <label className="form-label text-white">
                            Adınız
                          </label>
                          <Field
                            type="text"
                            name="firstName"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">
                            Soyadınız
                          </label>
                          <Field
                            type="text"
                            name="lastName"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">
                            Doğum Tarihi
                          </label>
                          <Field
                            type="date"
                            name="birthDate"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="birthDate"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">
                            Cep Telefonu
                          </label>
                          <Field
                            type="tel"
                            name="gsm"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="gsm"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">
                            TC Kimlik Numarası
                          </label>
                          <Field
                            type="text"
                            name="nationalityId"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="nationalityId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">Adres</label>
                          <Field
                            type="text"
                            name="address"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      style={{ width: "50%" }}
                    >
                      <i className="bi bi-arrow-right"></i>
                    </button>
                    
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
