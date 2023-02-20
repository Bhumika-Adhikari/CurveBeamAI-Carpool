import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Confirm, Form, Header, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";
import CarItem from "./CarItem";

interface Props {
    setSelectedStudents: (selectedStudents: Student[]) => void,
    selectedStudents: Array<Student>,
    setDisabledStudents: (disabledStudents: Student[]) => void

}
export default function CarpoolLane({ setSelectedStudents, selectedStudents, setDisabledStudents }: Props) {

    const [pickupCars, setPickupCars] = useState<PickupCar[]>([]);
    const [carRegistrationNumber, setRegistrationNumber] = useState('');
    const [pickupcarForEdit, setpickupCarforEdit] = useState<PickupCar | undefined>();
    const [isEditCarEnabled, setEditCar] = useState<boolean>(false);
    const [disableCar, setDisableCar] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);


    useEffect(() => {
        axios.get<PickupCar[]>('http://localhost:5002/PickupCar/GetCars')
            .then(response => {
                setPickupCars(response.data);
                AddDisabledStudents(response.data);
            })
    }, [])
    function AddDisabledStudents(cars: PickupCar[]) {
        var array: Array<Student> = [];
        cars.forEach(car => {
            if (car.hasLeft)
                array.push(...car.students);
        });
        setDisabledStudents(array);
    }
    function resetCarpoolDashboardValues() {
        setRegistrationNumber('');
        setSelectedStudents([]);
        setEditCar(false);
        setpickupCarforEdit(undefined);
    }

    function submitCar() {

        var car: PickupCar = {} as PickupCar;
        car.registrationNumber = carRegistrationNumber;
        car.students = selectedStudents;
        if (isEditCarEnabled && pickupcarForEdit != undefined) {
            car.id = pickupcarForEdit.id;
            var index: number = pickupCars.findIndex(x => x.id === pickupcarForEdit.id);
            axios.post<PickupCar>('http://localhost:5002/PickupCar/UpdatePickupCar', car)
                .then(response => {
                    var array = [...pickupCars];
                    array.splice(index, 1);
                    array.unshift(response.data);
                    // setPickupCars([...pickupCars.slice(0, index), ...pickupCars.slice(index + 1)]);
                    setPickupCars(array);
                    resetCarpoolDashboardValues();
                })
        }
        else {
            axios.post<PickupCar>('http://localhost:5002/PickupCar/CreatePickupCar', car)
                .then(response => {
                    setPickupCars([response.data, ...pickupCars]);
                    resetCarpoolDashboardValues();
                })
        }
    }
    function handleInputchanges(event: ChangeEvent<HTMLInputElement>) {
        setRegistrationNumber(event.target.value);
    }

    function handleCarDeletion(car: PickupCar) {
        var index = pickupCars.findIndex(c => c.id == car.id);
        axios.post<PickupCar>('http://localhost:5002/PickupCar/DeletePickupcar', car)
            .then(response => {
                setPickupCars([...pickupCars.slice(0, index), ...pickupCars.slice(index + 1)]);
                resetCarpoolDashboardValues();
            })

    }
    function handleCarEdit(cartoEdit: PickupCar) {
        setRegistrationNumber(cartoEdit.registrationNumber);
        setEditCar(true);
        setSelectedStudents(cartoEdit.students);
        setpickupCarforEdit(cartoEdit);
    }

    function handleCarLeft(car: PickupCar) {
        var index = pickupCars.findIndex(x => x.id === car.id);
        axios.post<PickupCar>('http://localhost:5002/PickupCar/MarkCarLeft', car)
            .then(response => {
                var array = [...pickupCars]
                array.splice(index, 1);
                array.push(response.data);
                setPickupCars(array);
                setDisabledStudents(response.data.students);
            })
    }

    function handleResetCarpool() {
        axios.post<PickupCar>('http://localhost:5002/PickupCar/ResetPickupCars')
            .then(response => {
                setPickupCars([]);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowConfirmation(false);
            })
    }

    return (
        <Segment>
            <Segment className="ui" >
                <Form>
                    <Form.Input placeholder="Car Registration number" value={carRegistrationNumber} onChange={handleInputchanges}></Form.Input>
                    <Button className="ui primary button" type='submit' onClick={submitCar}>Submit</Button>
                    <Button style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui right button" onClick={() => { resetCarpoolDashboardValues()}}>Cancel</Button>
                </Form>
            </Segment>
            <Segment>
                <div style={{ overflow: 'auto' }} className="ui cards">
                    <div className="header attached" style={{ fontWeight: 700, fontSize: '1.28571429em', marginTop: '-0.21425em', lineHeight: '1.28571429em', padding: '1em 1em', width: '100%' }}>
                        Carpool Lane
                        <i className="redo alternate icon right" onClick={() => setShowConfirmation(true)} style={{ color: 'rgba(0,0,0,.4)', float: 'right', cursor: 'pointer' }}></i>
                        <Confirm open={showConfirmation}
                            content='Are you sure you want to reset the carpool. This will remove all progress.'
                            cancelButton='No'
                            confirmButton="Yes, I'm sure."
                            onCancel={() => setShowConfirmation(false)}
                            onConfirm={handleResetCarpool}>
                        </Confirm>
                    </div>
                    {
                        pickupCars.map(carObj => (
                            <CarItem key={carObj.id} disableCar={carObj.hasLeft ? true : false} setDisableCar={setDisableCar} handleCarLeft={handleCarLeft} handleCarDeletion={handleCarDeletion} car={carObj} handleCarEdit={handleCarEdit} />
                        ))
                    }
                </div>
            </Segment>
        </Segment>
    )
}