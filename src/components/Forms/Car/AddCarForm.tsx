import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, object, string } from "yup";
import { AppDispatch } from "../../../store/configureStore";
import { fetchBrands } from "../../../store/slices/brandSlice";
import { fetchModels } from "../../../store/slices/modelSlice";
import {
  AddCarRequest,
  Available,
  CarType,
  FuelType,
  TransmissionType,
} from "../../../models/cars/requests/addCarRequest";
import { addCar, fetchCars } from "../../../store/slices/carSlice";
import { toast } from "react-toastify";
import { fetchColors } from "../../../store/slices/colorSlice";

type Props = {};

const AddCarForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const modelsState = useSelector((state: any) => state.model);
  const colorsState = useSelector((state: any) => state.color);
  const carsState = useSelector((state: any) => state.car);
  const enumValues = <T extends Record<keyof T, string | number>>(e: T) =>
    Object.keys(e)
      .filter((k) => typeof e[k as keyof T] === "string")
      .map((k) => e[k as keyof T]) as unknown as T[keyof T][];
  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const initialValues: AddCarRequest = {
    plate: "",
    kilometer: 0,
    dailyPrice: 0,
    modelYear: 0,
    minFindeksRate: 0,
    imagePath: "",
    modelId: 0,
    colorId: 0,
    carType: CarType.ECOHATCHBACK,
    fuelType: FuelType.DIESEL,
    transmissionType: TransmissionType.AUTOMATIC,
    available: Available.YES,
  };

  const validationSchema = object({
    plate: string()
      .matches(
        /^(0[1-9]|[1-7][0-9]|8[01])((\s?[a-zA-Z]\s?)(\d{4,5})|(\s?[a-zA-Z]{2}\s?)(\d{3,4})|(\s?[a-zA-Z]{3}\s?)(\d{2,3}))/,
        "Geçersiz plaka"
      )
      .required("Plaka bilgisi zorunludur"),
      kilometer: number()
      .min(0, "Aracın kilometresi 0'dan küçük olamaz")
      .required("Kilometre alanı zorunludur"),
    dailyPrice: number()
      .min(0, "Günlük ücret 0'dan az olamaz")
      .required("Günlük ücret alanı zorunludur"),
    minFindeksRate: number().required("Min findeks değeri zorunludur"),
    imagePath: string().required(""),
    modelYear: number()
      .min(2005, "Model yılı 2005 yılından küçük olamaz!")
      .max(2024, "Model yılı 2024 yılından büyük olamaz")
      .required("Model yılı zorunludur"),
    colorId: number().required("Renk değeri zorunludur"),
    modelId: number().required("model id değeri zorunludur"),
  });

  const handleAddCar = async (
    values: AddCarRequest,
    { resetForm }: FormikHelpers<AddCarRequest>
  ) => {
    try {
      console.log("Form iletildi", values);
      await dispatch(addCar(values));
      toast.success("Araç başarıyla eklendi");
      resetForm();
      dispatch(fetchCars());
    } catch (error: any) {
      console.error("Error adding car:", error);
      toast.error("Araç eklenemedi");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddCar}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="plate" className="form-label">
              Plaka
            </label>
            <Field
              type="text"
              name="plate"
              className={`form-control ${
                errors.plate && touched.plate ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="plate"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="kilometer" className="form-label">
              Kilometre
            </label>
            <Field
              type="number"
              name="kilometer"
              className={`form-control ${
                errors.kilometer && touched.kilometer ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="kilometer"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dailyPrice" className="form-label">
              Günlük Ücret
            </label>
            <Field
              type="number"
              name="dailyPrice"
              className={`form-control ${
                errors.dailyPrice && touched.dailyPrice ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="dailyPrice"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="minFindeksRate" className="form-label">
            Minimum Findeks Oranı
            </label>
            <Field
              type="number"
              name="minFindeksRate"
              className={`form-control ${
                errors.minFindeksRate && touched.minFindeksRate
                  ? "is-invalid"
                  : ""
              }`}
            />
            <ErrorMessage
              name="minFindeksRate"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="modelYear" className="form-label">
              Model Yılı
            </label>
            <Field
              type="number"
              name="modelYear"
              className={`form-control ${
                errors.modelYear && touched.modelYear ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="modelYear"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagePath" className="form-label">
            Görsel yolu
            </label>
            <Field
              type="text"
              name="imagePath"
              className={`form-control ${
                errors.imagePath && touched.imagePath ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="imagePath"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="colorId" className="form-label">
              Renk
            </label>
            {""}
            <Field as="select" name="colorId" className="form-select">
              <option value="">Renk seçin</option>
              {colorsState.colors.map((color: any) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="colorId"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="modelId" className="form-label">
              Model
            </label>
            {""}
            <Field as="select" name="modelId" className="form-select">
              <option value="">Model seçin</option>
              {modelsState.models.map((model: any) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="modelId"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fuelType" className="form-label">
              Yakıt Tipi
            </label>
            {""}
            <Field as="select" name="fuelType" className="form-select">
              {Object.values(FuelType).map(
                (fuelType: string, index: number) => (
                  <option key={index} value={fuelType}>
                    {fuelType === FuelType.DIESEL ? "Dizel" : "Benzin"}
                  </option>
                )
              )}
            </Field>
            <ErrorMessage
              name="fuelType"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transmissionType" className="form-label">
            Şanzıman Tipi            </label>
            {""}
            <Field as="select" name="transmissionType" className="form-select">
              {Object.values(TransmissionType).map(
                (transmissionType: string, index: number) => (
                  <option key={index} value={transmissionType}>
                    {transmissionType === TransmissionType.AUTOMATIC
                      ? "Otomatik"
                      : "Manuel"}
                  </option>
                )
              )}
            </Field>
            <ErrorMessage
              name="transmissionType"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carType" className="form-label">
              Araç Tipi
            </label>
            {""}
            <Field as="select" name="carType" className="form-select">
              <option value="">Araç tipi seçin</option>

              {enumValues(CarType).map((carType: CarType) => (
                <option key={carType} value={carType}>
                  {carType}
                </option>
              ))}
            </Field>

            <ErrorMessage
              name="carType"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="available" className="form-label">
              Araç müsait mi?
            </label>
            {""}
            <Field as="select" name="available" className="form-select">
              <option value="">Araç durumu seçin</option>

              {enumValues(Available).map((available: Available) => (
                <option key={available} value={available}>
                  {available}
                </option>
              ))}
            </Field>

            <ErrorMessage
              name="available"
              component="div"
              className="text-danger"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Araç Ekle
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCarForm;
