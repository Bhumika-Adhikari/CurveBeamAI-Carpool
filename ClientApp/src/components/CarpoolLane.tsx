import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Confirm, Form, Header, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";
import CarItem from "./CarItem";
import Draggable, { DraggableCore } from "react-draggable";

interface Props {
    setSelectedStudents: (selectedStudents: Student[]) => void,
    selectedStudents: Array<Student>,
    setDisabledStudents: (disabledStudents: Student[]) => void
    setvalidRegistrationNumber: (isvalidRegistrationNumber: boolean) => void
    validRegistrationNumber: boolean,
    disabledStudents: Array<Student>

}
export default function CarpoolLane({ setSelectedStudents, selectedStudents, setDisabledStudents, setvalidRegistrationNumber, validRegistrationNumber, disabledStudents }: Props) {
    const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;

    const [pickupCars, setPickupCars] = useState<PickupCar[]>([]);
    const [carRegistrationNumber, setRegistrationNumber] = useState('');
    const [pickupcarForEdit, setpickupCarforEdit] = useState<PickupCar | undefined>();
    const [isEditCarEnabled, setEditCar] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
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

        if(carRegistrationNumber.length <= 0)
        {
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
        var value = event.target.value;
        setRegistrationNumber(event.target.value);
        if (value.length < 6) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Registration Number should be atleast 6 characters');
            return;
        }
        else if (Boolean(!value.match(/^[A-Za-z0-9]*$/))) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Registration Number should not contain special characters');
            return;
        }
        else if (pickupCars.findIndex(p => p.registrationNumber == value) >= 0) {
            setvalidRegistrationNumber(false);
            setSomeErrorFlag(true);
            setError('Please enter a unique Registration Number');
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
            })

    }
    function handleCarEdit(cartoEdit: PickupCar) {
        setvalidRegistrationNumber(true);
        setRegistrationNumber(cartoEdit.registrationNumber);
        setEditCar(true);
        setSelectedStudents(cartoEdit.students);
        setpickupCarforEdit(cartoEdit);
        setError('');
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
            setError("Car Cannot be marked left, Please remove student/s who has already left");

        }
        else {
            axios.post<PickupCar>(baseURL + 'PickupCar/MarkCarLeft', car)
                .then(response => {
                    var array = [...pickupCars]
                    var disabledStudentsOld = [...disabledStudents]
                    array.splice(index, 1);
                    array.push(response.data);
                    setPickupCars(array);
                    disabledStudentsOld.push(...response.data.students);
                    setDisabledStudents(disabledStudentsOld);
                })
        }
    }

    function handleResetCarpool() {
        axios.post<PickupCar>(baseURL + 'PickupCar/ResetPickupCars')
            .then(response => {
                setPickupCars([]);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowConfirmation(false);
            })
    }
    function handleCarNext(index : number){
            var array = [...pickupCars];
            var car = array[index];
            array.splice(index,1);
            array.unshift(car);
            setPickupCars(array);
    }

    return (
        <Segment>
            <Segment className="ui" >
                <Form>
                    <Form.Input placeholder="Enter Car Registration number" value={carRegistrationNumber} onChange={handleInputchanges}></Form.Input>
                    <div className="error" id="title-error" role="alert" style={{ color: 'indianred', display: isSomeError ? '' : 'none' }}>{error}</div>
                    <Button style={{ display: !validRegistrationNumber ? "none" : "" }} className="ui primary button" type='submit' onClick={submitCar}>Submit</Button>
                    <Button style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui right button" onClick={() => { resetCarpoolDashboardValues() }}>Cancel</Button>
                </Form>
            </Segment>
            <Segment>
                <div style={{ overflow: 'auto' }} className="ui cards">
                    <div className="header attached" style={{ fontWeight: 700, fontSize: '1.28571429em', marginTop: '-0.21425em', lineHeight: '1.28571429em', padding: '1em 1em', width: '100%' }}>
                        Carpool Lane
                        <div className="error" id="title-error" role="alert" style={{ fontWeight: 'normal', fontSize: '12px', color: 'indianred', display: iscarLeftError ? '' : 'none' }}>{error}</div>
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
                        pickupCars.map((carObj,carIndex) => (
                                <CarItem handleCarNext={handleCarNext} key={carObj.id} index={carIndex} disableCar={carObj.hasLeft ? true : false} handleCarLeft={handleCarLeft} handleCarDeletion={handleCarDeletion} car={carObj} handleCarEdit={handleCarEdit} />
                        ))
                    }
                </div>
            </Segment>
        </Segment>
    )
}