import { Component, Inject } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  DialogData,
  EmployeeDashboardComponent,
} from '../employee-dashboard/employee-dashboard.component';
import employeeData from '../server/employee.json';

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
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css'],
})
export class DeletePopupComponent {
  private employees: Employee[] = employeeData;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog
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

export class DeletePopup {
  private dialog: MatDialog;
  private employees: Employee[];

  constructor(
    private dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.employees = employeeData;
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
