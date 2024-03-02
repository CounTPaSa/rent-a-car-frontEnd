import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteModel, fetchModels } from '../../store/slices/modelSlice';
import { GetAllModelResponse } from '../../models/model/response/getAllModelResponse';
import { Modal } from 'react-bootstrap';
import AddModelForm from '../Forms/Model/AddModelForm';
import UpdateModelForm from '../Forms/Model/UpdateModelForm';
import { toast } from 'react-toastify';

type Props = {}

const ModelTable = (props: Props) => {
  const modelsState= useSelector((state:any)=>state.model);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
 
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
 
  useEffect(()=>{
    dispatch(fetchModels());
  },[dispatch]);

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };
  const handleToggleUpdateModal = (modelId: number) => {
    setSelectedModelId(modelId);
    setShowUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleDeleteModel =async(id:number)=>{
    try {
        await dispatch(deleteModel(id));
        toast.success("Model başarıyla silindi");
        console.log("Model silindi");
    } catch(error){
        console.error("Model silinemedi",error)
        toast.error("Model silinemedi");
    }
  };
  return (
    <>
      <table className="table table-hover table-borderless caption-top bg-white rounded mt-2">
        <caption>
          <span className="cars-p">Modeller</span> {""}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleToggleAddModal}
          >
            Yeni Model Ekle
          </button>{" "}
          {""}
          
        </caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">İsim</th>
            <th scope="col">Marka</th>
          </tr>
        </thead>
        <tbody>
          {modelsState.models.map((model: GetAllModelResponse) => (
            <tr key={model.id}>
              <th scope="row">{model.id}</th>
              <td>{model.name}</td>
              <td>{model.brandResponse && model.brandResponse.name}</td>

              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteModel(model.id)}>
                  Sil
                </button>
              </td>
              <td>
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleToggleUpdateModal(model.id)}
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
          <Modal.Title>Yeni Model Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddModelForm />
        </Modal.Body>
        
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Model Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UpdateModelForm  selectedModelId={selectedModelId}/>
                </Modal.Body>
       
      </Modal>
     
    </>
  )
}

export default ModelTable