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
    const [showClearConfirmation, setShowClearConfirmation] = useState<boolean>(false);
    const [showResetConfirmation, setShowResetConfirmation] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSomeError, setSomeErrorFlag] = useState<boolean>(false);
    const [iscarLeftError, setIsCarLetError] = useState<boolean>(false);


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
        setError('');
        setSelectedStudents([]);
        setEditCar(false);
        setpickupCarforEdit(undefined);
    }

    function submitCar() {

        if (carRegistrationNumber.length <= 0) {
            setSomeErrorFlag(true);
            setError('Enter a valid registration number');
            return;
        }
        if (selectedStudents.length == 0) {
            setSomeErrorFlag(true);
            setError('Please select some students for the car');
            return;
        }
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
                    // setPickupCars([...pickupCars.slice(0, index), ...pickupCars.slice(index + 1)]);
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
    function handleInputchanges(event: ChangeEvent<HTMLInputElement>) {
        setIsCarLetError(false);
        var value = event.target.value;
        setRegistrationNumber(event.target.value);
        if(value.length == 0)
        {
            setSomeErrorFlag(false);
            setError('');
        }
        else if (value.length < 6) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Registration number should be atleast 6 characters');
            return;
        }
        else if (Boolean(!value.match(/^[A-Za-z0-9]*$/))) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Registration number should not contain special characters');
            return;
        }
        else if (pickupCars.findIndex(p => p.registrationNumber == value) >= 0) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Please enter a unique registration number');
            return;
        }
        else {
            setvalidRegistrationNumber(true);
            setSomeErrorFlag(false);
            setError('');
        }

    }

    function handleCarDeletion(car: PickupCar) {
        var index = pickupCars.findIndex(c => c.id == car.id);
        axios.post<PickupCar>(baseURL + 'PickupCar/DeletePickupcar', car)
            .then(response => {
                setPickupCars([...pickupCars.slice(0, index), ...pickupCars.slice(index + 1)]);
                resetCarpoolDashboardValues();
                window.scrollTo(0, 0);
            })

    }
    function handleCarEdit(cartoEdit: PickupCar) {
        resetCarpoolDashboardValues();
        updateSelectedStudents(cartoEdit.students);
        setvalidRegistrationNumber(true);
        setRegistrationNumber(cartoEdit.registrationNumber);
        setEditCar(true);
        //setSelectedStudents(cartoEdit.students);
        setpickupCarforEdit(cartoEdit);
        setError('');
        setIsCarLetError(false);
        window.scrollTo(0, 0);
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
            setIsCarLetError(true);
            //setError("Car cannot be marked left, Please remove student/s who has already left");

        }
        else {
            setIsCarLetError(false);
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


    function handleClearCarpool() {
        axios.post<PickupCar>(baseURL + 'PickupCar/ClearPickupCars')
            .then(response => {
                setPickupCars([]);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowClearConfirmation(false);
            })
    }
    function handleResetCarpool(){
        axios.post<Array<PickupCar>>(baseURL + 'PickupCar/ResetPickupCars')
            .then(response => {
                setPickupCars(response.data);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowResetConfirmation(false);
            })
    }
    function handleCarNext(index: number) {
        var array = [...pickupCars];
        var car = array[index];
        array.splice(index, 1);
        array.unshift(car);
        setPickupCars(array);
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
    return (
        <Segment>
            <Segment className="ui" >
                <Form>
                    <Form.Input placeholder="Add New Car Registration number" value={carRegistrationNumber} onChange={handleInputchanges}></Form.Input>
                    <div className="error" id="title-error" role="alert" style={{ color: 'indianred', display: isSomeError ? '' : 'none' }}>{error}</div>
                    <Button disabled={(!validRegistrationNumber)} style={{ display: isEditCarEnabled ? "none" : "" }} className="ui basic primary button" type='submit' onClick={submitCar}>Add Car</Button>
                    <Button disabled={(!validRegistrationNumber)} style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui basic primary button" type='submit' onClick={submitCar}>Edit Car</Button>
                    <Button style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui basic negative right button" onClick={() => { resetCarpoolDashboardValues() }}>Cancel</Button>
                </Form>
            </Segment>
            <Segment>
                <div style={{ overflow: 'auto' }} className="ui cards">
                    <div className="header attached" style={{ fontWeight: 700, fontSize: '1.28571429em', marginTop: '-0.21425em', lineHeight: '1.28571429em', padding: '1em 1em', width: '100%' }}>
                        Carpool Lane
                        <span style={{ display: pickupCars.length == 0 ? '' : 'none', fontWeight: 'normal', fontSize: '12px', marginLeft: '10px' }}> (Please add cars to carpool) </span>
                        <span className="error" id="title-error" role="alert" style={{ fontWeight: 'normal', fontSize: '12px', color: 'indianred', display: iscarLeftError ? '' : 'none', marginLeft: '10 px' }}> (Car cannot be marked left, Please remove student/s who has already left. )</span>
                        <Button disabled={pickupCars.length == 0} className="basic primary" onClick={() => setShowResetConfirmation(true)} style={{float: 'right' }}> Reset Carpool</Button>
                        <Confirm open={showResetConfirmation}
                            content='Are you sure you want to reset the carpool ? This will revert all left cars.'
                            cancelButton='No'
                            confirmButton="Yes, I'm sure."
                            onCancel={() => setShowResetConfirmation(false)}
                            onConfirm={() => handleResetCarpool()}>
                        </Confirm>
                        <Button disabled={pickupCars.length == 0} className="basic negative" onClick={() => setShowClearConfirmation(true)} style={{ float: 'right' }}> Clear Carpool</Button>
                        <Confirm open={showClearConfirmation}
                            content='Are you sure you want to clear the carpool ? This will remove all pickup cars.'
                            cancelButton='No'
                            confirmButton="Yes, I'm sure."
                            onCancel={() => setShowClearConfirmation(false)}
                            onConfirm={() => handleClearCarpool()}>
                        </Confirm>
                    </div>
                    {
                        pickupCars.map((carObj, carIndex) => (
                            <CarItem handleCarNext={handleCarNext} key={carObj.id} index={carIndex} disableCar={carObj.hasLeft ? true : false} handleCarLeft={handleCarLeft} handleCarDeletion={handleCarDeletion} car={carObj} handleCarEdit={handleCarEdit} />
                        ))
                    }
                </div>
            </Segment>
        </Segment>
    )
}