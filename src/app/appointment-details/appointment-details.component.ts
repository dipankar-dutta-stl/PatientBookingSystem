import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';
import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { ADetails } from '../models/ADetails';
import jsPDF from 'jspdf';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  doctor: Doctor = new Doctor();
  patient: Patient = new Patient();
  appdetails: ADetails = new ADetails();
  tempList: ADetails[] = [];
  appointmentID:String;
  isDoctor: Boolean;
  searchKey: String;
  showSearch: Boolean = false;
  mainTable: Boolean = true;
  constructor(private router: Router, private dservice: DoctorService, private pservice: PatientService, private aservice: AppointmentService) { }

  ngOnInit(): void {
    this.searchKey = null;
    this.showSearch = false;
    this.mainTable = true;
    if (localStorage.getItem("current_user_type") == "PATIENT") {
      let resp = this.pservice.validateToken(localStorage.getItem("current_user"));
      resp.subscribe(data => {
        if (data == 'false') {
          localStorage.removeItem("current_user");
          localStorage.removeItem("user_email");
          localStorage.removeItem("current_user_type");
          this.router.navigateByUrl("error-message/TOKEN EXPRIERED. PLEASE LOGIN AGAIN.");
        }
      })
    }
    else if (localStorage.getItem("current_user_type") == "DOCTOR") {
      let resp = this.dservice.doDoctorvalidateToken(localStorage.getItem("current_user"));
      resp.subscribe(data => {
        if (data == 'false') {
          localStorage.removeItem("current_user");
          localStorage.removeItem("user_email");
          localStorage.removeItem("current_user_type");
          this.router.navigateByUrl("error-message/TOKEN EXPRIERED. PLEASE LOGIN AGAIN.");
        }
      })
    }

    if (localStorage.getItem("current_user") != null && localStorage.getItem("user_email") != null && localStorage.getItem("current_user_type") != null) {
      if (localStorage.getItem("current_user_type") == "DOCTOR") {
        this.isDoctor = true;
        let resp = this.dservice.getDoctor(localStorage.getItem("user_email"));
        resp.subscribe(data => {
          if (data != null) {
            this.doctor = <Doctor>data;
            let resp2 = this.aservice.getAppointmentByDoctorId(this.doctor.dd.id);
            resp2.subscribe(data => {
              if (data != null) {
                this.appdetails = <ADetails>data;
              }
            })
          }
        })
      }
      else {
        this.isDoctor = false;
        let resp = this.pservice.doGetPatient(localStorage.getItem("user_email"));
        resp.subscribe(data => {
          if (data != null) {

            this.patient = <Patient>data;
            let resp2 = this.aservice.getAppointmentByPatientId(this.patient.patientDetails.id);
            resp2.subscribe(data => {
              if (data != null) {
                this.appdetails = <ADetails>data;
              }
            })
          }
        })
      }
    }
    else {
      this.router.navigateByUrl("error-message/" + "PLEASE LOGIN TO TO CHECK APPOINTMENT");
    }
  }

  acceptAppointment(id: String) {
    let resp = this.aservice.acceptAppointmentById(id);
    resp.subscribe(data => {
      this.ngOnInit();

    }, error => {
      this.ngOnInit();
    });
    this.ngOnInit();
  }

  deleteAppointment(id:String){
    let resp=this.aservice.doDeleteAppointmentById(id);
    resp.subscribe(data=>{
      if(data=="APPOINTMENT DELETED"){
        this.ngOnInit();
      }else{
        this.router.navigateByUrl("error-message/"+"ERROR WHILE DELETEING.")
      }
    })
  }

  setDeleteAppointmentId(id:String){
    this.appointmentID=id;
  }

  searchAppointment() {

    this.tempList = [];
    if (this.searchKey != null) {
      this.showSearch = true;
      this.mainTable = false;
      for (let i in this.appdetails) {
        if (this.appdetails[i].tags.includes(this.searchKey.toLowerCase())) {
          this.tempList.push(this.appdetails[i]);
        }
      }

    } else {
      alert("Key Not Available");
    }

  }

  cancelSearch() {
    this.showSearch = false;
    this.mainTable = true;
    this.searchKey = null;
  }

  downloadPdf(ad: ADetails) {
    if (localStorage.getItem("current_user_type") == 'DOCTOR') {
      this.generatePdfForDoctor(ad);
    } else if (localStorage.getItem("current_user_type") == 'PATIENT') {
      this.generatePdfForPatient(ad);
    }
  }


  generatePdfForDoctor(ad: ADetails) {

    const doc = new jsPDF()

    autoTable(doc, {
      body: [
        [{ content: 'APPOINTMENT DETAILS', colSpan: 2, rowSpan: 1, styles: { halign: 'center' } }],
      ],
    })

    autoTable(doc, {
      columnStyles: { p: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'PATIENT`S DETAILS', dataKey: 'p' },
      ],
    })

    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },
      body: [
        ["NAME: ", `${ad.first_NAME + ' ' + ad.last_NAME}`.toUpperCase()],
        ["MOBILE NO: ", `${ad.mobile_NO}`],
        ["EMAIL ID: ", `${ad.email}`.toUpperCase()],
        ["ADDRESS: ", `${ad.address}`.toUpperCase()],
      ],
    })

    autoTable(doc, {
      columnStyles: { d: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'DOCTOR DETAILS', dataKey: 'd' },
      ],
    })

    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },
      body: [
        ["NAME: ", `${this.doctor.dd.first_NAME + ' ' + this.doctor.dd.last_NAME}`.toUpperCase()],
        ["MOBILE NO: ", `${this.doctor.dd.mobile_NO}`],
        ["EMAIL ID: ", `${this.doctor.dd.email_ID}`.toUpperCase()],
        ["ADDRESS: ", `${this.doctor.dd.chembar_ADDRESS}`.toUpperCase()],
      ],
    })

    autoTable(doc, {
      columnStyles: { a: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'APPOINTMNET SLOT DETAILS', dataKey: 'a' },
      ],
    })

    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },

      body: [
        ["APPOINTMENT`S DAY: ", `${ad.a_DAY}`.toUpperCase()],
        ["APPOINTMENT`S TIME: ", `${ad.a_TIME}`],
        ["APPOINTMENT`S STATUS: ", `${ad.appointment_CONFRIMED}`.toUpperCase()]
      ],
    })

    doc.save('appointment.pdf')
  }



  generatePdfForPatient(ad: ADetails) {
    const doc = new jsPDF()

    autoTable(doc, {
      body: [
        [{ content: 'APPOINTMENT DETAILS', colSpan: 2, rowSpan: 1, styles: { halign: 'center' } }],
      ],
    })

    autoTable(doc, {
      columnStyles: { d: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'DOCTOR`S DETAILS', dataKey: 'd' },
      ],
    })
    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },
      body: [
        ["NAME: ", `${ad.first_NAME + ' ' + ad.last_NAME}`.toUpperCase()],
        ["MOBILE NO: ", `${ad.mobile_NO}`],
        ["EMAIL ID: ", `${ad.email}`.toUpperCase()],
        ["ADDRESS: ", `${ad.address}`.toUpperCase()],
      ],
    })

    autoTable(doc, {
      columnStyles: { p: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'PATIENT`s DETAILS', dataKey: 'p' },
      ],
    })

    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },
      body: [
        ["NAME: ", `${this.patient.patientDetails.first_NAME + ' ' + this.patient.patientDetails.last_NAME}`.toUpperCase()],
        ["MOBILE NO: ", `${this.patient.patientDetails.mobile_NO}`],
        ["EMAIL ID: ", `${this.patient.patientDetails.email_ID}`.toUpperCase()],
        ["ADDRESS: ", `${this.patient.patientDetails.address}`.toUpperCase()],
      ],
    })

    autoTable(doc, {
      columnStyles: { a: { halign: 'center' } }, // European countries centered
      columns: [
        { header: 'APPOINTMNET SLOT DETAILS', dataKey: 'a' },
      ],
    })

    autoTable(doc, {
      // head: [['Name', 'Address', 'Mobile','Email','Day','Time']],
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 143 },
        // etc
      },

      body: [
        ["APPOINTMENT`S DAY: ", `${ad.a_DAY}`.toUpperCase()],
        ["APPOINTMENT`S TIME: ", `${ad.a_TIME}`],
        ["APPOINTMENT`S STATUS: ", `${ad.appointment_CONFRIMED}`.toUpperCase()]
      ],
    })

    doc.save('appointment.pdf')
  }
}
