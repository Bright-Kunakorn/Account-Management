import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthenticationComponent } from '../authentication/authentication.component';
import {
  EmployeeDashboardComponent,
  DialogData,
} from '../employee-dashboard/employee-dashboard.component';
import WaitingEmployeeData from '../server/waiting_employee.json';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  street: string;
  city: string;
  department: string;
  job_title: string;
  gender: string;
  salary: string;
  hireDate: string;
  birthDate: string;
  educate: string;
}

@Component({
  selector: 'app-delete-pop-up-from-add',
  templateUrl: './delete-pop-up-from-add.component.html',
  styleUrls: ['./delete-pop-up-from-add.component.css'],
})
export class DeletePopUpFromAddComponent {
  private employees: Employee[] = WaitingEmployeeData;
  private dialog: MatDialog;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    dialog: MatDialog
  ) {
    this.dialog = dialog;
  }

  public onCloseClick(): void {
    this.dialog.closeAll();
  }

  public openDialogAuthent(): void {
    this.dialog.open(AuthenticationComponent);
  }

  public getEmployees(ID: number): Employee[] {
    return this.employees.filter((employee) => employee.id === ID);
  }
}
