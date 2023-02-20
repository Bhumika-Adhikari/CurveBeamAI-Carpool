import React, { useEffect, useState } from 'react';
import { Header, Segment, List, Grid, Checkbox, ListHeader, ListItem, ListContent } from 'semantic-ui-react';
import { Schoolclass } from '../app/models/Class';
import { PickupCar } from '../app/models/PickupCar';
import { Student } from '../app/models/Student';


interface Props {
    schoolclass: Schoolclass,
    selectedStudents: Student[],
    setSelectedStudents: (argument0: Student[]) => void
    disabledStudents: Student[],
    validRegistrationNumber: boolean
}

export default function ClassItem({ schoolclass, selectedStudents, setSelectedStudents, disabledStudents, validRegistrationNumber }: Props) {

    const [totalNumberOfStudents, setTotalNumberOfStudents] = useState<number>(schoolclass.students.length);
    const [StudentsLeft, setStudentsLeft] = useState<number>(0);

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
    function getdisabledProperty(disabledStudents: Student[], currentId: number) {
        if (!validRegistrationNumber)
            return true;
        return disabledStudents.findIndex(student => student.id == currentId) >= 0 ? true : false;
    }
    function getcheckedProperty(selectedStudents: Student[], currentId: number) {
        // console.log(selectedStudents.findIndex(student => student.id == currentId) >= 0 ? true : false);
        return selectedStudents.findIndex(student => student.id == currentId) >= 0 ? true : false;
    }
    function getStudentsLeft()
    {
        var count = 0;
        disabledStudents.forEach(student => {
            if(schoolclass.students.findIndex(s=> student.id == s.id) >=0)
            {
                ++count;
            }
        });
        return count;
    }
    return (
        <>
            <Header>
                Class {schoolclass.className}
                <span className="ui" style={{float:'right'}}>
                    {getStudentsLeft()}/{totalNumberOfStudents}
                </span>
            </Header>
            <List horizontal>
                {schoolclass.students.map((studentobj: Student) => (
                    <ListItem key={studentobj.id}>
                        <>
                            <input type="checkbox" disabled={getdisabledProperty(disabledStudents, studentobj.id) || !validRegistrationNumber} checked={getcheckedProperty(selectedStudents, studentobj.id)} onChange={() => { }} style={{ marginRight: 10 }} onClick={() => handleSelectedStudent(schoolclass.id, studentobj.id)} value={studentobj.id}>
                            </input>
                            <span>{studentobj.studentName} </span>
                        </>
                    </ListItem>
                ))
                }
            </List>

        </>
    )
}
