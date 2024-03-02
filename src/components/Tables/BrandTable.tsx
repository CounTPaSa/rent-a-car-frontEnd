import React, { useEffect, useState } from "react";
import UpdateBrandForm from "../Forms/Brand/UpdateBrandForm";
import { Button, Modal } from "react-bootstrap";
import AddBrandForm from "../Forms/Brand/AddBrandForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addBrand, deleteBrand, fetchBrands } from "../../store/slices/brandSlice";
import { GetAllBrandResponse } from "../../models/brands/response/getAllBrandResponse";
import { toast } from "react-toastify";

type Props = {};

const BrandTable = (props: Props) => {
  const brandsState = useSelector((state: any) => state.brand);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);


  
 
  useEffect(()=>{
    dispatch(fetchBrands());
  },[dispatch]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
 

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };


  const handleToggleUpdateModal = (brandId: number) => {
    setSelectedBrandId(brandId);
    setShowUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  

 
  const handleDeleteBrand = async (id: number) => {
    try {
      await dispatch(deleteBrand(id));
      toast.success("Marka başarıyla silindi");

      console.log("Marka silindi");
    } catch (error) {
      console.error("Marka silinemedi", error);
      toast.error("Marka silinemedi");
    }
  };
 
 
 
  return (
    <>
      <table className="table table-hover table-borderless caption-top bg-white rounded mt-2">
        <caption>
          <span className="cars-p">Markalar</span> {""}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleToggleAddModal}
          >
           Yeni Marka Ekle
          </button>{" "}
          {""}
          
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">İsim</th>
            <th scope="col">Logo yolu</th>
          </tr>
        </thead>
        <tbody>
          {brandsState.brands.map((brand: GetAllBrandResponse) => (
            <tr key={brand.id}>
              <th scope="row">{brand.id}</th>
              <td>{brand.name}</td>
              <td>{brand.logoPath}</td>

              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteBrand(brand.id)}>
                  Sil
                </button>
              </td>
              <td>
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleToggleUpdateModal(brand.id)}
                >
                  Güncelle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showAddModal} onHide={handleToggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Marka Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddBrandForm />
        </Modal.Body>
        
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Markayı Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UpdateBrandForm selectedBrandId={selectedBrandId}  />
                </Modal.Body>
       
      </Modal>
     
    </>
  );
};

export default BrandTable;
