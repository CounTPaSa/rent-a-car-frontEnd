import React, { useEffect, useState } from "react";
import RentalPayment from "./RentalPayment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/configureStore";
import { getClaims } from "../../store/slices/tokenSlice";
import { fetchRentals, getById } from "../../store/slices/rentalSlice";
import { getByStringCode } from "../../store/slices/discountSlice";
import { AddInvoiceRequest } from "../../models/invoices/requests/addInvoiceRequest";
import { addInvoice } from "../../store/slices/invoiceSlice";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";

type Props = {};

const RentalConfirm = (props: Props) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const rentalId = location.state.rentalId;

  const claims = useSelector((state: any) => state.token.claims);

  const rentalsState = useSelector((state: any) => state.rental);
  const userId = location.state.userId;

  useEffect(() => {
    if (rentalId) {
      dispatch(getById(rentalId));
    }
  }, [dispatch, rentalId]);

  const handleGetClaims = () => {
    dispatch(getClaims());
  };

  console.log("user id:", claims && claims.id);

  const selectedRental = useSelector(
    (state: any) => state.rental.selectedRental
  );

  console.log("rental id:", rentalId);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState<number | null>(null);

  const handleAddDiscountCode = () => {
    dispatch(getByStringCode(discountCode)).then((action) => {
      if (getByStringCode.fulfilled.match(action)) {
        setDiscountValue(action.payload.value);
      } else if (getByStringCode.rejected.match(action)) {
        alert("Geçersiz indirim kodu");
      }
    });
  };
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (
      selectedRental &&
      selectedRental.startDate &&
      selectedRental.endDate &&
      selectedRental.carResponse.dailyPrice
    ) {
      const dailyPrice = selectedRental.carResponse.dailyPrice;
      const discount = discountValue ?? 0;
      const startDate = new Date(selectedRental.startDate);
      const endDate = new Date(selectedRental.endDate);

      let totalPrice = 0;
      if (discount > 0 && discount < 100) {
        totalPrice =
          ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) *
          dailyPrice *
          (1 - discount / 100);
      } else {
        totalPrice =
          ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) *
          dailyPrice;
      }

      setTotalPrice(totalPrice);
    }
  }, [selectedRental, discountValue, discountCode]);

 const initialValues={
    ownerUser: claims?.id ?? userId,
    discountRate: discountValue ?? 0,
    totalPrice: totalPrice ?? 0,
    rentalId: rentalId,
  
 }
  

 const handleSubmit = async (values: AddInvoiceRequest, { setSubmitting, resetForm }: FormikHelpers<AddInvoiceRequest>) => {
  try {
      values.discountRate = discountValue ?? 0;
      values.totalPrice = totalPrice ?? 0;
      console.log("Form iletildi", values);
      await dispatch(addInvoice(values));
      toast.success("Ödemeniz başarıyla alınmıştır")
      resetForm(); 
  } catch (error: any) {
      console.log("Hata:", error);
  } finally {
      setSubmitting(false); 
  }
};


 
  return (
    <div className="container mt-8">
      <div
        className="row justify-content-center mx-4 mx-md-5 mt-5 mb-5 shadow-5-strong "
        style={{
          background: "hsla(0, 0%, 10%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="col-md-6">
          <RentalPayment />
        </div>
        <div className="col-md-6 ">
          {selectedRental && (
            <div className="card shadow-sm mt-5 mb-5">
              <div className="card-body">
                <h5 className="card-title">Kiralama Detayları</h5>
                <div className="card-text">
                  <p>Kiralama Tarihi: {selectedRental.startDate}</p>
                  <p>Teslim Tarihi: {selectedRental.endDate}</p>
                  <p>Kilometre: {selectedRental.carResponse.kilometer}</p>
                  <p>
                    Marka adı:{" "}
                    {selectedRental.carResponse.model_id.brandResponse.name}
                  </p>
                  <p>Model adı: {selectedRental.carResponse.model_id.name}</p>
                  <p>Model Yılı: {selectedRental.carResponse.modelYear}</p>
                  <p>Plaka : {selectedRental.carResponse.plate}</p>
                  <p>Günlük ücret : {selectedRental.carResponse.dailyPrice}</p>
                </div>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="discountcode">
                    <label htmlFor="discountCode" className="mr-2">
                      İndirim Kodu:
                    </label>
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="İndirim kodunu girin"
                      id="discountCode"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={handleAddDiscountCode}
                    >
                      Ekle
                    </button>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                  >
                    {({ values, handleSubmit }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              
                              <Field
                              style={{ display: "none" }}
                                type="text"
                                name="ownerUser"
                                value={values.ownerUser}
                                className="form-control"
                              />
                            </div>

                            <div className="form-outline">
                              <label className="form-label ">
                                İndirim:
                              </label>
                              <Field
                                type="text"
                                name="discountRate"
                                value={initialValues.discountRate}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label className="form-label">
                                Toplam Ücret:
                              </label>
                              <Field
                                type="text"
                                name="totalPrice"
                                value={initialValues.totalPrice}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                             
                              <Field
                              style={{ display: "none" }}
                                type="text"
                                name="rentalId"
                                className="form-control"
                                value={values.rentalId}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          style={{ width: "50%" }}
                        >
                          ödemeyi yap
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalConfirm;
