import axios from "axios";
import { useEffect, useState } from "react";
import { Confirm, Header, Icon, IconGroup, List, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";

interface Prop {
    pickupCars: PickupCar[],
    handleCarEdit: (CarForEdit: PickupCar) => void,
    disabledStudents: Student[],
    setPickupCars: (cars: PickupCar[]) => void,
    setDisabledStudents: (students: Student[]) => void
    resetCarpoolDashboardValues: () => void,
}
export default function CarItem({ pickupCars, handleCarEdit, disabledStudents, setPickupCars, setDisabledStudents, resetCarpoolDashboardValues }: Prop) {
    const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [isCarLeftError, setIsCarLeftError] = useState<boolean>(false);
    const [isCarLeftErrorIndex, setisCarLeftErrorIndex] = useState<number|undefined>();

    function handleCarNext(index: number) {
        var array = [...pickupCars];
        var car = array[index];
        array.splice(index, 1);
        array.unshift(car);
        setPickupCars(array);
    }

    function handleCarDeletion(car: PickupCar) {
        var index = pickupCars.findIndex(c => c.id == car.id);
        axios.post<PickupCar>(baseURL + 'PickupCar/DeletePickupcar', car)
            .then(response => {
                setPickupCars([...pickupCars.slice(0, index), ...pickupCars.slice(index + 1)]);
                resetCarpoolDashboardValues();
                setShowConfirmation(false);
                window.scrollTo(0, 0);
            })

    }

    function handleCarLeft(car: PickupCar) {
        var index = pickupCars.findIndex(x => x.id === car.id);
        var error = false;
        car.students.forEach(student => {
            if (disabledStudents.findIndex(s => s.id == student.id) >= 0)
                error = true;
            return;
        });

        if (error) {
            setIsCarLeftError(true);
            setisCarLeftErrorIndex(index);
        }
        else {
            setIsCarLeftError(false);
            setisCarLeftErrorIndex(undefined);
            axios.post<PickupCar>(baseURL + 'PickupCar/MarkCarLeft', car)
                .then(response => {
                    var array = [...pickupCars]
                    var disabledStudentsOld = [...disabledStudents]
                    array.splice(index, 1);
                    array.push(response.data);
                    setPickupCars(array);
                    disabledStudentsOld.push(...response.data.students);
                    setDisabledStudents(disabledStudentsOld);
                    resetCarpoolDashboardValues();
                })
        }
        window.scrollTo(0, 0);
    }

    function handleCarEditLocal(car : PickupCar){
        setIsCarLeftError(false);
        setisCarLeftErrorIndex(undefined);
        handleCarEdit(car);
    }

    return (
        <>
            {
                pickupCars.map((car, index) => (
                    <div key={car.id} className="card" style={{ opacity: car.hasLeft ? .45 : '', color: car.hasLeft ? 'rgba(40,40,40,.3)' : '' }}>
                        <div className="content">
                            <div className="header" >
                                {car.registrationNumber}
                                <div className="ui negative message" style={{display: (isCarLeftError && index ==isCarLeftErrorIndex)? '': 'none', fontSize: '10px', marginTop : '10px'}}>
                                    <div className="header">
                                    Car cannot be marked left, Please remove student/s who has already left. 
                                    </div>
                                    <p>
                                    </p></div>
                                <span style={{ display: car.hasLeft ? '' : 'none', float: 'right' }}>
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
                        <div className="extra content" style={{ display: car.hasLeft ? "none" : "block" }}>
                            <span className="left floated">
                                <button style={{ display: index == 0 ? '' : 'none' }} className="ui positive   button" onClick={() => handleCarLeft(car)}>Mark Car Left</button>
                                <button style={{ display: index == 0 ? 'none' : '' }} className="ui primary button" onClick={() => handleCarNext(index)}>Mark Car Next</button>
                            </span>
                            <span className="right floated icons" style={{ padding: '0.5em' }}>
                                <i key={car.id} typeof="button" className="edit alternate outline` icon" onClick={() => handleCarEditLocal(car)} style={{ cursor: "pointer", fontSize: "1.2em" }} ></i>
                                <i key={car.id} typeof="button" className="trash alternate outline icon" onClick={() => setShowConfirmation(true)} style={{ cursor: "pointer", fontSize: "1.2em" }}></i>
                                <Confirm open={showConfirmation}
                                    content='Are you sure you want to delete this car ?'
                                    cancelButton='No'
                                    confirmButton="Yes, I'm susre."
                                    onCancel={() => setShowConfirmation(false)}
                                    onConfirm={() => handleCarDeletion(car) }>
                                </Confirm>
                            </span>
                        </div>
                    </div>
                ))
            }
        </>
    );
}