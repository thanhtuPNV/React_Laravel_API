import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button, FormGroup, Input, Label, ModalFooter} from "reactstrap";

const URL_API = "http://127.0.0.1:8000/api/cars";
const AddCar = () => {
  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({
    name: "",
    decriptions: "",
    image: "",
    price: "",
  });
  const toogle = () => {
    setModal(!modal);
  };
  const pushData = () => {
    setModal(!modal);
  };
  const handlerInput = (e) =>{
    const {name, value} = e.target;
    console.log(car);
    setCar({
        ...car,
        file:e.target.files && e.target.files.length?URL.createObjectURL(e.target.files[0]):car.file,
        image:e.target.files && e.target.files.length?e.target.files[0].name:car.image,
        [name]: value,
    })
}

  return (
    <>
      <div>
        <Button color="danger" onClick={toogle}>
          ADD A NEW CAR
        </Button>
        <Modal isOpen={modal} toggle={toogle}>
          <ModalHeader toggle={toogle}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name_mfs">name_mfs</Label>
              <select name="name_mfs" id="name_mfs">
                <option value=""></option>
              </select>
            </FormGroup>

            <FormGroup>
              <Label for="name">name</Label>
              <Input
                id="name"
                value=""
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
                value=""
                name="decriptions"
                placeholder="with a placeholder"
                type="text"
                onChange={handlerInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">image</Label>
              <Input
                id="image"
                value=""
                name="image"
                placeholder="with a placeholder"
                type="file"
                onChange={handlerInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">price</Label>
              <Input
                id="price"
                value=""
                name="price"
                placeholder="with a placeholder"
                type="text"
                onChange={handlerInput}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={pushData}>
              Do Something
            </Button>{""}
            <Button onClick={toogle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default AddCar;
