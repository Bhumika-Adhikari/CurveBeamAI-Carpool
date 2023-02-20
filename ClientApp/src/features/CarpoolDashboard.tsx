import axios from 'axios';
import react, { ChangeEvent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Schoolclass } from '../app/models/Class';
import { PickupCar } from '../app/models/PickupCar';
import { Student } from '../app/models/Student';
import CarpoolLane from './CarpoolLane';
import ClassItem from './ClassItem';


export default function CarpoolDashboard() {

    const [schoolClasses, setSchoolclasses] = useState<Schoolclass[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
    const [carRegistrationNumber, setRegistrationNumber] = useState('');
    const [pickupcarForEdit, setpickupCarforEdit] = useState<PickupCar>();
    const [EditCar, setEditCar] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Schoolclass[]>('http://localhost:5002/classes/GetClasses')
            .then(response => {
                //console.log(response);

                // response.data.forEach(classObj => {
                //     classObj.students.forEach(student => {
                //         student.isSelected = false;
                //     })
                // });
                setSchoolclasses(response.data);
            })
    }, [])

    function handleInputchanges(event: ChangeEvent<HTMLInputElement>) {
        setRegistrationNumber(event.target.value);
    }

    function submitCar() {

        var car: PickupCar = {} as PickupCar;
        car.registrationNumber = carRegistrationNumber;
        car.students = selectedStudents;
        if (EditCar && pickupcarForEdit != undefined) {
            car.id = pickupcarForEdit.id;
            axios.post<PickupCar>('http://localhost:5002/PickupCar/UpdatePickupCar', car)
                .then(response => {
                    console.log(response);
                })
        }
        else{
        axios.post<PickupCar>('http://localhost:5002/PickupCar/CreatePickupCar', car)
            .then(response => {
                console.log(response);
            })
        }
    }



    return (
        <div className="ui grid ">
            {
                schoolClasses.map(classobj => (
                    <ClassItem schoolclass={classobj} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} key={classobj.id} />
                ))}
            <div className="four wide column">
                <Segment clearing>
                    <Form>
                        <Form.Input placeholder="Car Registration number" value={carRegistrationNumber} onChange={handleInputchanges}></Form.Input>
                        <Button type='submit' onClick={submitCar}>Submit</Button>
                    </Form>
                </Segment>
                <CarpoolLane setpickupCarforEdit={setpickupCarforEdit} EditCar={setEditCar} setRegistrationNumber={setRegistrationNumber} setSelectedStudents={setSelectedStudents} />
            </div>

        </div>
    )
}