import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Confirm, Form, Header, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";
import CarForm from "./CarForm";
import CarItem from "./CarItem";
import CarpoolHeader from "./CarpoolHeader";

interface Props {
    setSelectedStudents: (selectedStudents: Student[]) => void,
    selectedStudents: Array<Student>,
    setDisabledStudents: (disabledStudents: Student[]) => void
    setvalidRegistrationNumber: (isvalidRegistrationNumber: boolean) => void
    validRegistrationNumber: boolean,
    disabledStudents: Array<Student>,
    isEditCarEnabled: boolean,
    setEditCar: (editcar: boolean) => void

}
export default function CarpoolLane({ setSelectedStudents, selectedStudents, setDisabledStudents, setvalidRegistrationNumber, validRegistrationNumber, setEditCar, isEditCarEnabled, disabledStudents }: Props) {
    const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;

    const [pickupCars, setPickupCars] = useState<PickupCar[]>([]);
    const [carRegistrationNumber, setRegistrationNumber] = useState('');
    const [pickupcarForEdit, setpickupCarforEdit] = useState<PickupCar | undefined>();
  

    useEffect(() => {
        axios.get<PickupCar[]>(baseURL + 'PickupCar/GetCars')
            .then(response => {
                setPickupCars(response.data);
                AddLeftCarDisabledStudents(response.data);
            })
    }, [])

    function AddLeftCarDisabledStudents(cars: PickupCar[]) {
        var array: Array<Student> = [];
        cars.forEach(car => {
            if (car.hasLeft)
                array.push(...car.students);
        });
        setDisabledStudents(array);
    }


    function resetCarpoolDashboardValues() {
        setRegistrationNumber('');
        setvalidRegistrationNumber(false);
        setSelectedStudents([]);
        setEditCar(false);
        setpickupCarforEdit(undefined);
    }

    function handleCarEditParent(cartoEdit: PickupCar) {
        resetCarpoolDashboardValues();
        updateSelectedStudents(cartoEdit.students);
        setvalidRegistrationNumber(true);
        setRegistrationNumber(cartoEdit.registrationNumber);
        setEditCar(true);
        setpickupCarforEdit(cartoEdit);
        window.scrollTo(0, 0);
    }

    function updateSelectedStudents(students: Student[]) {
        var arr: Array<Student> = [];
        students.forEach(student => {
            if (disabledStudents.findIndex(d => d.id == student.id) < 0) {
                arr.push(student);
            }
        });
        setSelectedStudents(arr);
    }

    function CreateEditCarAPI(){
        var car: PickupCar = {} as PickupCar;
        car.registrationNumber = carRegistrationNumber;
        car.students = selectedStudents;
        if (isEditCarEnabled && pickupcarForEdit != undefined) {
            car.id = pickupcarForEdit.id;
            var index: number = pickupCars.findIndex(x => x.id === pickupcarForEdit.id);
            axios.post<PickupCar>(baseURL + 'PickupCar/UpdatePickupCar', car)
                .then(response => {
                    var array = [...pickupCars];
                    array.splice(index, 1);
                    array.unshift(response.data);
                    setPickupCars(array);
                    resetCarpoolDashboardValues();
                })
        }
        else {
            axios.post<PickupCar>(baseURL + 'PickupCar/CreatePickupCar', car)
                .then(response => {
                    setPickupCars([response.data, ...pickupCars]);
                    resetCarpoolDashboardValues();
                })
        }
    }

    return (
        <Segment>
            <CarForm setvalidRegistrationNumber={setvalidRegistrationNumber} selectedStudents={selectedStudents} carRegistrationNumber={carRegistrationNumber} isEditCarEnabled={isEditCarEnabled} pickupCars={pickupCars} setRegistrationNumber={setRegistrationNumber}validRegistrationNumber={validRegistrationNumber} CreateEditCarAPI={CreateEditCarAPI} / >
            <Segment>
                <div style={{ overflow: 'auto' }} className="ui cards">
                    <CarpoolHeader pickupCars={pickupCars} setDisabledStudents={setDisabledStudents} setPickupCars={setPickupCars} resetCarpoolDashboardValues={resetCarpoolDashboardValues}/>

                    <CarItem pickupCars={pickupCars} handleCarEdit={handleCarEditParent} disabledStudents = {disabledStudents}setPickupCars={setPickupCars} setDisabledStudents = {setDisabledStudents}  resetCarpoolDashboardValues={resetCarpoolDashboardValues} />

                </div>
            </Segment>
        </Segment>
    )
}