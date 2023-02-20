import React, { useEffect, useState } from 'react';
import { Header, Segment, List, Grid, Checkbox } from 'semantic-ui-react';
import { Schoolclass } from '../app/models/Class';
import { PickupCar } from '../app/models/PickupCar';
import { Student } from '../app/models/Student';


interface Props {
    schoolclass: Schoolclass,
    selectedStudents: Student[],
    setSelectedStudents: (argument0: Student[]) => void

}

export default function ClassItem({ schoolclass, selectedStudents, setSelectedStudents }: Props) {

    function handleSelectedStudent(classid: number, studentid: number) {

        var studentIndex: number = schoolclass.students.findIndex(s => s.id === studentid);
        var SelectstudentIndex = selectedStudents?.findIndex(obj => obj.id === studentid);
        var _arr = selectedStudents;

        if (studentIndex != -1 && SelectstudentIndex == -1) {
            setSelectedStudents([...selectedStudents, schoolclass.students[studentIndex]]);
            console.log(selectedStudents);
        }
        else if (SelectstudentIndex != -1) {
            setSelectedStudents([...selectedStudents.slice(0, SelectstudentIndex), ...selectedStudents.slice(SelectstudentIndex + 1)]);
        }
    }
    function getcheckedProperty(selectedStudents: Student[], currentId: number) {
        console.log(selectedStudents.findIndex(student => student.id == currentId) >= 0 ? true : false);
        return selectedStudents.findIndex(student => student.id == currentId) >= 0 ? true : false;
    }
    return (
        <div className="six wide column">
            <Header attached >
                Class {schoolclass.className}
            </Header>
            <List>
                {schoolclass.students.map((studentobj: Student) => (
                    <List.Item key={studentobj.id}>
                        <List.Content>
                            <Checkbox checked={getcheckedProperty(selectedStudents, studentobj.id)} style={{ marginRight: 10 }} onClick={() => handleSelectedStudent(schoolclass.id, studentobj.id)} value={studentobj.id}>
                            </Checkbox>
                            {studentobj.studentName}
                        </List.Content>
                    </List.Item>
                ))
                }
            </List>
        </div>
    )
}
