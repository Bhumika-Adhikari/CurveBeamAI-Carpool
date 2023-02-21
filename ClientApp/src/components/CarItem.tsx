import axios from "axios";
import { useState } from "react";
import { Confirm, Header, Icon, IconGroup, List, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";

interface Prop {
    car: PickupCar,
    handleCarDeletion: (car: PickupCar) => void,
    handleCarEdit: (CarForEdit: PickupCar) => void,
    handleCarLeft: (car: PickupCar)=> void,
    disableCar: boolean,
    index: number
    handleCarNext:(index:number) => void
}
export default function CarItem({ car, handleCarDeletion, handleCarEdit,handleCarLeft,disableCar,index,handleCarNext }: Prop) {
   
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    return (
        <div className="card" style={{opacity: disableCar? .45 : '' ,color: disableCar? 'rgba(40,40,40,.3)': ''}}>
            <div className="content">
                <div className="header" >
                    {car.registrationNumber}
                    <span style={{display: disableCar? '': 'none', float:'right'}}>
                        (Left)
                    </span>
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
                    <button style={{display: index==0? '':'none' }} className="ui positive   button" onClick={() => handleCarLeft(car)}>Mark Car Left</button>
                    <button style={{display: index==0? 'none':'' }} className="ui primary button" onClick={() => handleCarNext(index)}>Mark Car Next</button>
                </span>
                <span className="right floated icons" style={{ padding: '0.5em' }}>
                    <i typeof="button" className="edit alternate outline` icon" onClick={() => handleCarEdit(car)} style={{ cursor: "pointer", fontSize: "1.2em" }} ></i>
                    <i typeof="button" className="trash alternate outline icon" onClick={() => setShowConfirmation(true)} style={{ cursor: "pointer", fontSize: "1.2em" }}></i>
                        <Confirm open={showConfirmation}
                            content='Are you sure you want to delete this car?'
                            cancelButton='No'
                            confirmButton="Yes, I'm sure."
                            onCancel={() => setShowConfirmation(false)}
                            onConfirm={() => {handleCarDeletion(car)}}>
                        </Confirm>
                </span>
            </div>
        </div>
    );
}