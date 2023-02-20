import axios from "axios";
import { useEffect, useState } from "react";
import { Header, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";
import CarItem from "./CarItem";

interface Props{
    setSelectedStudents:(selectedStudents:Student[])=> void,
    setRegistrationNumber:(carRegistrationNumber:string)=> void,
    EditCar:(EditCar : boolean)=>void,
    setpickupCarforEdit:(setpickupCarforEdit: PickupCar)=>void
}
export default function CarpoolLane({setSelectedStudents,setRegistrationNumber,EditCar,setpickupCarforEdit} : Props) {

    const [pickupCars, setPickupCars] = useState<PickupCar[]>([]);
    useEffect(() => {
        axios.get<PickupCar[]>('http://localhost:5002/PickupCar/GetCars')
            .then(response => {
                //console.log(response);
                setPickupCars(response.data);
            })
    }, [])

    return (
        <Segment>
            <div style={{overflow:'auto'}} className= "ui cards">
                <div className="header attached"  style={{ fontWeight: 700, fontSize: '1.28571429em', marginTop: '-0.21425em', lineHeight: '1.28571429em', padding:'1em 1em',width:'100%'}}> Carpool Lane</div>
            {
                pickupCars.map(carObj => (
                    <CarItem setpickupCarforEdit={setpickupCarforEdit} car={carObj} EditCar={EditCar} setRegistrationNumber={setRegistrationNumber} setSelectedStudents={setSelectedStudents}  key={carObj.id}/>
                ))
            }
            </div>
        </Segment>
    )
}