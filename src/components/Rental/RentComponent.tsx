import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { date, number, object, ref } from "yup";
import { getClaims } from "../../store/slices/tokenSlice";
import { AddRentalRequest } from "../../models/rental/request/addRentalRequest";
import { addRental } from "../../store/slices/rentalSlice";
import { AppDispatch } from "../../store/configureStore";
import rentalService from "../../services/rentalService";

type Props = {};

const RentComponent = (props: Props) => {
  const { carId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector((state: any) => state.token.claims);

  const cars = useSelector((state: any) => state.car.cars);
  const carIdInt = carId ? parseInt(carId) : undefined;
  const car = cars.find((car: any) => car.id === carIdInt);

  const navigate = useNavigate();

  
  const handleGetClaims = () => {
    dispatch(getClaims());
  };

  console.log(claims && claims.id);

  console.log("Car id:", carId);


const initialValues = {
  startDate: "",
  endDate: "",
  carId: carId ? parseInt(carId) : 0,
  userId: claims?.id ?? 0,
};


const today = new Date();
const startDateLimit = new Date(today);
startDateLimit.setDate(today.getDate() - 1); 

const endDateLimit = new Date(today);
endDateLimit.setDate(today.getDate() + 25); 

const validationSchema = object().shape({
  startDate:date().min(startDateLimit, "Bugünden önceki bir tarih seçemezsiniz").required("Başlangıç tarihini girin"),
  endDate:date()
    .min(ref("startDate"), "Başlangıç tarihinden önce bir tarih seçemezsiniz").required("Teslim tarihini girin")
    .max(endDateLimit, "Kiralama süresi maksimum 25 gün olabilir"),
  carId: number().integer().positive(),
  userId: number().integer().positive(),
});

  
  const handleSubmit = (values: AddRentalRequest) => {
    const { startDate, endDate,carId,userId } = values;
    const postData: AddRentalRequest = {
      startDate: startDate,
      endDate: endDate,
      carId: carId,
      userId: userId,


    };
    rentalService.rental(postData).then((response) =>{
      const rentalId: string = response.data;
      console.log(rentalId);
      navigate("/rentalconfirm", { state: { rentalId } }); 

    })
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
            <div
              className="card"
              style={{
                width: "25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className="card-img-top"
                src="https://megarentacar.com/tema/genel/uploads/araclar/renault-clio-hb_1.png"
                alt="Card image cap"
              />
              <div
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title"></h5>
                <div
                  className="card-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div className="container">
                    <div className="left-column">
                      <div>Model: {car && car.model_id.name}</div>
                      <div>Günlük Fiyat: {car && car.dailyPrice}</div>
                      <div>Model Yılı: {car && car.modelYear}</div>
                    </div>
                    <div className="right-column">
                      <div>Plaka: {car && car.plate}</div>
                      <div>Renk: {car && car.color_id.name}</div>
                      <div>Kilometre: {car && car.kilometer}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
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
                          <div>{claims.userId}</div>

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
                        <div
                          className="form-outline"
                          style={{ display: "none" }}
                        >
                          <label className="form-label text-white">
                            Car ID
                          </label>
                          <Field
                            type="text"
                            name="carId"
                            className="form-control"
                            value={initialValues.carId}
                          />
                        </div>
                        <div className="form-outline">
                          <label className="form-label text-white">
                            Başlangıç Tarihi
                          </label>
                          <Field
                            type="date"
                            name="startDate"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="startDate"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label text-white">
                            Teslim Tarihi
                          </label>
                          <Field
                            type="date"
                            name="endDate"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="endDate"
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

export default RentComponent;
