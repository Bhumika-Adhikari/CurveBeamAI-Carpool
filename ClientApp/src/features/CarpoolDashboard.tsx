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


    useEffect(() => {
        axios.get<Schoolclass[]>('http://localhost:5002/classes/GetClasses')
            .then(response => {
                setSchoolclasses(response.data);
            })
    }, [])

    return (
        <>
            {
                schoolClasses.map(classobj => (
                    <Segment clearing>
                        <Header>
                            Class {classobj.className}
                        </Header>
                        <ClassItem schoolclass={classobj} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} key={classobj.id} disabledStudents={disabledStudents} />
                    </Segment>
                ))}
            <CarpoolLane setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} setDisabledStudents={setDisabledStudents} />
        </>
    )
}