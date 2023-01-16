import { PatientDetails } from "./patientDetails";
import { PatientLoging } from "./PatientLogin";

export class Patient{
    patientDetails:PatientDetails=new PatientDetails();
    patientLogin:PatientLoging =new PatientLoging();
}