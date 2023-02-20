import axios from "axios";
import { useState } from "react";
import { Header, Icon, IconGroup, List, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";

interface Prop {
    car: PickupCar,
    handleCarDeletion: (car: PickupCar) => void,
    handleCarEdit: (CarForEdit: PickupCar) => void,
    handleCarLeft: (car: PickupCar)=> void,
    setDisableCar:(isCarDisabled : boolean)=>void,
    disableCar: boolean
}
export default function CarItem({ car, handleCarDeletion, handleCarEdit,handleCarLeft,disableCar }: Prop) {
   
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
            <div className="extra content" style={{ display: disableCar ? "none" : "block" }}>
                <span className="left floated">
                    <button className="ui primary button" onClick={() => handleCarLeft(car)}>Mark Car Left</button>
                </span>
                <span className="right floated icons" style={{ padding: '0.5em' }}>
                    <i typeof="button" className="edit alternate outline` icon" onClick={() => handleCarEdit(car)} style={{ cursor: "pointer", fontSize: "1.2em" }} ></i>
                    <i typeof="button" className="trash alternate outline icon" onClick={() => handleCarDeletion(car)} style={{ cursor: "pointer", fontSize: "1.2em" }}></i>
                </span>
            </div>
        </div>
    );
}