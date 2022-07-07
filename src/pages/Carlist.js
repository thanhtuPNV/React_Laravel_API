import React, {useState, useEffect} from 'react';
import axios from "axios";
import AddCar from './AddCart';

const Carlist = () => {
    const [car, setCar] = useState({
        carList:[],
        isLoaded: false,
    });
    useEffect(() => {
        const getCar = async () => {
            var res = await axios(
                "http://127.0.0.1:8000/api/cars"
            );
            var carList = await res.data;
            setCar({ carList, isLoaded: true});
        };
        if (!car.isLoaded) getCar();
    },[car]);
    console.log(car.carList.data);
  return (
    <>
    <div className='container'>
        <AddCar />
        {/* <a href={<AddCar />}>Create</a> */}
        <h3>Danh sách xe</h3>
        {car.isLoaded ? (
            <table className='table'>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Manufacures</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            {!!car.carList.data && car.carList.data.map((cars) => (
                <tbody>
                    <tr>
                        {/* <td>1</td> */}
                        <td>{cars.name_mfs}</td>
                        <td><img style={{width:"150px",height:"auto", objectFit: "cover"}} src={"http://127.0.0.1:8000/image/" + cars.image} alt="..."/></td>
                        <td>{cars.name}</td>
                        <td>{cars.price}</td>
                        <td>{cars.decriptions}</td>
                    </tr>
                </tbody>
            ))}
        </table>
        ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
                Loading...
            </div>
        )}
    </div>
    </>
  )
}

export default Carlist;