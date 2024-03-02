import React, { useEffect, useState } from "react";
import Nav from "../AdminNav/Nav";
import "../Home/home.css";
import CarTable from "../../Tables/CarTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/configureStore";
import { fetchCars } from "../../../store/slices/carSlice";
import { GetAllCarResponse } from "../../../models/cars/response/getAllCarResponse";
import BrandTable from "../../Tables/BrandTable";
import ColorTable from "../../Tables/ColorTable";
import ModelTable from "../../Tables/ModelTable";

type Props = {
  Toggle: () => void;
};

const Home = (props: Props) => {
  const carsState = useSelector((state: any) => state.car);
  const brandsState = useSelector((state: any) => state.brand);
  const colorsState= useSelector((state:any) => state.color);
  const modelsState= useSelector((state:any)=>state.model);

  return (
    <div className="px-3">
      {" "}
      <Nav Toggle={props.Toggle} />{" "}
      <div className="container-fluid">
        {" "}
        <div className="row g-3 my-2">
          {" "}
          <div className="col-md-3 p-1">
            {" "}
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              {" "}
              <div>
                {" "}
                <h3 className="fs-2">{carsState.cars.length}</h3>{" "}
                <p className="fs-5">Araçlar</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col-md-3 p-1">
            {" "}
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              {" "}
              <div>
                {" "}
                <h3 className="fs-2">{colorsState.colors.length}</h3> <p className="fs-5">Renkler</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col-md-3 p-1">
            {" "}
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              {" "}
              <div>
                {" "}
                <h3 className="fs-2">{brandsState.brands.length}</h3> <p className="fs-5">Markalar</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col-md-3 p-1">
            {" "}
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              {" "}
              <div>
                {" "}
                <h3 className="fs-2">{modelsState.models.length}</h3> <p className="fs-5">Modeller</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <CarTable />
      <BrandTable/>
      <ColorTable/>
      <ModelTable/>
    </div>
  );
};

export default Home;
