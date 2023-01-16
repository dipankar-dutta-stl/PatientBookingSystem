import { AppointmentSchedule } from "./AppointmentSchedule";
import { DoctorDetails } from "./DoctorDetails";
import { DoctorLogin } from "./DoctorLogin";

export class Doctor{
    dl:DoctorLogin=new DoctorLogin();
    dd:DoctorDetails=new DoctorDetails();
    as:AppointmentSchedule[]=[];
}