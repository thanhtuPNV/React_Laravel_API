import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  FormGroup,
  Input,
  Label,
  ModalFooter,
} from "reactstrap";
import axios from "axios";

const URL_API = "http://127.0.0.1:8000/api/cars";
const AddCar = ({ onAdded }) => {
  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({
    manufacures: "",
    name: "",
    decriptions: "",
    image: "",
    price: "",
    file: null,
  });
  const [mfs, setMfs] = useState({
    mfsList: [],
    isLoaded: false,
  });
  // getCar
  const getMfs = async () => {
    var res = await axios("http://127.0.0.1:8000/api/manufactures");
    var mfsList = await res.data;
    setMfs({ mfsList, isLoaded: true });
  };
  useEffect(() => {
    if (!mfs.isLoaded) getMfs();
  }, []);
  //
  const toogle = () => {
    setModal(!modal);
  };
  // handlerInput
  const handlerInput = (e) => {
    const { name, value } = e.target;
    console.log(car);
    setCar({
      ...car,
      [name]: value,
    });
  };
  // handlerImageFile
  const handlerImageFile = (e) => {
    setCar({
      ...car,
      file: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0].name,
    });
  };
  // handleAddrTypeChange
  const handleAddrTypeChange = (e) => {
    setCar(e.target.value);
  }
  // reset
  const onRediret = (e) => {
    setCar({});
    toogle();
    onAdded(false);
  };
  // handlerSubmit
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(33);
    const fileInput = document.querySelector("#inputFile");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("manufacures", car.manufacures);
    formData.append("decriptions", car.decriptions);
    formData.append("name", car.name);
    formData.append("price", car.price);
    axios
      .post(URL_API, formData)
      .then(function (response) {
        console.log(response);
        onRediret();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // handlerSubmit
  return (
    <>
      <div>
        <Button color="danger" onClick={toogle}>
          ADD A NEW CAR
        </Button>
        <Modal isOpen={modal} toggle={toogle}>
          <ModalHeader toggle={toogle}>Modal title</ModalHeader>
          <form encType=" multipart/form-data" onSubmit={handlerSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="manufacures">name_mfs</Label>
                {mfs.isLoaded ? (
                  <select name="manufacures" id="manufacures" onChange={handleAddrTypeChange}>
                    {mfs.mfsList.map((mfs) => (
                      <option value={mfs.id}>{mfs.mf_name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    Loading...
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="name">name</Label>
                <Input
                  id="name"
                  value={car ? car.name : ""}
                  name="name"
                  placeholder="with a placeholder"
                  type="text"
                  onChange={handlerInput}
                />
              </FormGroup>
              <FormGroup>
                <Label for="decriptions">decriptions</Label>
                <Input
                  id="decriptions"
                  value={car ? car.decriptions : ""}
                  name="decriptions"
                  placeholder="with a placeholder"
                  type="text"
                  onChange={handlerInput}
                />
              </FormGroup>
              <FormGroup>
                <Label for="inputFile">image</Label>
                <Input
                  id="inputFile"
                  // value={car ? car.image : ""}
                  name="inputFile"
                  placeholder="with a placeholder"
                  type="file"
                  onChange={handlerImageFile}
                />
                <img
                  src={car ? car.file : ""}
                  style={{ width: "470px", height: "auto" }}
                  alt="..."
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">price</Label>
                <Input
                  id="price"
                  value={car ? car.price : ""}
                  name="price"
                  placeholder="with a placeholder"
                  type="text"
                  onChange={handlerInput}
                />
              </FormGroup>
            </ModalBody>
            <Button color="primary">Do Something</Button>
            {""}
          </form>
          <ModalFooter>
            <Button onClick={toogle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default AddCar;
