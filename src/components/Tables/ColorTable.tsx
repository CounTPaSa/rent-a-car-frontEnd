import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { deleteColor, fetchColors } from "../../store/slices/colorSlice";
import { GetAllColorResponse } from "../../models/color/response/getAllColorResponse";
import { Modal } from "react-bootstrap";
import AddColorForm from "../Forms/Color/AddColorForm";
import UpdateColorForm from "../Forms/Color/UpdateColorForm";
import { toast } from "react-toastify";

type Props = {};

const ColorTable = (props: Props) => {
  const colorsState= useSelector((state:any)=> state.color);
  const dispatch= useDispatch<AppDispatch>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  useEffect(()=>{
    dispatch(fetchColors());
  },[dispatch]);
  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleToggleUpdateModal = (colorId: number) => {
    setSelectedColorId(colorId);
    setShowUpdateModal(true);
  };

  const handleDeleteColor =async(id:number)=>{
    try {
        await dispatch(deleteColor(id));
        toast.success("Renk başarıyla silindi");

        console.log("Renk silindi");
    } catch(error){
        console.error("Renk silinemedi",error)
        toast.error("Renk silinemedi");
    }
  };

  return (
    <>
      <table className="table table-hover table-borderless caption-top bg-white rounded mt-2">
        <caption>
          <span className="cars-p">Renkler</span> {""}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleToggleAddModal}
          >
            Yeni Renk Ekle
          </button>{" "}
          {""}
          
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">İsim</th>
            <th scope="col">Renk Kodu</th>
          </tr>
        </thead>
        <tbody>
          {colorsState.colors.map((color: GetAllColorResponse) => (
            <tr key={color.id}>
              <th scope="row">{color.id}</th>
              <td>{color.name}</td>
              <td>{color.code}</td>

              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteColor(color.id)}>
                  Sil
                </button>
              </td>
              <td>
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleToggleUpdateModal(color.id)}
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
          <Modal.Title>Yeni Renk Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddColorForm />
        </Modal.Body>
        
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Renk Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UpdateColorForm selectedColorId={selectedColorId}  />
        </Modal.Body>
       
      </Modal>
     
    </>

  );
};

export default ColorTable;
