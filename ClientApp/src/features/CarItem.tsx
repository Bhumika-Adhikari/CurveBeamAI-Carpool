import axios from "axios";
import { Header, List, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";

interface Prop {
    car: PickupCar,
    setSelectedStudents:(selectedStudents:Student[])=> void,
    setRegistrationNumber:(carRegistrationNumber:string)=> void
    EditCar:(EditCar : boolean)=>void,
    setpickupCarforEdit:(pickupCarforEdit : PickupCar) => void
  //  handleSelectedCarForEdit: (CarForEdit : PickupCar) => void
}
export default function CarItem({ car,setSelectedStudents,setRegistrationNumber,EditCar,setpickupCarforEdit}: Prop) {

    function handleSelectedCarForEdit(cartoEdit : PickupCar){
        setRegistrationNumber(cartoEdit.registrationNumber);
        EditCar(true);
        setSelectedStudents(cartoEdit.students);
        setpickupCarforEdit(cartoEdit);
    }
    function handleCancelSelectedCarForEdit(cartoEdit : PickupCar){
        // cartoEdit.students.forEach(student => {
        //     student.isSelected = true;
        // });
        // //setCarforEdit(cartoEdit);
        // setRegistrationNumber(cartoEdit.registrationNumber);
        // setSelectedStudents([]);

    }
    function handleSelectedCarDeletion(car : PickupCar){
        axios.post<PickupCar>('http://localhost:5002/PickupCar/DeletePickupcar',car)
        .then(response => {
            console.log(response);
        })
    }

    return (
        <div className="card">
            <div className="content">
                <div className="header" >
                    {car.registrationNumber}
                </div>
                <div className="description">
                    {
                        car.students.map((student: Student) => (
                            <List key={student.id}>
                                {student.studentName}
                            </List>
                        ))
                    }
                </div>
            </div>
            <div className="extra content">
                <span className="right floated star">
                    <i className="edit icon" onClick={()=> handleSelectedCarForEdit(car)} style={{cursor: "pointer"}}></i>
                    <i className="trash icon" onClick={()=> handleSelectedCarDeletion(car)} style={{cursor: "pointer"}}></i>
                </span>
            </div>
        </div>
    );
}