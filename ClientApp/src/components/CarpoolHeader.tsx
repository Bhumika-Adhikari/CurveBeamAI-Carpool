import axios from "axios";
import { useState } from "react";
import { Button, Confirm } from "semantic-ui-react"
import { PickupCar } from "../app/models/PickupCar"
import { Student } from "../app/models/Student";

interface Props {
    pickupCars: PickupCar[],
    setPickupCars: (cars: PickupCar[]) => void
    setDisabledStudents: (students: Student[]) => void
    resetCarpoolDashboardValues: () => void
}
export default function CarpoolHeader({ pickupCars, setPickupCars, setDisabledStudents, resetCarpoolDashboardValues }: Props) {
    const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;

    const [showClearConfirmation, setShowClearConfirmation] = useState<boolean>(false);
    const [showResetConfirmation, setShowResetConfirmation] = useState<boolean>(false);


    function handleClearCarpool() {
        axios.post<PickupCar>(baseURL + 'PickupCar/ClearPickupCars')
            .then(response => {
                setPickupCars([]);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowClearConfirmation(false);
            })
    }
    function handleResetCarpool() {
        axios.post<Array<PickupCar>>(baseURL + 'PickupCar/ResetPickupCars')
            .then(response => {
                setPickupCars(response.data);
                resetCarpoolDashboardValues();
                setDisabledStudents([]);
                setShowResetConfirmation(false);
            })
    }

    return (<div className="header attached" style={{ fontWeight: 700, fontSize: '1.28571429em', marginTop: '-0.21425em', lineHeight: '1.28571429em', padding: '1em 1em', width: '100%' }}>
        Carpool Lane
        <span style={{ display: pickupCars.length == 0 ? '' : 'none', fontWeight: 'normal', fontSize: '12px', marginLeft: '10px' }}> (Please add cars to carpool) </span>
        <Button disabled={pickupCars.length == 0} className="basic primary" onClick={() => setShowResetConfirmation(true)} style={{ float: 'right' }}> Reset Carpool</Button>
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
    </div>)
}