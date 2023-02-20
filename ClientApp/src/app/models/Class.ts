import { Student } from "./Student";

export interface Schoolclass{
    id: number,
    className: string,
    students: Array<Student> 
}