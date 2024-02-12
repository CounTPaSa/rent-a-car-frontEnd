import React, { useEffect } from "react";
import "../../styles/homepage.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchCars } from "../../store/slices/carSlice";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";

type Props = {};

const Homepage = (props: Props) => {
  const carsState = useSelector((state:any) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCars());
    
  }, [dispatch]);


  console.log(carsState);

   
  return (
    <div className="container-xxl">
      <div className="container-sm ">
        <SearchForm />
        <div className="row ">
          
        {carsState.cars.map((car: GetAllCarResponse) => (
  <div key={car.id}
       className="col-12 col-md-6 col-lg-4 col-xl-4 mb-3 d-flex justify-content-center align-items-center "
  >
    <ProductCard car={car}/>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Homepage;
