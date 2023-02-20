import { Student } from "./Student";

export interface PickupCar{
    id: number,
    registrationNumber:string,
    students: Array<Student>
}