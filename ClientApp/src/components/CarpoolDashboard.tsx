import axios from "axios";
import {
  useEffect,
  useState,
} from "react";
import { Segment } from "semantic-ui-react";
import { Schoolclass } from "../app/models/Class";
import { Student } from "../app/models/Student";
import CarpoolLane from "./CarpoolLane";
import ClassItem from "./ClassItem";

export default function CarpoolDashboard() {
    
  const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;
  const [schoolClasses, setSchoolclasses] = useState<Schoolclass[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [disabledStudents, setDisabledStudents] = useState<Student[]>([]);
  const [validRegistrationNumber, setvalidRegistrationNumber] =
    useState<boolean>(false);
  const [isEditCarEnabled, setEditCar] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Schoolclass[]>(baseURL + "classes/GetClasses")
      .then((response) => {
        setSchoolclasses(response.data);
      });
  }, []);

  return (
    <>
      {schoolClasses.map((classobj) => (
        <Segment key={classobj.id} clearing disabled={!validRegistrationNumber}>
          <ClassItem
            validRegistrationNumber={validRegistrationNumber}
            schoolclass={classobj}
            setSelectedStudents={setSelectedStudents}
            selectedStudents={selectedStudents}
            disabledStudents={disabledStudents}
          />
        </Segment>
      ))}
      <CarpoolLane
        setEditCar={setEditCar}
        isEditCarEnabled={isEditCarEnabled}
        validRegistrationNumber={validRegistrationNumber}
        setvalidRegistrationNumber={setvalidRegistrationNumber}
        setSelectedStudents={setSelectedStudents}
        selectedStudents={selectedStudents}
        setDisabledStudents={setDisabledStudents}
        disabledStudents={disabledStudents}
      />
    </>
  );
}
