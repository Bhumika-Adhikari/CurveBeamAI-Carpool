import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { PickupCar } from "../app/models/PickupCar";
import { Student } from "../app/models/Student";

interface Props {
    setvalidRegistrationNumber: (isvalidRegistrationNumber : boolean) => void,
    selectedStudents: Student[],
    carRegistrationNumber: string
    isEditCarEnabled:boolean
    pickupCars: PickupCar[]
    setRegistrationNumber:(number: string)=> void
    validRegistrationNumber: boolean,
    CreateEditCarAPI:()=>void
}

export default function CarForm({ setvalidRegistrationNumber, selectedStudents,carRegistrationNumber,isEditCarEnabled,pickupCars,setRegistrationNumber,validRegistrationNumber,CreateEditCarAPI }: Props) {
    const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;

    const [error, setError] = useState<string>('');
    const [isSomeError, setSomeErrorFlag] = useState<boolean>(false);

    function resetCarpoolDashboardValues(){
        setRegistrationNumber('');
        setvalidRegistrationNumber(false);
        setError('');
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
        CreateEditCarAPI();
    }


    function handleInputchanges(event: ChangeEvent<HTMLInputElement>) {
        var value = event.target.value;
        setRegistrationNumber(event.target.value);
        if (value.length == 0) {
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
    return (<Segment className="ui" >
        <Form>
            <Form.Input placeholder="Add New Car Registration number" value={carRegistrationNumber} onChange={handleInputchanges}></Form.Input>
            <div className="error" id="title-error" role="alert" style={{ color: 'indianred', display: isSomeError ? '' : 'none' }}>{error}</div>
            <Button disabled={(!validRegistrationNumber)} style={{ display: isEditCarEnabled ? "none" : "" }} className="ui basic primary button" type='submit' onClick={submitCar}>Add Car</Button>
            <Button disabled={(!validRegistrationNumber)} style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui basic primary button" type='submit' onClick={submitCar}>Edit Car</Button>
            <Button style={{ display: !isEditCarEnabled ? "none" : "" }} className="ui basic negative right button" onClick={() => { resetCarpoolDashboardValues() }}>Cancel</Button>
        </Form>
    </Segment>)
}
