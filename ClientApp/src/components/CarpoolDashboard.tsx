import axios from 'axios';
import react, { ChangeEvent, HtmlHTMLAttributes, useEffect, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Schoolclass } from '../app/models/Class';
import { PickupCar } from '../app/models/PickupCar';
import { Student } from '../app/models/Student';
import CarpoolLane from './CarpoolLane';
import ClassItem from './ClassItem';


export default function CarpoolDashboard() {

    const [schoolClasses, setSchoolclasses] = useState<Schoolclass[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
    const [disabledStudents, setDisabledStudents] = useState<Student[]>([]);
    const [validRegistrationNumber, setvalidRegistrationNumber] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Schoolclass[]>('http://localhost:5002/classes/GetClasses')
            .then(response => {
                setSchoolclasses(response.data);
            })
    }, [])

    // function disableAllstudents(){
    //     var array : Student[] = [];
    //     schoolClasses.forEach(classObj => {
    //         array.push(...classObj.students);
    //     });
    //     setDisabledStudents(array);
    // }

    return (
        <>
            {
                schoolClasses.map(classobj => (
                    <Segment key={classobj.id} clearing disabled={!validRegistrationNumber}>
                        <ClassItem validRegistrationNumber={validRegistrationNumber} schoolclass={classobj} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} disabledStudents={disabledStudents} />
                    </Segment>
                ))}
            <CarpoolLane validRegistrationNumber={validRegistrationNumber} setvalidRegistrationNumber={setvalidRegistrationNumber} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} setDisabledStudents={setDisabledStudents} disabledStudents={disabledStudents} />
        </>
    )
}